import { postOrderByIdInvoice } from "@frontend/api";
import { Button } from "@frontend/components";
import { useComputedOrderItem } from "@frontend/utils";
import { OrderItem } from "@prisma/client";
import { Fragment } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface ISingleHistoryRow {
  created_date: string;
  id: number;
  order_items?: OrderItem[];
}

function SingleHistoryRow({
  created_date,
  id,
  order_items,
}: ISingleHistoryRow) {
  const postReceipt = useMutation(postOrderByIdInvoice, {
    onSuccess: () => {
      toast("رسید برای چاپگر ارسال شد.", {
        type: "success",
      });
    },
  });

  const { total_count, total_price } = useComputedOrderItem(order_items!);

  const handlePrint = () =>
    postReceipt.mutate({
      id,
    });

  return (
    <Fragment>
      <tr>
        <td className="px-2 py-3 truncate border-l border-l-G10 text-right">
          {id}
        </td>
        <td className="px-2 py-3 truncate border-l border-l-G10 text-right">
          {new Intl.DateTimeFormat("fa-IR", {
            dateStyle: "short",
            timeStyle: "short",
          }).format(new Date(created_date))}
        </td>
        <td className="px-2 py-3 truncate border-l border-l-G10 text-right">
          <strong>{total_price?.toLocaleString()}</strong>{" "}
          <span className="text-sm font-light">ریال</span>
        </td>
        <td className="px-2 py-3 truncate border-l border-l-G10 text-right">
          {total_count}
        </td>
        <td className="px-6 py-4 truncate">
          <div className="flex align-center gap-x-2">
            <Link
              to={`./${id}`}
              className="bg-primary text-white rounded-md px-4 py-1 min-w-[140px] inline-flex items-center justify-center"
            >
              <span>مشاهده جزئیات</span>
            </Link>
            <Button
              variant="outline"
              type="button"
              className="min-w-[140px]"
              onClick={handlePrint}
            >
              چاپ رسید
            </Button>
          </div>
        </td>
      </tr>
    </Fragment>
  );
}

export { SingleHistoryRow };
