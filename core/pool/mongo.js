//--import
const GenericPool = require('generic-pool');
const MongoClient = require('mongodb').MongoClient;
const conf_mongo = require('../../conf/index').mongo;
const log=require('../log').getLogger("init");

const factory = {
    create: function () {
        return new Promise(function (resolve, reject) {
            new MongoClient().connect(`mongodb://${conf_mongo.uri}:${conf_mongo.port}/${conf_mongo.dbName}`, (err, db) => {
                if (err) {
                    reject(err);
                    log.error(`----------------------------${process.pid}:mongo链接失败`)
                }
                else {
                    resolve(db);
                    log.info(`----------------------------${process.pid}:mongo创建链接`)
                }
            })
        })
    },
    destroy: function (db) {
        return new Promise(function (resolve) {
            db.close();
            log.info(`----------------------------${process.pid}:mongo断开链接`);
            resolve();
        })
    }
};
const opts = {
    max: conf_mongo.max_pool, // maximum size of the pool 
    min: conf_mongo.min_pool // minimum size of the pool 
};
module.exports = GenericPool.createPool(factory, opts);
