import { deleteOrderItem, putOrderItem } from "@frontend/api";
import { Close, Minus, Plus } from "@frontend/assets/svg";
import { Button, Input } from "@frontend/components";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useMutation, useQueryClient } from "react-query";

type product = {
  id: number;
  internal_code: string;
  name: string;
};

interface ISingleOrderRow {
  product: product;
  quantity: number;
  sub_total: number;
  id: number;
  label_price: number;
  discount_total: number;
}

function SingleOrderRow({
  label_price,
  quantity,
  product,
  discount_total,
  sub_total,
  id,
}: ISingleOrderRow) {
  const { internal_code, name } = product;

  const [labelPriceEditable, setLabelPriceEditable] = useState<string>(
    label_price.toString()
  );

  const [quantityEditable, setQuantityEditable] = useState<number>(quantity);

  const queryClient = useQueryClient();

  const mutateOrderItem = useMutation(putOrderItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("open-orders");
    },
  });

  const removeOrderItem = useMutation(deleteOrderItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("open-orders");
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

  const handleLabelPriceChange = (value?: string) => {
    mutateOrderItem.mutate({
      id: id,
      body: {
        quantity,
        label_price: Number(value),
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
          {name}
          {internal_code}
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
        <NumericFormat
          name="labelPriceEditable"
          className="px-0 text-center max-w-[80px] rounded-lg border border-G10 py-3"
          value={labelPriceEditable}
          onValueChange={({ value }) => {
            setLabelPriceEditable(value);
            handleLabelPriceChange(value);
          }}
          thousandSeparator
        />
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
