import { deleteOrderItem, putOrderItem } from "@frontend/api";
import { Close, Minus, Plus } from "@frontend/assets/svg";
import { Button, Input } from "@frontend/components";
import { errorResponse } from "@model/general";
import { Barcode, OrderItem, Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

type compositeOrderItem = OrderItem & {
  sub_total: number;
  discount_total: number;
  product: Product & {
    barcode: Barcode[];
  };
};

function SingleOrderRow({
  label_price,
  quantity,
  product,
  discount_total,
  sub_total,
  id,
}: compositeOrderItem) {
  const { barcode, name } = product;

  const [quantityEditable, setQuantityEditable] = useState<number>(quantity);

  const queryClient = useQueryClient();

  const mutateOrderItem = useMutation(putOrderItem, {
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

  const removeOrderItem = useMutation(deleteOrderItem, {
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

  const handleDeleteOrderItem = () =>
    removeOrderItem.mutate({
      id,
    });

  const handleQuantityChange = (value?: number) => {
    mutateOrderItem.mutate({
      id,
      body: {
        quantity: value,
        label_price,
      },
    });
  };

  useEffect(() => {
    if (quantity !== quantityEditable) setQuantityEditable(quantity);
  }, [quantity]);

  return (
    <tr className="border-b border-b-G10">
      <td className="border-l border-l-G10 text-right">
        <Button
          color="danger"
          variant="ghost"
          size="unspecified"
          type="button"
          className="px-2 py-3 my-1"
          onClick={handleDeleteOrderItem}
        >
          <Close />
        </Button>
      </td>
      <td className="px-2 py-3 border-l border-l-G10 text-right">
        <span className="text-sm">
          {name} {barcode[0]?.code}
        </span>
      </td>
      <td className="px-2 py-3 border-l border-l-G10 text-right">
        <div className="relative min-w-[50px] flex items-center justify-center">
          <Button
            variant="ghost"
            type="button"
            size="unspecified"
            color="success"
            className="p-2"
            onClick={(e) => {
              e.currentTarget.blur();
              setQuantityEditable(quantity + 1);
              handleQuantityChange(quantity + 1);
            }}
          >
            <Plus />
          </Button>
          <Input
            name="quantityEditable"
            className="px-0 min-w-[40px] max-w-[40px] text-center"
            type="number"
            value={quantityEditable}
            onFocus={(e) => e.currentTarget.select()}
            onChange={(e) => {
              setQuantityEditable(e.target.valueAsNumber);
              handleQuantityChange(e.target.valueAsNumber);
            }}
          />

          <Button
            variant="ghost"
            type="button"
            size="unspecified"
            className="p-2"
            color="danger"
            onClick={(e) => {
              e.currentTarget.blur();
              setQuantityEditable(quantity - 1);
              handleQuantityChange(quantity - 1);
            }}
          >
            <Minus />
          </Button>
        </div>
      </td>
      <td className="px-2 py-3 truncate border-l border-l-G10 text-right">
        <strong>{label_price.toLocaleString()}</strong>
      </td>
      <td className="px-2 py-3 truncate border-l border-l-G10 text-right">
        <strong>{discount_total.toLocaleString()}</strong>{" "}
      </td>
      <td className="px-2 py-3 truncate text-right">
        <strong>{sub_total.toLocaleString()}</strong>{" "}
      </td>
    </tr>
  );
}

export { SingleOrderRow };
