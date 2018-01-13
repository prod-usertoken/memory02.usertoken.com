'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hypernovaAphrodite = require('hypernova-aphrodite');

var _aphrodite = require('aphrodite');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Aphrodite = function (_Component) {
  _inherits(Aphrodite, _Component);

  function Aphrodite() {
    _classCallCheck(this, Aphrodite);

    return _possibleConstructorReturn(this, (Aphrodite.__proto__ || Object.getPrototypeOf(Aphrodite)).apply(this, arguments));
  }

  _createClass(Aphrodite, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'span',
          { className: (0, _aphrodite.css)(styles.red) },
          'This is red.'
        ),
        _react2.default.createElement(
          'span',
          { className: (0, _aphrodite.css)(styles.hover) },
          'This turns red on hover.'
        ),
        _react2.default.createElement(
          'span',
          { className: (0, _aphrodite.css)(styles.small) },
          'This turns red when the browser is less than 600px width.'
        ),
        _react2.default.createElement(
          'span',
          { className: (0, _aphrodite.css)(styles.red, styles.blue) },
          'This is blue.'
        ),
        _react2.default.createElement(
          'span',
          { className: (0, _aphrodite.css)(styles.blue, styles.small) },
          'This is blue and turns red when the browser is less than 600px width.'
        )
      );
    }
  }]);

  return Aphrodite;
}(_react.Component);

var styles = _aphrodite.StyleSheet.create({
  red: {
    backgroundColor: 'red'
  },

  blue: {
    backgroundColor: 'blue'
  },

  hover: {
    ':hover': {
      backgroundColor: 'red'
    }
  },

  small: {
    '@media (max-width: 600px)': {
      backgroundColor: 'red'
    }
  }
});

exports.default = (0, _hypernovaAphrodite.renderReactWithAphrodite)('aphrodite', Aphrodite);