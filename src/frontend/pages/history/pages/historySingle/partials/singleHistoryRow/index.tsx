type product = {
  id: number;
  name: string;
  internal_code: string;
};

interface ISingleHistoryRow {
  label_price: number;
  quantity: number;
  product: product;
  index: number;
  discount_total: number;
  sub_total: number;
  id: number;
}

function SingleHistoryRow({
  label_price,
  quantity,
  product,
  sub_total,
  discount_total,
}: ISingleHistoryRow) {
  const { internal_code, name } = product;

  return (
    <tr>
      <td className="px-2 py-3 border-l border-l-G10 text-right">
        <span className="text-sm">
          {name}
          {internal_code}
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
        <strong>{discount_total.toLocaleString()}</strong>{" "}
      </td>
      <td className="px-2 py-3 truncate text-right">
        <strong>{sub_total.toLocaleString()}</strong>{" "}
      </td>
    </tr>
  );
}

export { SingleHistoryRow };
