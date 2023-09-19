import { postProductActivation } from "@frontend/api";
import { Button } from "@frontend/components";
import { Barcode, Price, Product } from "@prisma/client";
import { Fragment } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

type compositeProductBarcode = Product & {
  price: Price[];
  barcode: Barcode[];
};

function ProductTableRow({
  barcode,
  is_active,
  name,
  price,
  id,
}: compositeProductBarcode) {
  const [first, ...rest] = price;

  const queryClient = useQueryClient();

  const toggleActivation = useMutation(postProductActivation, {
    onSuccess: () => {
      queryClient.invalidateQueries(["product-pagination"]);
      toast("محصول فعال شد.", {
        type: "success",
      });
    },
  });

  const handleActivationToggle = () =>
    toggleActivation.mutate({
      id,
      body: {
        is_active: !is_active,
      },
    });

  return (
    <Fragment>
      <tr>
        <td
          className="px-2 py-3 truncate border-l border-l-G10 text-center"
          rowSpan={price.length}
        >
          {name}
        </td>
        <td
          className="px-2 py-3 truncate border-l border-l-G10 text-center"
          rowSpan={price.length}
        >
          {barcode.map((item) => (
            <span key={item.id} className="block">
              {item.code}
            </span>
          ))}
        </td>

        <td className="px-2 py-3 truncate border-l border-l-G10 text-center">
          {first?.inventory.toLocaleString()}
        </td>
        <td className="px-2 py-3 truncate border-l border-l-G10 text-center">
          {first?.base_price.toLocaleString()}
        </td>
        <td className="px-2 py-3 truncate border-l border-l-G10 text-center">
          {(
            first.base_price *
            (1 - first.base_discount_percentage! / 100)
          ).toLocaleString()}
        </td>
        <td className="px-2 py-3 truncate border-l border-l-G10 text-center">
          {first.base_discount_percentage}%
        </td>
        <td rowSpan={price.length}>
          <div className="flex flex-col items-center p-2 gap-y-2">
            <Button size="large" className="w-full">
              افزودن قیمت
            </Button>
            {!is_active && (
              <Button
                variant="outline-muted"
                size="large"
                onClick={handleActivationToggle}
              >
                فعال‌سازی محصول
              </Button>
            )}
            {is_active && (
              <Link
                to={`./${id}`}
                className="w-full h-min text-primary px-5 py-3 text-base border border-primary rounded-lg text-center"
              >
                ویرایش محصول
              </Link>
            )}
          </div>
        </td>
      </tr>
      {rest.map((item) => (
        <tr key={item.id}>
          <td className="px-2 py-3 truncate border-l border-l-G10 text-center">
            {item?.inventory.toLocaleString()}
          </td>
          <td className="px-2 py-3 truncate border-l border-l-G10 text-center">
            {item?.base_price.toLocaleString()}
          </td>
          <td className="px-2 py-3 truncate border-l border-l-G10 text-center">
            {(
              item.base_price *
              (1 - item.base_discount_percentage! / 100)
            ).toLocaleString()}
          </td>
          <td className="px-2 py-3 truncate border-l border-l-G10 text-center">
            {item.base_discount_percentage}%
          </td>
        </tr>
      ))}
    </Fragment>
  );
}

export { ProductTableRow };
