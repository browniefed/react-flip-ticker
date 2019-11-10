import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Ticker, { Tick } from "../.";

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const currencies = ["$", "¥", "€"];

const App = () => {
  const [state, setState] = useState<any>({
    currency: currencies[getRandom(0, 2)],
    value: getRandom(0, 100000),
  });

  useEffect(() => {
    setInterval(() => {
      setState({
        currency: currencies[getRandom(0, 2)],
        value: getRandom(0, 100000),
      });
    }, 500);
  }, []);

  return (
    <div
    // style={{
    //   padding: "24px",
    //   border: `1px solid #E5E8E8`,
    //   borderRadius: "8px",
    //   width: "300px",
    //   alignItems: "center",
    //   justifyContent: "center",
    //   display: "flex",
    // }}
    >
      <Ticker textClassName="text">
        <Tick rotateItems={currencies}>{state.currency}</Tick>
        {state.value.toLocaleString()}
      </Ticker>
    </div>
  );
};

render(<App />, document.getElementById("root"));
