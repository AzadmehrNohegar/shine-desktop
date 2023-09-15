import { AddOrderItem, ScanDetection } from "@frontend/shared";
import { Fragment, useState } from "react";
import { useQueryClient } from "react-query";

function CreateOrder() {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <ScanDetection order_id={null} />
      <div className="h-full w-full flex items-center justify-center">
        <img
          src="/assets/images/create-order.png"
          alt="create order"
          className=""
        />
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
