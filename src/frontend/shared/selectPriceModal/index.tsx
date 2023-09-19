import { getProductById, postOrder } from "@frontend/api";
import { Close } from "@frontend/assets/svg";
import { Button, Dialog } from "@frontend/components";
import { Dialog as HeadlessDialog } from "@headlessui/react";
import { Price, Product } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "react-query";

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

  const { data } = useQuery(`product-single-${product_id}`, () =>
    getProductById({ id: product_id })
  );

  const createOrderItem = useMutation(postOrder, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      queryClient.invalidateQueries("open-orders").then(() => {
        closeModal();
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
                className="w-full text-start flex items-center justify-between min-h-[100px]"
                variant="outline"
                onClick={() => handleCreateOrderItem(item.id)}
              >
                <span>قیمت محصول:</span>
                <strong>{item.base_price.toLocaleString()} تومان</strong>
              </Button>
            </li>
          ))}
        </ul>
      </HeadlessDialog.Panel>
    </Dialog>
  );
}

export { SelectPriceModal };
