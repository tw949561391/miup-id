//--import
const GenericPool = require('generic-pool');
const IO = require('socket.io-client');
const conf_oauthRpc = require('../../conf/index').rpcOauth;
const log = require('../log').getLogger("init");

const factory = {
    create: function () {
        return new Promise(function (resolve, reject) {
            const socket = IO(conf_oauthRpc.uri, conf_oauthRpc.options);
            socket.on('connect', () => {
                log.info(`----------------------------${process.pid}:oauth-rpc创建链接`);
                resolve(socket);
            });
            socket.on('ping', () => {
                log.debug(`----------------------------${process.pid}:oauth-rpc ping`);
            });
            socket.on('pong', () => {
                log.debug(`----------------------------${process.pid}:oauth-rpc pong`);
            });
            socket.on('connect_error', (err) => {
                log.error(`----------------------------${process.pid}:oauth-rpc链接失败`)
                reject(err);
            });
        })
    },
    destroy: function (db) {
        return new Promise(function (resolve) {
            db.disconnect();
            db.on("disconnect", () => {
                log.info(`----------------------------${process.pid}:oauth-rpc断开链接`);
                resolve();
            })
        })

    }
};
const opts = {
    max: conf_oauthRpc.max_pool, // maximum size of the pool 
    min: conf_oauthRpc.min_pool // minimum size of the pool 
};
module.exports = GenericPool.createPool(factory, opts);
