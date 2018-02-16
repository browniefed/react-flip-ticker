import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

const numberRange = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const hiddenPieceStyle = {
  visibility: "hidden",
};

const tickStyle = {
  overflow: "hidden",
  display: "inline-block",
  position: "relative",
};

const rotatorStyle = {
  transition: "transform 0.5s",
  position: "absolute",
  left: "0",
  top: "0",
  bottom: "0",
  right: "0",
};
const pieceStyle = {
  position: "absolute",
  left: "0",
  zIndex: "10",
};

class Tick extends Component {
  render() {
    const { value, height, range, className } = this.props;
    const index = range.indexOf(value);

    return (
      <span className={className} style={tickStyle}>
        <span className={className} style={hiddenPieceStyle}>
          {value}
        </span>
        <span style={{...rotatorStyle, transform: `translateY(${height * index * -1}px)` }}>
          {range.map((v, i) => {
            return (
              <span className={className} style={{ ...pieceStyle, top: i * height }}>
                {v}
              </span>
            );
          })}
        </span>
      </span>
    );
  }
}

const quickMeasure = (className, value) => {
  const d = document.createElement("span");
  d.textContent = value;
  d.className = className;
  d.style.opacity = 0;
  d.style.pointerEvents = "none";
  d.style.position = "absolute";
  document.body.appendChild(d);
  const height = d.offsetHeight;
  document.body.removeChild(d);
  return height;
};

class Ticker extends Component {
  componentWillMount() {
    this.setState({
      height: quickMeasure(this.props.textClassName, "0"),
    });
  }
  render() {
    return (
      <Fragment>
        {(this.props.children || this.props.text).split("").map((v, i) => {
          if (isNaN(parseFloat(v, 10)))
            return (
              <span key={i} className={this.props.textClassName} style={tickStyle}>
                {v}
              </span>
            );
          return (
            <Tick
              range={numberRange}
              className={this.props.textClassName}
              key={i}
              value={v}
              height={this.state.height}
            />
          );
        })}
      </Fragment>
    );
  }
}

Ticker.propTypes = {
  children: PropTypes.string,
  text: PropTypes.string,
};

export default Ticker;
