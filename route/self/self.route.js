const KoaRouter = require('koa-router');
const Oauth = require('../../core/rpc').Oauth;
const selfProfileService = require('./self.service');

//---
module.exports = route = new KoaRouter().prefix("/server/self");

route.use(Oauth.validateUserMd());

route.get("/identity.json", async (ctx) => {
    ctx.body = await  selfProfileService.identityGetNormal(ctx.user.id);
});


route.post("/identity.json", async (ctx) => {
    ctx.body = await selfProfileService.identityNormalUpdate(ctx.user.id, ctx.request.body);
});

route.post("/identity/avatar.json", async (ctx) => {
    ctx.body = 'ok'
});

route.post("/identity/cover.json", async (ctx) => {
    ctx.body = 'ok';
});


