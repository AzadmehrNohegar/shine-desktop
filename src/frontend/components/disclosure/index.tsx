import React from "react";
import { UpChevron } from "@frontend/assets/svg";
import { Disclosure as HeadlessDisclosure } from "@headlessui/react";
import clsx from "clsx";

interface IDisclosureProps extends React.HTMLAttributes<HTMLDivElement> {
  button: React.ReactNode;
  desc: React.ReactNode;
}

function Disclosure({ button, desc, className }: IDisclosureProps) {
  return (
    <div className={clsx("border border-G7 rounded-lg px-4 py-3", className)}>
      <HeadlessDisclosure>
        {({ open }) => (
          <>
            <HeadlessDisclosure.Button className="flex w-full justify-between items-center rounded-lg bg-white px-4 py-2 text-left text-sm font-medium focus:outline-none">
              {button}
              <UpChevron
                className={`${
                  open ? "rotate-180 transform origin-center" : ""
                } text-G2 transition-all duration-300`}
              />
            </HeadlessDisclosure.Button>
            <HeadlessDisclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 transition-all duration-300">
              {desc}
            </HeadlessDisclosure.Panel>
          </>
        )}
      </HeadlessDisclosure>
    </div>
  );
}

export { Disclosure };
