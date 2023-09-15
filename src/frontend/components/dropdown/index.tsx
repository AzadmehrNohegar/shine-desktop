import React, { Fragment, useId } from "react";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";

interface IDropdownProps {
  className?: string;
  children: Array<React.ReactElement>;
  dropdownBtn: React.ReactElement;
}

function Dropdown({ className, dropdownBtn, children }: IDropdownProps) {
  const uniqID = useId();

  return (
    <Menu
      as="div"
      className={clsx("relative inline-block text-left", className)}
    >
      <Menu.Button className="inline-flex h-full items-center w-full">
        {dropdownBtn}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 flex flex-col items-start mt-2 w-max z-20 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {children?.map((el, index) => (
            <Menu.Item key={`${uniqID}-${index}`}>{el}</Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export { Dropdown };
