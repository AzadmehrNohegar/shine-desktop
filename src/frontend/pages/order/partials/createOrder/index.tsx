import { AddOrderItem, ScanDetection } from "@frontend/shared";
import { Fragment, useState } from "react";
import { useQueryClient } from "react-query";

function CreateOrder() {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <ScanDetection order_id={null} />
      <div className="h-full w-full flex flex-col gap-y-4 items-center justify-center">
        <img
          src="/assets/images/create-order.svg"
          alt="create order"
          className=""
        />
        <span className="font-bold text-xl">
          جهت افزودن محصول بارکد را اسکن کنید.
        </span>
      </div>
      {isOpen && (
        <AddOrderItem
          isOpen={isOpen}
          closeModal={() => {
            queryClient.invalidateQueries("open-orders");
            setIsOpen(false);
          }}
          order_id={null}
        />
      )}
    </Fragment>
  );
}

export { CreateOrder };
