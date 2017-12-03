const log = require('../../log').getLogger('rpc');
const RpcOauthPool = require('../../pool').RpcAuthPool;
const OauthError = require('miup-errors').BusinessError;


async function validateUser(ctx, scopes) {
    let socket = await RpcOauthPool.acquire();
    try {
        return await emit(socket, ctx, scopes);
    } catch (e) {
        throw e;
    } finally {
        RpcOauthPool.release(socket);
    }
}

function emit(socket, ctx, scopes) {
    return new Promise((resolve, reject) => {
        let req = buildRequest(ctx.request);
        let res = buildResponse(ctx.response);
        log.debug(`--->开始身份验证('${ctx.request.path}',${scopes})`);
        if (socket.disconnected) {
            reject(new OauthError("can not connect to auth server", {status: 500, name: "auth_error"}))
        } else {
            socket.emit('who', {request: req, response: res, scopes: scopes}, (err, res) => {
                if (err) {
                    log.error(`--->` + err.message);
                    reject(new OauthError(err.message, err));
                } else {
                    log.info(`--->${res.id}`);
                    resolve(res);
                }
            })
        }
    });
}

function buildRequest(request) {
    let req = {
        headers: request.headers || {},
        body: request.body || {},
        query: request.query || {},
        method: request.method
    };
    return req;
}

function buildResponse(response) {
    return {};
}

function validateUserMd(...scopes) {
    return async (ctx, next) => {
        ctx.user = await validateUser(ctx, scopes || []);
        await next();
    }
}

function fecthUserMd(...scopes) {
    return async (ctx, next) => {
        let res = await validateUser(ctx, scopes || []);
        ctx.user = res;
        next();
    }
}

module.exports = {
    validateUserMd: validateUserMd,
    fecthUserMd: fecthUserMd
};