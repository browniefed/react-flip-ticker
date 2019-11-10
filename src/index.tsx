import React, { Fragment, Children, useRef } from "react";

const range = (length: number) => Array.from({ length }, (_, i) => i);
const splitText = (text = "") => (text + "").split("");
const numberRange = range(10).map(p => p + "");
const numAdditional = [",", "."];
const numberItems = [...numberRange, ...numAdditional];
const isNumber = (v: string) => !isNaN(parseInt(v, 10));
const uniq = (values: string[]) => {
  return values.filter((value, index) => {
    return values.indexOf(value) === index;
  });
};

type MeasureMap = { [key: string]: { width: number; height: number } };

const hiddenPieceStyle: React.CSSProperties = {
  visibility: "hidden",
};

const tickStyle: React.CSSProperties = {
  overflow: "hidden",
  display: "inline-block",
  position: "relative",
};

const rotatorStyle: React.CSSProperties = {
  position: "absolute",
  left: "0",
  top: "0",
  bottom: "0",
  right: "0",
};

const pieceStyle: React.CSSProperties = {
  position: "absolute",
  left: "0",
  zIndex: 10,
};

interface TickProps {
  children: string;
  rotateItems: string[];
  className: string;
  currentClassName: string;
  hiddenClassName: string;
  duration: string;
  measureMap: MeasureMap;
}

export const Tick: React.FC<{
  children: string;
  rotateItems: string[];
}> = props => {
  //@ts-ignore
  return <InternalTick {...props} />;
};

const InternalTick: React.FC<TickProps> = ({
  children,
  measureMap,
  rotateItems,
  className,
  currentClassName,
  hiddenClassName,
  duration,
}) => {
  const index = rotateItems.indexOf(children);
  const { height, width } = measureMap[children];

  return (
    <span className={className} style={{ ...tickStyle, width: `${width}px` }}>
      <span className={className} style={hiddenPieceStyle}>
        {children}
      </span>
      <span
        style={{
          ...rotatorStyle,
          transition: `transform ${duration}`,
          transform: `translateY(${height * index * -1}px)`,
        }}
      >
        {rotateItems.map((value, i) => {
          return (
            <span
              key={value + i}
              className={[
                className,
                value === children ? currentClassName : hiddenClassName,
              ].join(" ")}
              style={{ ...pieceStyle, top: i * height }}
            >
              {value}
            </span>
          );
        })}
      </span>
    </span>
  );
};

const measure = (
  className: string,
  value: string,
): { width: number; height: number } => {
  const d = document.createElement("span");
  d.textContent = value;
  d.className = className;
  d.style.opacity = "0";
  d.style.pointerEvents = "none";
  d.style.position = "absolute";
  document.body.appendChild(d);
  const height = d.offsetHeight;
  const width = d.offsetWidth;
  document.body.removeChild(d);
  return {
    height,
    width,
  };
};

interface Props {
  children: React.ReactNode;
  currentClassName?: string;
  hiddenClassName?: string;
  textClassName: string;
  duration?: string;
}

export const Ticker: React.FC<Props> = ({
  children,
  textClassName,
  currentClassName = "currentTicker",
  hiddenClassName = "hiddenTicker",
  duration = ".5s",
}) => {
  const measureMap = useRef<MeasureMap>({});
  const measureStrings: string[] = Children.map(children, child => {
    if (typeof child === "string" || typeof child === "number") {
      return splitText(`${child}`);
    } else {
      //@ts-ignore
      return child.props && child.props.rotateItems;
    }
  }).flat();

  const hasNumbers = measureStrings.find(v => isNumber(v)) !== undefined;
  const rotateItems = uniq([
    ...(hasNumbers ? numberItems : []),
    ...measureStrings,
  ]);

  if (Object.keys(measureMap.current).length !== rotateItems.length) {
    rotateItems.forEach(item => {
      measureMap.current[item] = measure(textClassName, item);
    });
  }

  return (
    <Fragment>
      {Children.map(children, child => {
        if (typeof child === "string" || typeof child === "number") {
          return splitText(`${child}`).map((text, index) => {
            let items = isNumber(text) ? numberItems : [text];
            return (
              <InternalTick
                key={index}
                duration={duration}
                currentClassName={currentClassName}
                hiddenClassName={hiddenClassName}
                className={textClassName}
                rotateItems={items}
                measureMap={measureMap.current}
              >
                {text}
              </InternalTick>
            );
          });
        } else {
          //@ts-ignore
          return React.cloneElement(child, {
            duration,
            className: textClassName,
            measureMap: measureMap.current,
            currentClassName: currentClassName,
            hiddenClassName: hiddenClassName,
          });
        }
      })}
    </Fragment>
  );
};
