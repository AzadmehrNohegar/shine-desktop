import { getOrderPagination } from "@frontend/api";
import { Input } from "@frontend/components";
import { useDeferredValue, useState } from "react";
import { useQuery } from "react-query";
import { SingleHistoryRow } from "./partials";
import Skeleton from "react-loading-skeleton";
import { TablePagination } from "@frontend/shared";
import { Order } from "@prisma/client";

function HistoryList() {
  const [search, setSearch] = useState<string | number>("");
  const deferredSearch = useDeferredValue(search);

  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery(
    ["orders-list", page, deferredSearch],
    () =>
      getOrderPagination({
        params: { page, page_size: 10, id: Number(search) },
      }),
    {
      initialData: { count: 0, results: [] },
      keepPreviousData: true,
    }
  );

  if (isLoading || isError)
    return <Skeleton width="97vw" height="88vh" className="mr-4" />;

  return (
    <div className="w-full my-4 p-4 min-h-container h-full shadow-card">
      <div className="w-1/3 flex items-center gap-x-2 mb-4">
        <label htmlFor="phone" className="inline-block min-w-max">
          شماره سفارش:
        </label>
        <Input
          id="phone"
          placeholder="شماره سفارش..."
          type="number"
          value={search}
          onChange={(e) => {
            if (page > 1) setPage(1);
            setSearch(e.target.valueAsNumber);
          }}
        />
      </div>
      {data?.results && (
        <table className="w-full text-G2 text-right border border-G10 relative">
          <thead className="font-semibold z-10 bg-B11 sticky -top-1 border-b border-b-G10 text-GDesk">
            <tr>
              <th scope="col" className="px-6 py-3">
                شماره سفارش
              </th>
              <th scope="col" className="px-6 py-3">
                تاریخ سفارش
              </th>
              <th scope="col" className="px-6 py-3">
                مبلغ سفارش{" "}
                <span className="text-2xs font-light text-G2">(ریال)</span>
              </th>
              <th scope="col" className="px-6 py-3">
                تعداد کل اقلام
              </th>
              <th scope="col" className="px-6 py-3">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data?.results.map((item: unknown) => {
              const { id, created_date, ...rest } = item as Order;
              return (
                <SingleHistoryRow
                  key={id}
                  id={id}
                  created_date={created_date.toString()}
                  {...rest}
                />
              );
            })}
          </tbody>
        </table>
      )}

      <TablePagination
        page={page}
        setPage={setPage}
        count={data?.count as number}
      />
    </div>
  );
}

export default HistoryList;
