const KoaRouter = require('koa-router');

//--
module.exports = route = new KoaRouter().prefix('/server/pub/profile');

route.get("/you/:userId.json", async (ctx) => {
    let userId = ctx.params.userId;
    ctx.body = {nickname: "nickname", gender: "F", avatar: "http://www.baidu.com/demo.png"};
});


