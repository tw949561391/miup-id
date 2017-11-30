const KoaRouter = require('koa-router');
const Oauth = require('../../core/rpc').Oauth;
const KoaMulter = require('koa-multer');

//---
module.exports = route = new KoaRouter().prefix("/server/self");


var storage = KoaMulter.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
const upload = KoaMulter({storage: storage})
route.use(Oauth.validateUserMd());

route.get("/identity.json", async (ctx) => {
    ctx.body = 'ok'

});


route.post("/identity.json", async (ctx) => {
    let nickname = ctx.request.body.nickname;
    let gender = ctx.request.body.gender;
    let avatar = ctx.request.body.avatar;
    ctx.body = 'ok'
});

route.post("/identity/avatar.json", async (ctx) => {


    ctx.body = 'ok'
});

route.post("/identity/cover.json", async (ctx) => {
    ctx.body = 'ok';
});


