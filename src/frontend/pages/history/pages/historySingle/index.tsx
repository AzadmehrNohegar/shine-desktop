import { getOrderById, postOrderByIdInvoice } from "@frontend/api";
import { ArrowRight } from "iconsax-react";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { Fragment } from "react";
import { Button } from "@frontend/components";
import { SingleHistoryRow } from "./partials";
import { toast } from "react-toastify";
import { useComputedOrderItem } from "@frontend/utils";
import { OrderItem } from "@prisma/client";

function HistorySingle() {
  const { order_id } = useParams();

  const { data, isLoading, isError } = useQuery(
    `order-single-${order_id}`,
    () => getOrderById({ id: Number(order_id) })
  );

  const postReceipt = useMutation(postOrderByIdInvoice, {
    onSuccess: () => {
      toast("رسید برای چاپگر ارسال شد.", {
        type: "success",
      });
    },
  });

  const { total_count, total_dicsount, total_price } = useComputedOrderItem(
    data?.order_items as OrderItem[]
  );

  const handlePrint = () =>
    postReceipt.mutate({
      id: Number(order_id),
    });

  if (isLoading || isError)
    return <Skeleton width="97vw" height="88vh" className="mr-4" />;

  return (
    <Fragment>
      <div className="px-4 w-full h-container">
        <div className="flex w-full items-center justify-between">
          <h1 className="flex items-center text-xl font-bold gap-x-2">
            <Link to=".." className="p-4">
              <ArrowRight />
            </Link>
            <span>سفارش شماره {order_id}</span>
          </h1>
          <span className="inline-block p-4">
            {new Intl.DateTimeFormat("fa-IR", {
              weekday: "long",
            }).format(new Date(data?.created_date as string))}{" "}
            -{" "}
            {new Intl.DateTimeFormat("fa-IR", {
              dateStyle: "short",
              timeStyle: "short",
            }).format(new Date(data?.created_date as string))}
          </span>
        </div>

        <div className="w-full px-4 flex gap-x-4 justify-between">
          <div className="w-1/3 self-start">
            <div className="shadow-sm p-4">
              <h2 className="mb-4 font-semibold text-lg">اطلاعات پرداخت</h2>
              <ul className="flex flex-col gap-y-4">
                <li className="flex items-center justify-between">
                  <span className="text-G3">تعداد اقلام</span>
                  <span className="text-G3">{total_count} عدد</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-G3">مبلغ کل</span>
                  <span className="text-G3">
                    {total_price?.toLocaleString()} ریال
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-G3">جمع تخفیف</span>
                  <span className="text-G3">
                    {total_dicsount?.toLocaleString()} ریال
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-primary font-semibold text-lg">
                    پرداخت شده
                  </span>
                  <span className="text-G3 font-semibold text-lg">
                    {(total_price! - total_dicsount!).toLocaleString()} ریال
                  </span>
                </li>
              </ul>
              <Button
                variant="regular"
                size="touch"
                className="min-w-full mt-8"
                onClick={handlePrint}
              >
                چاپ رسید
              </Button>
            </div>
            <div className="flex justify-between items-center my-4">
              <span>شماره همراه مشتری</span>
              <span>-</span>
            </div>
          </div>
          <div className="relative text-sm overflow-x-auto w-2/3 text-right shadow-sm rounded-lg max-h-[80vh] overflow-y-auto">
            <table className="w-full text-G2 text-right relative">
              <thead className="font-semibold z-10 bg-B11 sticky -top-1 border-b border-b-G10 text-GDesk">
                <tr>
                  <th scope="col" className="px-2 py-3 text-right">
                    نام و کد محصول
                  </th>
                  <th scope="col" className="px-2 py-3 text-right">
                    تعداد
                  </th>
                  <th scope="col" className="px-2 py-3 text-right">
                    <span className="inline-block min-w-max">
                      قیمت{" "}
                      <span className="text-2xs font-light text-G2">
                        (ریال)
                      </span>
                    </span>
                  </th>
                  <th scope="col" className="px-2 py-3 text-right">
                    <span className="inline-block min-w-max">
                      تخفیف{" "}
                      <span className="text-2xs font-light text-G2">
                        (ریال)
                      </span>
                    </span>
                  </th>
                  <th scope="col" className="px-2 py-3 text-right">
                    <span className="inline-block min-w-max">
                      جمع جزء{" "}
                      <span className="text-2xs font-light text-G2">
                        (ریال)
                      </span>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {(data?.order_items as OrderItem[]).map(
                  (item: unknown, index: number) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const { id, ...rest } = item as any;
                    return (
                      <SingleHistoryRow key={id} {...rest} index={index} />
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default HistorySingle;
