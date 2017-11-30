//--import
const GenericPool = require('generic-pool');
const RedisClient = require('redis');
const Bluebird = require('bluebird');
const conf_redis = require('../../conf/index').redis;
Bluebird.promisifyAll(RedisClient.RedisClient.prototype);
Bluebird.promisifyAll(RedisClient.Multi.prototype);
const log=require('../log').getLogger("init");




const factory = {
    create: function () {
        return new Promise(function (resolve, reject) {
            const db = RedisClient.createClient(conf_redis.port, conf_redis.uri);
            db.on('connect', () => {
                resolve(db);
                log.info(`----------------------------${process.pid}:redis创建链接`);

            });
            db.on('error', (err) => {
                log.error(`----------------------------${process.pid}:redis链接失败`);
                reject(err)
            })
        })
    },
    destroy: function (db) {
        return new Promise(function (resolve) {
            db.quit();
            db.on('end', () => {
                log.info(`----------------------------${process.pid}:redis断开链接`);
                resolve();
            });
        })
    }
};

const opts = {
    max: conf_redis.max_pool, // maximum size of the pool 
    min: conf_redis.min_pool // minimum size of the pool 
};

module.exports = GenericPool.createPool(factory, opts)
