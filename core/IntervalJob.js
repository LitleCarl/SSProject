const Jobs = [];
let _ = require('lodash');
var CronJob = require('cron').CronJob;
const Models = require('../models');
const rpc = require('./ServerCommunication');

var servers = [];

exports.servers = servers;

const reloadServers = async (db)=>{
    // Ping记录
    const Server = db['server'];
    let temps = await Server.findAll();
    // 清空servers数组 并且停止cron任务
    _.each(servers, (s)=>{
        s.stopServer();
    });
    servers.splice(0, servers.length);

    _.each(temps, (s)=>{
        servers.push(s);
        s.initServer();
    });
};

// 失效账户检测
const checkOutdatedAccount = async ()=>{
    var UserRegion = Models['userRegion'];
    let outdated = await UserRegion.findAll({
                        where: {
                            'endAt': {
                                '$lte': new Date()
                            }
                        }
                    });
    // 根据region进行分类
    let groupByRegion = _.groupBy(outdated, (ur)=>{
        return ur.regionId;
    });

    _.each(groupByRegion, async (group, regionId)=>{
        let servers = await Models['server'].findAll({
            where: {id: regionId}
        });

        _.each(servers, (s)=>{
           _.each(group, (userRegion)=>{
               if (userRegion && userRegion['currentPorts'].length > 0) {
                   rpc.del(userRegion['currentPorts'], s);
               }
           });
        });
    });
};

exports.reloadServers = reloadServers;

exports.execute = async function () {
    reloadServers(Models);

    new CronJob('00 */5 * * * *', async function() {
            checkOutdatedAccount();
        }, function () {
        },
        true, /* Start the job right now */
        'Asia/Shanghai' /* Time zone of this job. */);
};