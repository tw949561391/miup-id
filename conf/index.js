let conf = {};
if ("prod" === process.env.NODE_ENV) {
    conf = require("./prod")
} else {
    conf = require("./dev")
}
module.exports = conf;


