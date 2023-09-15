type product = {
  id: number;
  sku: string;
  name: string;
};

interface ISingleHistoryRow {
  label_price: number;
  discount_amount: number;
  quantity: number;
  product: product;
  index: number;
  total_discount_amount: number;
  sub_total_amount: number;
  id: number;
}

function SingleHistoryRow({
  label_price,
  quantity,
  product,
  total_discount_amount,
  sub_total_amount,
}: ISingleHistoryRow) {
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
        <div className="relative min-w-[50px] flex items-center justify-center">
          {quantity}
        </div>
      </td>
      <td className="px-2 py-3 truncate border-l border-l-G10 text-right">
        {label_price}
      </td>
      <td className="px-2 py-3 truncate border-l border-l-G10 text-right">
        <strong>{total_discount_amount.toLocaleString()}</strong>{" "}
      </td>
      <td className="px-2 py-3 truncate text-right">
        <strong>{sub_total_amount.toLocaleString()}</strong>{" "}
      </td>
    </tr>
  );
}

export { SingleHistoryRow };
