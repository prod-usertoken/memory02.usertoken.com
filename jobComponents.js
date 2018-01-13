'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Jobs = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Jobs = exports.Jobs = {
  SimpleComponent: _path2.default.resolve(_path2.default.join('jobs', 'SimpleComponent.js')),
  aphrodite: _path2.default.resolve(_path2.default.join('jobs', 'aphrodite/index.js'))
};