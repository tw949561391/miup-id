module.exports.server = {
    port: 3002
};
module.exports.redis = {
    uri: 'localhost',
    port: '16379',
    max_pool: 10,
    min_pool: 2
};
module.exports.mongo = {
    uri: 'localhost',
    port: '17017',
    dbName: 'joke',
    max_pool: 10,
    min_pool: 2
};

module.exports.log4j = {
    appenders: {
        console: {
            type: 'console'
        },
        service: {
            type: 'dateFile',
            filename: '/var/log/node/funny-server/service.log',
            pattern: '.yyyy-MM-dd'
        },
        rpc: {
            type: 'dateFile',
            filename: '/var/log/node/funny-server/rpc.log',
            pattern: '.yyyy-MM-dd'
        }
    },
    categories: {
        default: {
            appenders: ['console'], level: 'info'
        },
        service: {
            appenders: ['service'], level: 'info'
        },
        rpc: {
            appenders: ['rpc'], level: 'info'
        }
    },
    replaceConsole: true
};



//----rpc
module.exports.rpcOauth = {
    uri: 'ws://localhost:3000',
    max_pool: 10,
    min_pool: 2,
    options: {
        path: '/rpc'
    }
};



