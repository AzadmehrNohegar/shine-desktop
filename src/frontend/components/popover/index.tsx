import React, { Fragment, forwardRef } from "react";
import { Popover as HeadlessPopover, Transition } from "@headlessui/react";
import { Button } from "../button";
import clsx from "clsx";

interface IPopoverProps extends React.PropsWithChildren {
  className?: string;
  popoverBtn: React.ReactElement;
}

const PopoverButton = forwardRef((props: any, ref) => (
  <Button variant="unstyled" size="unspecified" {...props} ref={ref}>
    {props.children}
  </Button>
));

function Popover({ className, children, popoverBtn }: IPopoverProps) {
  return (
    <HeadlessPopover className="relative">
      <HeadlessPopover.Button as={PopoverButton} className="max-w-fit">
        {popoverBtn}
      </HeadlessPopover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <HeadlessPopover.Panel
          className={clsx(
            className,
            "absolute left-0 z-10 mt-3 transform px-4 bg-white shadow-hue origin-top-left min-h-[300px]"
          )}
        >
          {children}
        </HeadlessPopover.Panel>
      </Transition>
    </HeadlessPopover>
  );
}

export { Popover };
