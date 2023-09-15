import { deleteRemittance, getRemittance, putRemittance } from "@frontend/api";
import { Plus } from "@frontend/assets/svg";
import { Button } from "@frontend/components";
import { REMITTANCE_STATUS } from "@frontend/constants";
import { TablePagination } from "@frontend/shared";
import { Edit2, Trash } from "iconsax-react";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";

function RemittanceList() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const { data: remittanceData, isLoading } = useQuery(
    ["remittance-pagination", page],
    () =>
      getRemittance({
        params: { page, page_size: 10 },
      })
  );

  const removeRemittance = useMutation(deleteRemittance, {
    onSuccess: () => {
      queryClient.invalidateQueries("remittance-pagination");
    },
  });

  const completeRemittance = useMutation(putRemittance, {
    onSuccess: () => {
      queryClient.invalidateQueries("remittance-pagination");
    },
  });

  return (
    <div className="w-full my-4 p-4 min-h-container h-full">
      <div className="shadow-card p-4 flex justify-between items-center">
        <h2 className="text-xl">لیست حوالات</h2>
        <Link
          to="./create"
          className="inline-flex items-center gap-x-2 border border-primary text-primary px-6 py-4 rounded-lg"
        >
          ایجاد حواله <Plus />
        </Link>
      </div>
      {isLoading && <Skeleton height={734} />}
      {remittanceData?.count > 0 && (
        <table className="w-full text-lg text-G2 border border-G8 relatve mt-5">
          <thead className="font-semibold z-20 uppercase sticky top-0 text-right">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                نام تامین کننده
              </th>
              <th scope="col" className="px-6 py-3">
                تاریخ ایجاد حواله
              </th>
              <th scope="col" className="px-6 py-3">
                وضعیت حواله
              </th>
              <th scope="col" className="px-6 py-3">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {remittanceData?.results.map((item: any, index: number) => (
              <tr key={item.id}>
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4 truncate">
                  {item.provider?.name || ""}
                </td>
                <td className="px-6 py-4">
                  {new Intl.DateTimeFormat("fa-IR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date(item.created_date))}
                </td>

                <td className="px-6 py-4">{REMITTANCE_STATUS[item.status]}</td>
                <td>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      color="primary"
                      onClick={() =>
                        completeRemittance.mutate({
                          id: item.id,
                          body: {
                            status: "completed",
                          },
                        })
                      }
                      disabled={item.status !== "temp"}
                    >
                      تکمیل حواله
                    </Button>
                    <Button
                      variant="ghost"
                      color="primary"
                      onClick={() => navigate(`./${item.id}`)}
                      disabled={item.status !== "temp"}
                    >
                      <Edit2 />
                    </Button>
                    <Button
                      variant="ghost"
                      color="danger"
                      onClick={() =>
                        removeRemittance.mutate({
                          id: item.id,
                        })
                      }
                      disabled={item.status !== "temp"}
                    >
                      <Trash />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <TablePagination
        page={page}
        setPage={setPage}
        count={remittanceData?.count}
      />
    </div>
  );
}

export default RemittanceList;
