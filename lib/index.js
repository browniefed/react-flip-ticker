'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var numberRange = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var hiddenPieceStyle = {
  visibility: "hidden"
};

var tickStyle = {
  overflow: "hidden",
  display: "inline-block",
  position: "relative"
};

var rotatorStyle = {
  transition: "transform 0.5s",
  position: "absolute",
  left: "0",
  top: "0",
  bottom: "0",
  right: "0"
};
var pieceStyle = {
  position: "absolute",
  left: "0",
  zIndex: "10"
};

var Tick = function Tick(props) {
  var value = props.value,
      height = props.height,
      range = props.range,
      className = props.className,
      currentClassName = props.currentClassName,
      hiddenClassName = props.hiddenClassName;

  var index = range.indexOf(value);

  return React__default.createElement(
    "span",
    { className: className, style: tickStyle },
    React__default.createElement(
      "span",
      {
        className: className,
        style: hiddenPieceStyle
      },
      value
    ),
    React__default.createElement(
      "span",
      { style: _extends({}, rotatorStyle, { transform: "translateY(" + height * index * -1 + "px)" }) },
      range.map(function (v, i) {
        return React__default.createElement(
          "span",
          {
            key: v + i,
            className: [className, v === value ? currentClassName : hiddenClassName].join(' '),
            style: _extends({}, pieceStyle, { top: i * height })
          },
          v
        );
      })
    )
  );
};

var measureHeight = function measureHeight(className, value) {
  var d = document.createElement("span");
  d.textContent = value;
  d.className = className;
  d.style.opacity = 0;
  d.style.pointerEvents = "none";
  d.style.position = "absolute";
  document.body.appendChild(d);
  var height = d.offsetHeight;
  document.body.removeChild(d);
  return height;
};

var Ticker = function (_Component) {
  inherits(Ticker, _Component);

  function Ticker() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Ticker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Ticker.__proto__ || Object.getPrototypeOf(Ticker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      height: measureHeight(_this.props.textClassName, "0")
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Ticker, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          children = _props.children,
          text = _props.text,
          textClassName = _props.textClassName,
          currentClassName = _props.currentClassName,
          hiddenClassName = _props.hiddenClassName;
      var height = this.state.height;

      return React__default.createElement(
        React.Fragment,
        null,
        (children || text).split("").map(function (v, i) {
          if (isNaN(parseFloat(v, 10))) return React__default.createElement(
            "span",
            {
              key: i,
              className: textClassName,
              style: tickStyle
            },
            v
          );
          return React__default.createElement(Tick, {
            range: numberRange,
            className: textClassName,
            currentClassName: currentClassName,
            hiddenClassName: hiddenClassName,
            key: i,
            value: v,
            height: height
          });
        })
      );
    }
  }]);
  return Ticker;
}(React.Component);

Ticker.propTypes = {
  children: PropTypes.string,
  text: PropTypes.string,
  currentClassName: PropTypes.string,
  hiddenClassName: PropTypes.string
};

Ticker.defaultProps = {
  currentClassName: 'currentTicker',
  hiddenClassName: 'hiddenTicker'
};

module.exports = Ticker;
