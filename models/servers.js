var Sequelize = require('sequelize');
var rpc = require('../core/ServerCommunication');
var CronJob = require('cron').CronJob;
const async = require('async');
module.exports = (sequelize, DataTypes) => {
    var Models = null;
    var Server = sequelize.define('server', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        host: {type: Sequelize.STRING, allowNull: false},
        port: {type: Sequelize.STRING, allowNull: false},
        password: {type: Sequelize.STRING, allowNull: false},
        extra: {type: Sequelize.STRING, allowNull: false},
        regionId: {type: Sequelize.INTEGER}
    });
    Server.associate = function(models) {
        Models = models;
        Server.belongsTo(models['region']);
        Server.hasMany(models['flow'])
    };

    Server.prototype.ping = async function () {
        return await rpc.version(this)
    };

    // 获取服务器的流量数据
    Server.prototype.flow = async function () {
        var self = this;
        var interval = 1 * 60 * 1000; // 60s
        let lastFlowFromThisServers = await this.getFlows({limit: 1, order: [['time', 'DESC']]});
        let lastFlowFromThisServer = lastFlowFromThisServers[0];

        if (lastFlowFromThisServer == null || Date.now() - lastFlowFromThisServer.time >= interval) {
            // 还没有抓过此服务器的流量数据
            const options = {
                clear: true,
            };

            let flow = await rpc.flow(options, self);
            flow = flow.filter(f => {
                return f.sumFlow > 0;
            });

            async.map(flow,  async (f, cb)=>{
                let userRegion = await Models['userRegion'].findOne({where: {
                    'currentPorts': f.port,
                    'regionId': self.regionId
                }});

                if (userRegion) {
                    cb(null, {
                        userId: userRegion.userId,
                        serverId: self.id,
                        time: Date.now(),
                        flow: f['sumFlow']
                    });
                }
                else {
                    logger.error(`从ssmgr服务器获取数据流量时发生错误, userRegion为Null, condition=> regionId:${self.regionId}, port:${f.port}`);
                    cb();
                }
            }, function (err, flows) {
                var finalFlows = flows.filter(f => {
                    return f != null;
                });
                if(finalFlows.length === 0) {
                    return;
                }
                else {
                    // 保存到本地
                    Models['flow'].bulkCreate(finalFlows).then().catch(logger.error);
                }
            });
        }
    };

    // 初始化:
    //  1.持续ping ssmgr服务端
    //  2.持续从ssmgr端获取流量数据
    Server.prototype.initServer = function () {
        var self = this;
        this.pingJob = new CronJob('*/30 * * * * *', async function() {
                let pong = await self.ping()
                console.log('current pong:', pong);
            }, function () {
                /* This function is executed when the job stops */
            },
            true, /* Start the job right now */
            'Asia/Shanghai' /* Time zone of this job. */);

        // 定时获取流量数据
        this.flowJob = new CronJob('00 * * * * *', async function() {
                self.flow();
            }, function () {
                /* This function is executed when the job stops */
            },
            true, /* Start the job right now */
            'Asia/Shanghai' /* Time zone of this job. */);
    };

    // 停止任务
    Server.prototype.stopServer = function () {
        this.pingJob && this.pingJob.stop();
        this.flowJob && this.flowJob.stop();
    };

    return Server;
};