import React, { forwardRef } from "react";
import clsx from "clsx";

type buttonVariant =
  | "regular"
  | "outline"
  | "ghost"
  | "link"
  | "outline-muted"
  | "unstyled";
type buttonSize = "regular" | "touch" | "large" | "small" | "unspecified";
type buttonColor = "primary" | "warning" | "danger" | "success";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: buttonSize;
  variant?: buttonVariant;
  color?: buttonColor;
  innerRef?: React.Ref<HTMLButtonElement>;
  children: React.ReactNode;
}

const backgroundColors = {
  primary: "bg-primary",
  danger: "bg-danger",
  warning: "bg-warning",
  success: "bg-successDesk",
};

const textColors = {
  primary: "text-primary",
  danger: "text-danger",
  warning: "text-warning",
  success: "text-successDesk",
};

const borderColors = {
  primary: "border-primary",
  danger: "border-danger",
  warning: "border-warning",
  success: "border-successDesk",
};

const Button = forwardRef(
  (props: IButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const {
      size = "regular",
      variant = "regular",
      color = "primary",
      innerRef = null,
      children,
      className,
      ...rest
    } = props;
    return (
      <button
        className={clsx(
          variant !== "unstyled" &&
            "rounded-md text-base font-medium transition-all",
          "disabled:cursor-not-allowed disabled:opacity-50",
          size === "touch" && "h-fit w-fit px-10 py-5 text-xl",
          size === "large" && "h-fit w-fit px-5 py-3 text-base",
          size === "regular" && "h-fit w-fit px-4 py-2 text-sm",
          size === "small" && "h-fit w-fit px-2 py-2",
          variant === "regular" &&
            `${backgroundColors[color]} text-white hover:opacity-75 disabled:hover:bg-disabled`,
          variant === "outline" &&
            `border ${borderColors[color]} ${textColors[color]} hover:opacity-75 disabled:border-disabled disabled:text-disabled`,
          variant === "outline-muted" &&
            `border ${borderColors[color]} hover:opacity-75 disabled:border-disabled disabled:text-disabled`,
          variant === "ghost" &&
            `${textColors[color]} hover:opacity-75 disabled:text-disabled`,
          variant === "link" &&
            `text-brand hover:underline disabled:no-underline`,
          className
        )}
        onFocus={(e) => e.currentTarget.blur()}
        ref={innerRef || ref}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export { Button };
