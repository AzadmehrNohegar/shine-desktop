import { getProductById, postOrder } from "@frontend/api";
import { Close } from "@frontend/assets/svg";
import { Button, Dialog } from "@frontend/components";
import { Dialog as HeadlessDialog } from "@headlessui/react";
import { errorResponse } from "@model/general";
import { Price, Product } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface ISelectPriceModalProps {
  order_id: number | null;
  isOpen: boolean;
  closeModal: () => void;
  product_id: number;
}

type compositeProduct = Product & {
  price: Price[];
};

function SelectPriceModal({
  closeModal,
  isOpen,
  order_id,
  product_id,
}: ISelectPriceModalProps) {
  const queryClient = useQueryClient();

  const { data } = useQuery(
    `product-single-${product_id}`,
    () => getProductById({ id: product_id }),
    {
      onError: (err: unknown) => {
        const { reason } = err as errorResponse;
        toast(reason, {
          type: "error",
        });
      },
    }
  );

  const createOrderItem = useMutation(postOrder, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      queryClient.invalidateQueries("open-orders").then(() => {
        closeModal();
      });
    },
    onError: (err: unknown) => {
      const { reason } = err as errorResponse;
      toast(reason, {
        type: "error",
      });
    },
  });

  const handleCreateOrderItem = (id: number) =>
    createOrderItem.mutate({
      body: {
        order_id: order_id,
        price_id: id,
      },
    });

  return (
    <Dialog isOpen={isOpen} closeModal={closeModal} placement="center">
      <HeadlessDialog.Title
        as="h3"
        className="leading-6 text-G2 flex items-center relative border-b p-4"
      >
        <span className="block mx-auto py-4 text-lg font-medium">
          انتخاب قیمت محصول
        </span>
        <Button
          variant="ghost"
          onClick={closeModal}
          className="absolute inset-y-auto left-4 outline-none focus:outline-none"
        >
          <Close className="text-G2 scale-125" />
        </Button>
      </HeadlessDialog.Title>
      <HeadlessDialog.Panel>
        <ul className="p-4 flex flex-wrap justify-between">
          {(data as compositeProduct)?.price.map((item) => (
            <li key={item.id} className="py-2 font-bold text-xl basis-modified">
              <Button
                className="w-full text-start flex flex-col justify-around min-h-[120px]"
                variant="outline"
                onClick={() => handleCreateOrderItem(item.id)}
              >
                <span className="inline-flex items-center w-full justify-between border-b pb-4">
                  <span className="self-start text-lg">قیمت محصول:</span>
                  <strong className="self-end text-xl font-bold">
                    {item.base_price.toLocaleString()} ریال
                  </strong>
                </span>
                {item.base_discount_percentage &&
                  item.base_discount_percentage !== 0 && (
                    <span className="inline-flex items-center w-full justify-between text-danger">
                      <span>قیمت محصول بعد از تخفیف:</span>
                      <strong>
                        {(
                          item.base_price -
                          (item.base_price * item.base_discount_percentage) /
                            100
                        ).toLocaleString()}{" "}
                        ریال
                      </strong>
                    </span>
                  )}

                <span className="inline-flex items-center w-full justify-between text-info">
                  <span>موجودی محصول:</span>
                  <strong>{item.inventory} عدد</strong>
                </span>
              </Button>
            </li>
          ))}
        </ul>
        {(data as compositeProduct)?.price.length === 0 && (
          <div className="mx-auto mb-10 flex flex-col gap-y-4 items-center justify-center p-4">
            <span>قیمتی برای این محصول وجود ندارد.</span>
            <Link
              to={`/product/${product_id}`}
              className="px-10 py-2 bg-primary rounded-lg text-white"
            >
              اضافه کردن قیمت جدید
            </Link>
          </div>
        )}
      </HeadlessDialog.Panel>
    </Dialog>
  );
}

export { SelectPriceModal };
