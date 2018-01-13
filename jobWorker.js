'use strict';

var _server = require('hypernova/server');

var _server2 = _interopRequireDefault(_server);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commChannels = require('./utils/commChannels');

var _jobComponents = require('./jobComponents');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createGetComponent = _server2.default.createGetComponent;


var HYPER_PORT = process.env.HYPER_PORT || 9600,
    HYPER_HOST = process.env.HYPER_HOST || '0.0.0.0',
    HYPER_ENDPOINT = '/batch',
    HYPER_URL = 'http://' + HYPER_HOST + ':' + HYPER_PORT + HYPER_ENDPOINT;

//if (!getAppState('HYPER_PORT')) putAppState('HYPER_PORT', HYPER_PORT);
//if (!getAppState('HYPER_HOST')) putAppState('HYPER_HOST', HYPER_HOST);
if (!(0, _commChannels.getAppState)('HYPER_URL')) (0, _commChannels.putAppState)('HYPER_URL', HYPER_URL);

//const jobs = {
//  SimpleComponent: path.resolve(path.join('jobs', 'SimpleComponent.js')),
//  aphrodite: path.resolve(path.join('jobs', 'aphrodite/index.js')),
//};
var registerComponents = createGetComponent(_jobComponents.Jobs);

var options = {
  // the limit at which body parser will throw
  bodyParser: {
    limit: 1024 * 1000
  },
  // runs on a single process
  devMode: false,
  // how components will be retrieved,
  getComponent: registerComponents,
  //  getComponent: require,
  // if not overridden, default will return the number of reported cpus  - 1
  // getCPUs: undefined,
  // the host the app will bind to
  host: HYPER_HOST,
  // configure the logger
  // logger: {},
  // the port the app will start on
  port: HYPER_PORT,
  // default endpoint path
  endpoint: HYPER_ENDPOINT
};

(0, _server2.default)(options);