import { SingleOrderRow } from "./partials";
import { Button, Input } from "@frontend/components";
import { useMutation, useQueryClient } from "react-query";
import { deleteOrder } from "@frontend/api";
import { Fragment, LegacyRef, forwardRef, useState } from "react";
import { PaymentAction, ScanDetection } from "@frontend/shared";
import { Trash } from "iconsax-react";
import { useComputedOrderItem } from "@frontend/utils";
import { Barcode, OrderItem, Product } from "@prisma/client";
import { toast } from "react-toastify";
import { errorResponse } from "@model/general";

type compositeOrderItem = OrderItem & {
  sub_total: number;
  discount_total: number;
  product: Product & {
    barcode: Barcode[];
  };
};

interface ISingleOrderProps {
  order_id: number;
  order_items: compositeOrderItem[];
  created_date: string;
}

const SingleOrder = forwardRef(
  (props: ISingleOrderProps, ref: LegacyRef<HTMLDivElement>) => {
    const { order_id, order_items } = props;

    const { total_count, total_dicsount, total_price } =
      useComputedOrderItem(order_items);

    const queryClient = useQueryClient();

    const [actionOpen, setActionOpen] = useState(false);

    const [user_phone, setUser_phone] = useState("");

    const deleteOrderItem = useMutation(deleteOrder, {
      onSuccess: () => {
        queryClient.invalidateQueries("open-orders");
      },
      onError: (err: unknown) => {
        const { reason } = err as errorResponse;
        toast(reason, {
          type: "error",
        });
      },
    });

    const handleOrderDelete = () => {
      deleteOrderItem.mutate({
        id: order_id,
      });
    };

    return (
      <Fragment>
        <ScanDetection order_id={order_id} />
        <div className="h-full flex flex-col gap-y-4" ref={ref}>
          <div className="relative text-sm overflow-x-auto text-right overflow-y-auto shadow-card rounded-lg h-full max-h-[376px] xl:max-h-[668px]">
            <table className="w-full text-G2 text-right border border-G10 relative">
              <thead className="font-semibold z-10 bg-B11 sticky -top-1 border-b border-b-G10 text-GDesk">
                <tr>
                  <th scope="col" className="w-[51px]">
                    <Button
                      color="danger"
                      variant="ghost"
                      size="unspecified"
                      type="button"
                      className="p-3"
                      onClick={handleOrderDelete}
                    >
                      <Trash />
                    </Button>
                  </th>
                  <th scope="col" className="px-2 py-3 text-right">
                    نام و کد محصول
                  </th>
                  <th scope="col" className="px-2 py-3 text-right">
                    تعداد
                  </th>
                  <th scope="col" className="px-2 py-3 text-right">
                    <span className="inline-block min-w-max">
                      قیمت واحد{" "}
                      <span className="text-2xs font-light text-G2">
                        (ریال)
                      </span>
                    </span>
                  </th>
                  <th scope="col" className="px-2 py-3 text-right">
                    <span className="inline-block min-w-max">
                      تخفیف{" "}
                      <span className="text-2xs font-light text-G2">
                        (ریال)
                      </span>
                    </span>
                  </th>
                  <th scope="col" className="px-2 py-3 text-right">
                    <span className="inline-block min-w-max">
                      جمع جزء{" "}
                      <span className="text-2xs font-light text-G2">
                        (ریال)
                      </span>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {order_items.map((item) => {
                  const { id, ...rest } = item;
                  return <SingleOrderRow key={id} id={id} {...rest} />;
                })}
              </tbody>
            </table>
          </div>
          <div className="my-2 flex gap-x-4 mt-auto shadow-card p-4 items-center">
            <div className="flex items-center gap-x-2">
              <Input
                id="user_phone"
                name="user_phone"
                placeholder="شماره مشتری..."
                value={user_phone}
                onChange={(e) => setUser_phone(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <span>تعداد کل اقلام: {total_count}</span>
              <span>تخفیف: {total_dicsount?.toLocaleString()} ریال</span>
            </div>
            <div className="mr-auto">
              <span className="text-semibold text-primary">مبلغ کل: </span>
              <strong>{total_price?.toLocaleString()} ریال</strong>
            </div>
          </div>
          <Button
            variant="regular"
            size="unspecified"
            type="button"
            color="success"
            className="w-full py-4"
            onClick={() => setActionOpen(true)}
          >
            ثبت سفارش
          </Button>
        </div>

        {actionOpen && (
          <PaymentAction
            isOpen={actionOpen}
            closeModal={() => {
              setActionOpen(false);
              queryClient.invalidateQueries("open-orders");
            }}
            order_id={order_id}
            total_price={total_price!}
            user_phone={user_phone}
          />
        )}
      </Fragment>
    );
  }
);

export { SingleOrder };
