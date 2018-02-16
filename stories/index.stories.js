import React from "react";
import { storiesOf } from "@storybook/react";
import Ticker from "../lib/index";

storiesOf("Ticker", module).add("Ticker", () => <Ticker text="123.44" textClassName="text" />);
