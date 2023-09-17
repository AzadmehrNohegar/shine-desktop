import { useComputedOrderItem } from "@frontend/utils";
import { OrderItem } from "@prisma/client";
import clsx from "clsx";
import { Link } from "react-router-dom";

interface ISingleRejectionRow {
  created_date: string;
  id: number;
  order_items: OrderItem[];
  is_refunded: boolean;
}

function SingleRejectionRow({
  created_date,
  id,
  order_items,
  is_refunded,
}: ISingleRejectionRow) {
  const { total_count, total_price } = useComputedOrderItem(order_items);

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
        <strong>{total_price?.toLocaleString()}</strong>{" "}
        <span className="text-sm font-light">ریال</span>
      </td>
      <td className="px-6 py-4 truncate border-l border-l-G10">
        {total_count}
      </td>
      <td className="px-6 py-4 truncate">
        <Link
          to={`./${id}`}
          onClick={(e) => {
            if (is_refunded) {
              e.stopPropagation();
              e.preventDefault();
            }
          }}
          className={clsx(
            is_refunded &&
              "px-10 py-2 rounded-lg bg-disabled text-G4 cursor-not-allowed",
            !is_refunded && "px-10 py-2 bg-primary rounded-lg text-white"
          )}
        >
          مرجوع
        </Link>
      </td>
    </tr>
  );
}

export { SingleRejectionRow };
