const config = require('../../../config')
let store;
if (config.remoteDB === true) {
    store = require('../../../store/remote-mysql')
} else {
    store = require('../../../store/mysql');
}
const request = require('request');
const ctrl = require('./controller');

module.exports = ctrl(store);
