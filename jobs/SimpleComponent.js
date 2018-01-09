'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hypernovaReact = require('hypernova-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var meme = 25;

//function SimpleComponent({ name }) {
//  return (
//    <div onClick={() => alert("Click handlers work.")}>
//      Hello, {meme++}, {name}!
//    </div>
//  );
//}
//
//export default renderReact("SimpleComponent", SimpleComponent);

var MyComponent = function MyComponent(_ref)
//  renderReact("SimpleComponent", name =>
{
  var name = _ref.name;

  return _react2.default.createElement(
    'div',
    { onClick: function onClick() {
        return alert('Click handlers work.');
      } },
    'Hello, ',
    meme++,
    ', ',
    name,
    '!'
  );
};
//  );

//export const SimpleComponent = renderReact("SimpleComponent", MyComponent);

//export default SimpleComponent;

exports.default = (0, _hypernovaReact.renderReact)('SimpleComponent', MyComponent);
//export default SimpleComponent;