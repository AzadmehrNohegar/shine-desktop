import clsx from "clsx";
import React from "react";

type orientationOptions = "horizontal" | "vertical";
type colorOptions = "default" | "unset";

interface IDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: orientationOptions;
  color?: colorOptions;
}

function Divider({
  orientation = "vertical",
  className,
  color = "default",
}: IDividerProps) {
  return (
    <div
      className={clsx(
        "block",
        className,
        color === "default" && "border border-G7",
        orientation === "vertical" && "w-px",
        orientation === "horizontal" && "h-px w-full"
      )}
    />
  );
}

export { Divider };
