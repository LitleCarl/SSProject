const net = require('net');
const path = require('path');
const crypto = require('crypto');

const pack = (data, password) => {
    const message = JSON.stringify(data);
    const now = Date.now();
    const timeBuffer = Buffer.from('0' + now.toString(16), 'hex');
    const dataBuffer = Buffer.from(message);
    const length = dataBuffer.length + 4 + 6;
    const lengthBuffer = Buffer.from(('0000' + length.toString(16)).substr(-4), 'hex');
    const code = crypto.createHash('md5').update(now + message + password).digest('hex').substr(0, 8);
    const codeBuffer = Buffer.from(code, 'hex');
    const pack = Buffer.concat([lengthBuffer, timeBuffer, dataBuffer, codeBuffer]);
    return pack;
};

const receiveData = async (receive, data) => {
    receive.data = Buffer.concat([receive.data, data]);
    return checkData(receive);
};

const checkData = async (receive) => {
    const buffer = receive.data;
    let length = 0;
    let data;
    if (buffer.length < 2) {
        return;
    }
    length = buffer[0] * 256 + buffer[1];
    if (buffer.length >= length + 2) {
        data = buffer.slice(2, length + 2);
        const message = JSON.parse(data.toString());
        return message;
    } else {
        return;
    }
};

const sendMessage = (data, server) => {
    if (server["host"] == null || server["port"] == null || server["password"] == null) {
        logger.error("sendMessage函数服务器配置不完整");
        return
    }

    if(server && server.host) {
        server.host = server.host.split(':')[0];
    }
    const promise = new Promise((resolve, reject) => {
        const client = net.connect(server, () => {
            client.write(pack(data, (server? server.password: null)));
        });
        const receive = {
            data: Buffer.from(''),
            socket: client,
        };
        client.on('data', data => {
            receiveData(receive, data).then(message => {
                if(!message) {
                    // reject(new Error(`empty message from ssmgr[s] [${ server.host }:${ server.port }]`));
                } else if(message.code === 0) {
                    resolve(message.data);
                } else {
                    logger.error(message);
                    reject(new Error(`ssmgr[s] return an error code [${ server.host }:${ server.port }]`));
                }
                client.end();
            }).catch(err => {
                logger.error(err);
                client.end();
            });
        });
        client.on('close', () => {
            reject(new Error(`ssmgr[s] connection close  [${ server.host}:${ server.port }]`));
        });
        client.on('error', err => {
            logger.error(err);
            reject(new Error(`connect to ssmgr[s] fail  [${ server.host}:${ server.port}]`));
        });
    });
    return promise;
};

const list = async (server) => {
    try {
        return await sendMessage({command: 'list'}, {
            host: server.host,
            port: server.port,
            password: server.password,
        });
    }
    catch (err) {
        logger.error(err);
        return null;
    }
};

const add = async (info, server) => {
    try {
        return await sendMessage({
            command: 'add',
            port: info['port'],
            password: info['password']
        }, {
            host: server.host,
            port: server.port,
            password: server.password,
        });
    }
    catch (err) {
        logger.error(err);
        return null;
    }
};

const del = async (port, server) => {
    try {
        return await sendMessage({
            command: 'del',
            port: port
        }, {
            host: server.host,
            port: server.port,
            password: server.password,
        });
    }
    catch (err) {
        logger.error(err);
        return null;
    }
};

const pwd = async (info, server) => {
    try {
        return await sendMessage({
            command: 'pwd',
            port: info['port'],
            password: info['password']
        }, {
            host: server.host,
            port: server.port,
            password: server.password,
        });
    }
    catch (err) {
        logger.error(err);
        return null;
    }
};

const flow = async (info, server) => {
    try {
        var msg = {
            command: 'flow',
            options: {
                clear: info['clear'] || false
            }
        };

        if (info['port']) {
            msg['port'] = info['port'];
        }
        if (info['startTime'] != null && info['startTime'] != null) {
            msg['options']['startTime'] = info['startTime'];
            msg['options']['endTime'] = info['endTime'];
        }

        return await sendMessage(msg, {
            host: server.host,
            port: server.port,
            password: server.password,
        });
    }
    catch (err) {
        console.log(err)
        logger.error(err);
        return null;
    }
};

const version = async (server) => {
    try {
        return await sendMessage({
            command: 'version'
        }, {
            host: server.host,
            port: server.port,
            password: server.password,
        });
    }
    catch (err) {
        logger.error(err);
        return null;
    }
};


/*
 {
 command: 'add/del/list/pwd/flow',
 port: 1234,
 password: '123456',
 options: {
 startTime: xxx
 endTime: xxx
 clear: true
 },
 }, {
 host: '',
 port: '',
 password: '',
 }
 */
exports.list = list;
exports.add = add;
exports.del = del;
exports.pwd = pwd;
exports.flow = flow;
exports.version = version;
