const Log4j = require('log4js');
module.exports.init = function (config) {
    Log4j.configure(config);
};

module.exports.getLogger = function (name) {
    if (name) {
        return Log4j.getLogger(name);
    } else {
        return Log4j.getLogger("service");
    }
};

