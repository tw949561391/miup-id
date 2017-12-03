const Koa = require('koa');
const Koa_logger = require('koa-logger');
const Koa_parser = require('koa-bodyparser');
const Koa_errorHandler = require('miup-handlers').ErrorHandler;
const Koa_cors = require('kcors');
const Logger = require('./core/log');
const LoggerConf = require('./conf').log4j;
const ServerConf = require('./conf').server;
const Notfound = require('miup-errors').Notfound;
const http = require('http');


const app = new Koa();
const server = http.createServer(app.callback());

Logger.init(LoggerConf);

app.use(Koa_logger());
app.use(Koa_parser());
app.use(Koa_errorHandler());
app.use(Koa_cors());


//route list
app.use(require('./route/self/self.route').routes());
app.use(require('./route/pub/profile.route').routes());

app.use(() => {
    throw new Notfound("resource not found");
});
module.exports = server;