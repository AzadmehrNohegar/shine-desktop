import React, { forwardRef } from "react";
import clsx from "clsx";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string | number;
  handleChange?: (value: string) => void;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  containerClassName?: string;
}

const Input = forwardRef(
  (props: IInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const {
      value,
      handleChange,
      iconLeft,
      iconRight,
      className,
      containerClassName,
      ...rest
    } = props;

    return (
      <div
        className={clsx(
          containerClassName === "" && "w-full relative",
          containerClassName
        )}
      >
        {iconRight && (
          <div className="absolute right-4 top-2.5">{iconRight}</div>
        )}
        <input
          value={value}
          className={clsx(
            className,
            iconRight && "pr-12",
            "w-full border border-G8 p-3 outline-none focus:border-B7 rounded-lg"
          )}
          onChange={(e) => {
            if (handleChange) {
              handleChange(e.target.value);
            } else {
              const { onChange } = rest;
              if (onChange) onChange(e);
            }
          }}
          ref={ref}
          {...rest}
        />

        {iconLeft && <div className="absolute left-4 top-2.5">{iconLeft}</div>}
      </div>
    );
  }
);
export { Input };
