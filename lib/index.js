'use strict';

function __$$styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

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

var Tick = function (_Component) {
  inherits(Tick, _Component);

  function Tick() {
    classCallCheck(this, Tick);
    return possibleConstructorReturn(this, (Tick.__proto__ || Object.getPrototypeOf(Tick)).apply(this, arguments));
  }

  createClass(Tick, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          value = _props.value,
          height = _props.height,
          range = _props.range,
          className = _props.className;

      var index = range.indexOf(value);

      return React__default.createElement(
        "span",
        { className: className, style: tickStyle },
        React__default.createElement(
          "span",
          { className: className, style: hiddenPieceStyle },
          value
        ),
        React__default.createElement(
          "span",
          { style: _extends({}, rotatorStyle, { transform: "translateY(" + height * index * -1 + "px)" }) },
          range.map(function (v, i) {
            return React__default.createElement(
              "span",
              { className: className, style: _extends({}, pieceStyle, { top: i * height }) },
              v
            );
          })
        )
      );
    }
  }]);
  return Tick;
}(React.Component);

var quickMeasure = function quickMeasure(className, value) {
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

var Ticker = function (_Component2) {
  inherits(Ticker, _Component2);

  function Ticker() {
    classCallCheck(this, Ticker);
    return possibleConstructorReturn(this, (Ticker.__proto__ || Object.getPrototypeOf(Ticker)).apply(this, arguments));
  }

  createClass(Ticker, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        height: quickMeasure(this.props.textClassName, "0")
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React__default.createElement(
        React.Fragment,
        null,
        (this.props.children || this.props.text).split("").map(function (v, i) {
          if (isNaN(parseFloat(v, 10))) return React__default.createElement(
            "span",
            { key: i, className: _this3.props.textClassName, style: tickStyle },
            v
          );
          return React__default.createElement(Tick, {
            range: numberRange,
            className: _this3.props.textClassName,
            key: i,
            value: v,
            height: _this3.state.height
          });
        })
      );
    }
  }]);
  return Ticker;
}(React.Component);

Ticker.propTypes = {
  children: PropTypes.string,
  text: PropTypes.string
};

module.exports = Ticker;
