import { deleteOrderItem, putOrderItem } from "@frontend/api";
import { Close } from "@frontend/assets/svg";
import { Button, Dialog, Input } from "@frontend/components";
import { Dialog as HeadlessDialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

interface IOrderActionsModalProps {
  isOpen: boolean;
  closeModal: () => void;
  id: number;
  initialQuantity: number;
  initialLabelPrice: number;
  name: string;
}

interface IOrderActions {
  quantity: number | null;
  label_price: number | null;
}

function OrderActionsModal({
  id,
  initialLabelPrice,
  initialQuantity,
  isOpen,
  closeModal,
  name,
}: IOrderActionsModalProps) {
  const queryClient = useQueryClient();

  const { getValues, handleSubmit, register } = useForm<IOrderActions>({
    defaultValues: {
      quantity: null,
      label_price: null,
    },
    mode: "onChange",
    values: {
      quantity: initialQuantity || null,
      label_price: initialLabelPrice || null,
    },
  });

  const mutateOrderItem = useMutation(putOrderItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("open-orders").then(() => {
        closeModal();
      });
    },
  });

  const removeOrderItem = useMutation(deleteOrderItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("open-orders").then(() => {
        closeModal();
      });
    },
  });

  const onSubmit = () =>
    mutateOrderItem.mutate({
      id: id.toString(),
      body: {
        ...getValues(),
      },
    });

  const handleDeleteOrderItem = () =>
    removeOrderItem.mutate({
      id: id.toString(),
    });

  return (
    <Dialog isOpen={isOpen} closeModal={closeModal} placement="center">
      <HeadlessDialog.Title
        as="h3"
        className="leading-6 text-G2 flex items-center relative border-b p-4"
      >
        <span className="block mx-auto py-4 text-lg font-medium">
          تغییر محصول
        </span>
        <Button
          variant="ghost"
          onClick={closeModal}
          className="absolute inset-y-auto left-4 outline-none focus:outline-none"
        >
          <Close className="text-G2 scale-125" />
        </Button>
      </HeadlessDialog.Title>
      <div className="flex flex-col gap-y-8 p-4 items-baseline">
        <h2 className="text-xl w-full text-right">{name}</h2>
        <div className="flex flex-col items-baseline gap-y-2 w-full">
          <label htmlFor="quantity" className="w-full text-right">
            تعداد:{" "}
          </label>
          <Input
            id="quantity"
            defaultValue=""
            className="w-full"
            {...register("quantity", {
              required: true,
            })}
          />
        </div>
        <div className="flex flex-col items-baseline gap-y-2 w-full">
          <label htmlFor="label_price" className="w-full text-right">
            قیمت واحد:
          </label>
          <Input
            id="label_price"
            defaultValue=""
            {...register("label_price", {
              required: true,
            })}
            className="w-full"
            iconLeft={<span className="text-G4">ریال</span>}
          />
        </div>
        <div className="flex w-full gap-x-2">
          <Button
            variant="regular"
            size="touch"
            className="basis-1/2"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            ثبت تغییرات
          </Button>
          <Button
            variant="outline"
            size="touch"
            color="danger"
            className="basis-1/4"
            type="button"
            onClick={handleDeleteOrderItem}
          >
            حذف
          </Button>
          <Button
            variant="ghost"
            size="touch"
            color="danger"
            className="basis-1/4"
            type="button"
            onClick={closeModal}
          >
            انصراف
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export { OrderActionsModal };
