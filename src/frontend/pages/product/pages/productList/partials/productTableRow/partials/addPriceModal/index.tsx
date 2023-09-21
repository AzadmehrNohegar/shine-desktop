import { getProductById, putProduct } from "@frontend/api";
import { Close, Plus } from "@frontend/assets/svg";
import { Button, Dialog, Input } from "@frontend/components";
import { Dialog as HeadlessDialog } from "@headlessui/react";
import { Barcode, Price, Product } from "@prisma/client";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";

interface IAddPriceModalProps {
  isOpen: boolean;
  closeModal: () => void;
  product_id: number;
}

type compositeProduct = Product & {
  price: Pick<Price, "inventory" | "base_discount_percentage" | "base_price">[];
  barcode: Pick<Barcode, "code">[];
};

function AddPriceModal({
  closeModal,
  isOpen,
  product_id,
}: IAddPriceModalProps) {
  const queryClient = useQueryClient();

  const { data } = useQuery(`product-single-${product_id}`, () =>
    getProductById({ id: product_id })
  );

  const { control, watch, getValues, handleSubmit } = useForm<compositeProduct>(
    {
      defaultValues: {
        name: "",
        barcode: [],
        price: [],
      },
      values: {
        ...(data as compositeProduct),
      },
    }
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: "price",
  });

  const modifyProduct = useMutation(putProduct, {
    onSuccess: () => {
      toast("محصول با موفقیت تدوین شد.", {
        type: "info",
      });
      queryClient.invalidateQueries();
      closeModal();
    },
  });

  const onSubmit = () =>
    modifyProduct.mutate({
      id: product_id,
      body: {
        ...getValues(),
      },
    });

  return (
    <Dialog isOpen={isOpen} closeModal={closeModal} placement="top">
      <HeadlessDialog.Title
        as="h3"
        className="leading-6 text-G2 flex items-center relative border-b p-4"
      >
        <span className="block me-auto py-4 text-lg font-medium">
          افزودن قیمت
        </span>
        <Button
          variant="ghost"
          color="danger"
          onClick={closeModal}
          className="absolute inset-y-auto left-4 outline-none focus:outline-none"
        >
          <Close />
        </Button>
      </HeadlessDialog.Title>
      <HeadlessDialog.Panel
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 pt-4 pb-[100px] h-[600px] max-h-[600px] overflow-auto relative"
      >
        {fields.map((item, index) => (
          <li
            key={item.id}
            className="flex flex-wrap items-center justify-between"
          >
            <h2 className="w-full text-xl font-bold my-4 flex items-center justify-between">
              <span>قیمت {index + 1}</span>
              <Button
                color="danger"
                variant="ghost"
                size="unspecified"
                type="button"
                className="p-2 mt-auto"
                onClick={() => remove(index)}
              >
                حذف
              </Button>
            </h2>
            <div className="flex flex-col items-start">
              <label htmlFor={`${index}.inventory`}>موجودی</label>
              <Controller
                render={({ field: { onChange, ...rest } }) => (
                  <Input
                    id={`${index}.inventory`}
                    onFocus={(e) => e.currentTarget.select()}
                    className="max-w-[100px]"
                    type="number"
                    onChange={(e) => onChange(+e.target.value || 0)}
                    {...rest}
                  />
                )}
                name={`price.${index}.inventory`}
                control={control}
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor={`${index}.base_price`}>
                قیمت
                <small className="text-xs text-G4">(ریال)</small>
              </label>
              <Controller
                rules={{
                  validate: (value) => value > 0,
                }}
                render={({ field: { onChange, ...rest } }) => (
                  <Input
                    id={`${index}.base_price`}
                    onFocus={(e) => e.currentTarget.select()}
                    type="number"
                    onChange={(e) => onChange(+e.target.value || 0)}
                    {...rest}
                  />
                )}
                name={`price.${index}.base_price`}
                control={control}
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor={`${index}.base_discount_percentage`}>
                تخفیف
                <small className="text-xs text-G4">(درصد)</small>
              </label>
              <Controller
                render={({ field: { onChange, value, ...rest } }) => (
                  <Input
                    onFocus={(e) => e.currentTarget.select()}
                    id={`price.${index}.base_discount_percentage`}
                    className="max-w-[100px]"
                    type="number"
                    value={value || 0}
                    onChange={(e) => onChange(+e.target.value || 0)}
                    {...rest}
                  />
                )}
                name={`price.${index}.base_discount_percentage`}
                control={control}
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor={`${index}.base_discount_percentage`}>
                قیمت با تخفیف
                <small className="text-xs text-G4">(ریال)</small>
              </label>
              <Input
                id={`price.${index}.base_discount_percentage`}
                type="number"
                value={
                  (watch().price?.at(index)?.base_price || 0) -
                  (watch().price?.at(index)?.base_price || 0) *
                    ((watch().price?.at(index)?.base_discount_percentage || 0) /
                      100)
                }
                disabled
              />
            </div>
          </li>
        ))}
        <Button
          type="button"
          size="large"
          className="flex items-center gap-x-2 mt-4"
          onClick={() =>
            append({
              base_discount_percentage: 0,
              base_price: 0,
              inventory: 0,
            })
          }
        >
          <Plus />
          افزودن قیمت جدید
        </Button>
        <div className="absolute bottom-0 left-0 w-full p-4">
          <Button className="w-full" color="success" size="touch">
            ثبت قیمت
          </Button>
        </div>
      </HeadlessDialog.Panel>
    </Dialog>
  );
}

export { AddPriceModal };
