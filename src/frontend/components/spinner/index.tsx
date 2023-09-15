import { Spinner } from "@frontend/assets/svg";
import clsx from "clsx";
import React from "react";

interface ISpinnerElementProps extends React.HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean;
  width?: string;
}

function SpinnerElement({ fullWidth, className }: ISpinnerElementProps) {
  return (
    <div
      className={clsx(
        fullWidth && "w-full py-4 flex items-center justify-center",
        className
      )}
    >
      <Spinner />
    </div>
  );
}

export { SpinnerElement };
