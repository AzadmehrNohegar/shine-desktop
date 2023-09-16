import { Minus, Plus } from "@frontend/assets/svg";
import { Button } from "@frontend/components";

type product = {
  id: number;
  sku: string;
  name: string;
};

interface ISingleRejectionFromRow {
  label_price: number;
  discount_amount: number;
  quantity: number;
  product: product;
  index: number;
  total_discount_amount: number;
  sub_total_amount: number;
  id: number;
  orderItemData: any;
  handleDecrementOrderItemQuantity: (id: number) => void;
  handleIncrementOrderItemQuantity: (id: any) => void;
}

function SingleRejectionFromRow({
  label_price,
  product,
  orderItemData,
  handleDecrementOrderItemQuantity,
  handleIncrementOrderItemQuantity,
  id,
}: ISingleRejectionFromRow) {
  const { sku, name } = product;

  return (
    <tr>
      <td className="px-2 py-3 border-l border-l-G10 text-right">
        <span className="text-sm">
          {name}
          {sku}
        </span>
      </td>
      <td className="px-2 py-3 border-l border-l-G10 text-right">
        <div className="mr-auto flex items-center gap-x-2">
          <Button
            variant="ghost"
            type="button"
            color="success"
            disabled={orderItemData.quantity === orderItemData.max_quantity}
            onClick={() =>
              handleIncrementOrderItemQuantity(orderItemData.order_item)
            }
          >
            <Plus />
          </Button>
          <span>{orderItemData.quantity}</span>
          <Button
            variant="ghost"
            type="button"
            color="danger"
            disabled={orderItemData.quantity === 0}
            onClick={() =>
              handleDecrementOrderItemQuantity(orderItemData.order_item)
            }
          >
            <Minus />
          </Button>
        </div>
      </td>
      <td className="px-2 py-3 truncate border-l border-l-G10 text-right">
        {label_price}
      </td>
    </tr>
  );
}

export { SingleRejectionFromRow };