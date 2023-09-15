// import { deleteRejectionItem, putRejectionItem } from "@frontend/api";
import { postRefund } from "@frontend/api";
import { Close, Minus, Plus } from "@frontend/assets/svg";
import { Button, Dialog, Input } from "@frontend/components";
import { Dialog as HeadlessDialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

interface IRejectionActionsModalProps {
  isOpen: boolean;
  closeModal: () => void;
  id: number;
  initialOrderItems: any[];
}

function RejectionActionsModal({
  id,
  initialOrderItems,
  isOpen,
  closeModal,
}: IRejectionActionsModalProps) {
  const queryClient = useQueryClient();

  const [description, setDescription] = useState("");

  const [orderItems, setOrderItems] = useState(
    initialOrderItems.map((item: any) => ({
      order_item: item.id,
      quantity: 0,
      max_quantity: item.quantity,
      name: item.product.name,
    }))
  );

  const handleIncrementOrderItemQuantity = (id: number) =>
    setOrderItems((prevState) =>
      prevState.map((item: any) => {
        if (item.order_item === id)
          return {
            ...item,
            order_item: item.order_item,
            quantity: item.quantity + 1,
          };
        return item;
      })
    );

  const handleDecrementOrderItemQuantity = (id: number) =>
    setOrderItems((prevState) =>
      prevState.map((item: any) => {
        if (item.order_item === id)
          return {
            ...item,
            order_item: item.order_item,
            quantity: item.quantity - 1,
          };
        return item;
      })
    );

  const createRefund = useMutation(postRefund, {
    onSuccess: () => {
      toast("درخواست مرجوعی ثبت شد.", {
        type: "info",
      });
      queryClient.invalidateQueries("completed-orders");
      closeModal();
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const parsedOrderItems = orderItems
      .filter((item: any) => item.quantity > 0)
      .map(({ order_item, quantity }: any) => ({
        order_item,
        quantity,
      }));
    if (parsedOrderItems.length > 0 && description !== "")
      createRefund.mutate({
        body: {
          description,
          items: orderItems,
        },
      });
  };

  return (
    <Dialog isOpen={isOpen} closeModal={closeModal} placement="center">
      <HeadlessDialog.Title
        as="h3"
        className="leading-6 text-G2 flex items-center relative bRejection-b p-4"
      >
        <span className="block mx-auto py-4 text-lg font-medium">
          مرجوعی سفارش {id}
        </span>
        <Button
          variant="ghost"
          onClick={closeModal}
          className="absolute inset-y-auto left-4 outline-none focus:outline-none"
        >
          <Close className="text-G2 scale-125" />
        </Button>
      </HeadlessDialog.Title>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-8 p-4 items-baseline"
      >
        <div className="w-full flex items-center gap-x-2">
          <label htmlFor="phone" className="inline-block min-w-max">
            دلیل مرجوعی:
          </label>
          <Input
            id="description"
            placeholder=" دلیل مرجوعی..."
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {orderItems.map((item: any) => (
          <div
            key={item.order_item}
            className="flex items-center justify-start w-full"
          >
            <span>{item.order_item}</span>
            <span>{item.name}</span>
            <div className="mr-auto flex items-center gap-x-2">
              <Button
                variant="ghost"
                type="button"
                size="touch"
                disabled={item.quantity === item.max_quantity}
                onClick={() =>
                  handleIncrementOrderItemQuantity(item.order_item)
                }
              >
                <Plus />
              </Button>
              <span>{item.quantity}</span>
              <Button
                variant="ghost"
                type="button"
                size="touch"
                disabled={item.quantity === 0}
                onClick={() =>
                  handleDecrementOrderItemQuantity(item.order_item)
                }
              >
                <Minus />
              </Button>
            </div>
          </div>
        ))}
        <div className="flex w-full gap-x-2">
          <Button
            variant="regular"
            size="touch"
            className="basis-1/2"
            type="submit"
          >
            ثبت مرجوعی
          </Button>
          <Button
            variant="ghost"
            size="touch"
            color="danger"
            className="basis-1/2"
            type="button"
            onClick={closeModal}
          >
            انصراف
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

export { RejectionActionsModal };
