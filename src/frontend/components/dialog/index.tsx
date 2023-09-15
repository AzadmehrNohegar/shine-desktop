import React, { Fragment } from "react";
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import clsx from "clsx";

type placement = "center" | "top";
type size = "standard" | "fit";

interface IDialogProps extends React.PropsWithChildren {
  isOpen: boolean;
  closeModal: () => void;
  placement?: placement;
  size?: size;
}

function Dialog({
  isOpen,
  closeModal,
  placement = "top",
  size = "standard",
  children,
}: IDialogProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div
          className={clsx(
            "fixed  overflow-y-auto",
            placement === "top" && "inset-x-0 top-0",
            placement === "center" && "inset-x-0 inset-y-0"
          )}
        >
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessDialog.Panel
                className={clsx(
                  "w-full transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all",
                  size === "standard" && "max-w-2xl",
                  size === "fit" && "max-w-fit"
                )}
              >
                {children}
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
}

export { Dialog };
