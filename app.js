var express = require('express');
var util = require('util');
require('./extensions/expressExtension')(express);

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session')

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api/');

var app = express();

const log4js = require('log4js');
//log4js.configure({
//    appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
//    categories: { default: { appenders: ['cheese'], level: 'error' } }
//});
global.logger = log4js.getLogger();
global.logger.level = 'debug';

var db = require('./models')
// 定时任务
var cronJobs = require('./core/IntervalJob');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//var options = { beautify: true, transformViews: true};
//app.engine('jsx', require('express-react-views').createEngine(options));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


app.use(function (req, res, next) {
  console.log('-->->->->->->->->->->->->->-------------------')
  console.log('                                              |')
  console.log('                                              |')

  console.log(`req.body: ${util.inspect(req.body)}`)
  console.log(`req.query:${util.inspect(req.query)}`)
  console.log(`req.params:${util.inspect(req.params)}`)
  console.log(`req.headers:${util.inspect(req.params)}`)

  console.log('                                              |')
  console.log('                                              |')
  console.log('--<-<-<-<-<-<-<-<-<-<-<-<-<-------------------')

  next()
});

app.use('/', users);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//const ipc = require('./core/ServerCommunication');

//async function trt(){
//  let data = await ipc.flow({
//    port: '50000',
//    startTime: 0,
//    endTime:(new Date()).getTime()
//  }, {
//    host: '150.95.147.125',
//    port: '6002',
//    password: '123456',
//    });
//  console.log(data)
//}

//console.log('send')
//async function trt(){
// let data = await ipc.add({port: 50000, password: '58133240'},{
//    host: '150.95.147.125',
//    port: '6002',
//    password: '123456',
//  });
//  console.log('data:',data);
//}
//
//trt();

// 定时任务执行
cronJobs.execute(db);

module.exports = app;
