import { Link } from "react-router-dom";

interface ISingleRejectionRow {
  created_date: string;
  total_amount: number;
  id: number;
  order_items: any[];
  order_items_count: number;
}

function SingleRejectionRow({
  created_date,
  total_amount,
  id,
  order_items_count,
}: ISingleRejectionRow) {
  return (
    <tr>
      <td className="px-6 py-4 border-l border-l-G10">{id}</td>
      <td className="px-6 py-4 border-l border-l-G10">
        {new Intl.DateTimeFormat("fa-IR", {
          dateStyle: "short",
          timeStyle: "short",
        }).format(new Date(created_date))}
      </td>
      <td className="px-6 py-4 truncate border-l border-l-G10">
        <strong>{total_amount.toLocaleString()}</strong>{" "}
        <span className="text-sm font-light">ریال</span>
      </td>
      <td className="px-6 py-4 truncate border-l border-l-G10">
        {order_items_count}
      </td>
      <td className="px-6 py-4 truncate">
        <Link
          to={`./${id}`}
          className="px-10 py-2 bg-primary rounded-lg text-white"
        >
          مرجوع
        </Link>
      </td>
    </tr>
  );
}

export { SingleRejectionRow };
