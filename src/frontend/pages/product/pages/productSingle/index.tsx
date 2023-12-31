import { ArrowRight } from "iconsax-react";
import { Link, useParams } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Barcode, Price, Product } from "@prisma/client";
import { Button, Input } from "@frontend/components";
import { Plus } from "@frontend/assets/svg";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getProductById,
  postProduct,
  postProductActivation,
  putProduct,
} from "@frontend/api";
import { toast } from "react-toastify";
import { errorResponse } from "@model/general";

type compositeProduct = Product & {
  price: Pick<Price, "inventory" | "base_discount_percentage" | "base_price">[];
  barcode: Pick<Barcode, "code">[];
};

function ProductSingle() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const toggleActivation = useMutation(postProductActivation, {
    onSuccess: () => {
      toast("وضعیت محصول تغییر یافت", {
        type: "info",
      });
      queryClient.invalidateQueries();
    },
    onError: (err: unknown) => {
      const { reason } = err as errorResponse;
      toast(reason, {
        type: "error",
      });
    },
  });

  const { data } = useQuery(
    `product-single-${id}`,
    () => getProductById({ id: Number(id) }),
    {
      enabled: Boolean(id),
      onError: (err: unknown) => {
        const { reason } = err as errorResponse;
        toast(reason, {
          type: "error",
        });
      },
    }
  );

  const handleActivationToggle = () =>
    toggleActivation.mutate({
      id: Number(id),
      body: {
        is_active: !(data as compositeProduct).is_active,
      },
    });

  const {
    control,
    register,
    watch,
    getValues,
    formState: { isValid },
  } = useForm<compositeProduct>({
    defaultValues: {
      name: "",
      internal_code: 0,
      barcode: [],
      price: [
        {
          base_discount_percentage: 0,
          base_price: 0,
          inventory: 0,
        },
      ],
    },
    values: {
      ...(data as compositeProduct),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "price",
  });

  const {
    fields: barcodes,
    append: barcodesAppend,
    remove: barcodesRemove,
  } = useFieldArray({
    control,
    name: "barcode",
  });

  const createProduct = useMutation(postProduct, {
    onSuccess: () => {
      toast("محصول با موفقیت ایجاد شد.", {
        type: "success",
      });
    },
    onError: (err: unknown) => {
      const { reason } = err as errorResponse;
      toast(reason, {
        type: "error",
      });
    },
  });

  const modifyProduct = useMutation(putProduct, {
    onSuccess: () => {
      toast("محصول با موفقیت تدوین شد.", {
        type: "info",
      });
    },
    onError: (err: unknown) => {
      const { reason } = err as errorResponse;
      toast(reason, {
        type: "error",
      });
    },
  });

  const onSubmit = () => {
    if (!isValid) {
      toast("اطلاعات وارد شده نامعتبر می‌باشند.", {
        type: "error",
      });
    } else {
      if (!id) {
        createProduct.mutate({
          body: {
            ...getValues(),
          },
        });
      } else {
        modifyProduct.mutate({
          id: Number(id),
          body: {
            ...getValues(),
          },
        });
      }
    }
  };

  return (
    <div className="px-4 w-full">
      <div className="flex w-full items-center justify-between border-b mb-4">
        <h1 className="flex items-center text-xl font-bold gap-x-2 w-full">
          <Link to=".." className="p-4">
            <ArrowRight />
          </Link>
          {id && <span>محصول شماره {id}</span>}
          {!id && <span>افزودن محصول</span>}
          {id && !(data as compositeProduct)?.is_active && (
            <Button
              variant="ghost"
              color="primary"
              className="ms-auto"
              onClick={handleActivationToggle}
            >
              فعال‌سازی محصول
            </Button>
          )}
          {id && (data as compositeProduct)?.is_active && (
            <Button
              variant="ghost"
              color="danger"
              className="ms-auto"
              onClick={handleActivationToggle}
            >
              غیر فعال‌سازی محصول
            </Button>
          )}
        </h1>
      </div>
      <div className="flex items-stretch justify-between gap-x-4">
        <div className="flex flex-col items-start gap-y-2 w-full pb-[100px]">
          <div className="w-full">
            <label htmlFor="unit_price" className="inline-block min-w-max">
              نام محصول
            </label>
            <Input
              id="name"
              containerClassName="w-full"
              placeholder="نام محصول..."
              {...register("name", {
                required: true,
              })}
            />
          </div>
          <div>
            <label htmlFor="internal_code" className="inline-block min-w-max">
              کد داخلی محصول
            </label>
            <Input
              id="internal_code"
              type="number"
              containerClassName="w-full"
              placeholder="کد داخلی محصول..."
              onFocus={(e) => e.currentTarget.select()}
              {...register("internal_code", {
                required: true,
                valueAsNumber: true,
              })}
            />
          </div>

          <ul className="flex flex-col divide-y gap-y-4">
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
                        ((watch().price?.at(index)?.base_discount_percentage ||
                          0) /
                          100)
                    }
                    disabled
                  />
                </div>
              </li>
            ))}
          </ul>
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
        </div>
        <div className="w-2/5 p-4 shadow-card rounded-lg">
          <h2 className="w-full text-xl font-bold my-4">بارکدها</h2>
          <ul className="flex flex-col">
            {barcodes.map((item, index) => (
              <li
                key={item.id}
                className="flex items-center justify-between border-b last-of-type:border-b-transparent py-2"
              >
                <div className="flex flex-col items-start w-full">
                  <label
                    htmlFor={`${index}.code`}
                    className="flex items-center justify-between w-full"
                  >
                    <span>بارکد {index + 1}</span>
                    <Button
                      color="danger"
                      variant="ghost"
                      size="unspecified"
                      type="button"
                      className="p-2 mt-auto"
                      onClick={() => barcodesRemove(index)}
                    >
                      حذف
                    </Button>
                  </label>
                  <Controller
                    control={control}
                    name={`barcode.${index}.code`}
                    render={({ field }) => (
                      <Input
                        id={`${index}.code`}
                        onFocus={(e) => e.currentTarget.select()}
                        containerClassName="w-full"
                        {...field}
                      />
                    )}
                  />
                </div>
              </li>
            ))}
          </ul>
          <Button
            type="button"
            size="large"
            className="flex items-center justify-center gap-x-2 mt-4 w-full text-center"
            onClick={() =>
              barcodesAppend({
                code: "",
              })
            }
          >
            <Plus />
            افزودن بارکد جدید
          </Button>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-screen p-4">
        <Button
          className="w-full"
          color="success"
          size="touch"
          type="button"
          onClick={onSubmit}
        >
          {id && "ویرایش محصول"}
          {!id && "افزودن محصول"}
        </Button>
      </div>
    </div>
  );
}

export default ProductSingle;
