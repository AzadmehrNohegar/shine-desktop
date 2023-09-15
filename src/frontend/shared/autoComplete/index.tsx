import React, { Fragment, forwardRef } from "react";
import { Input } from "@frontend/components";
import ClickAwayListener from "react-click-away-listener";

interface IAutoCompleteProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  handleChange?: (value: string) => void;
  children: Array<React.ReactElement>;
  iconRight?: React.ReactNode;
}

const Autocomplete = forwardRef(
  (
    { value, handleChange, children, ...rest }: IAutoCompleteProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const handleClickAway = () => {
      if (handleChange) handleChange("");
    };
    return (
      <div className="relative w-full">
        <Fragment>
          <Input
            value={value}
            ref={ref}
            handleChange={handleChange}
            {...rest}
          />
          {children && (
            <ClickAwayListener onClickAway={handleClickAway}>
              <div className="absolute w-full top-full inset-x-0 z-30 flex flex-col bg-white h-fit max-h-[18rem] overflow-y-auto border border-B7 border-t-0 rounded-b-lg">
                {children}
              </div>
            </ClickAwayListener>
          )}
        </Fragment>
      </div>
    );
  }
);

export { Autocomplete };
