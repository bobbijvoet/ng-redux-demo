module.exports = function (config) {
    var mainConf = require('./karma.conf');
    mainConf(config);

    config.set({
        singleRun: false,
        browsers: ['Chrome'],
        autoWatch: true
    });
};
