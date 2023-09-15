import {
  deleteRemittance,
  deleteRemittanceItem,
  getRemittanceById,
  putRemittance,
} from "@frontend/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button } from "@frontend/components";
import { Trash } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { RemittanceItem } from "@frontend/shared";

interface IRemittanceSingleProps {
  remittance: number | null;
  setRemittance: (value: number | null) => void;
}

function RemittanceSingle({
  remittance,
  setRemittance,
}: IRemittanceSingleProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data } = useQuery(
    [`remittance-${remittance}`, remittance],
    () => getRemittanceById({ id: remittance?.toString() }),
    {
      enabled: Boolean(remittance),
    }
  );

  const removeRemittanceItem = useMutation(deleteRemittanceItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(`remittance-${remittance}`);
    },
  });

  const removeRemittance = useMutation(deleteRemittance, {
    onSuccess: () => {
      queryClient.invalidateQueries("remittance-temp-pagination");
      setRemittance(null);
    },
  });

  const completeRemittance = useMutation(putRemittance, {
    onSuccess: () => {
      queryClient.invalidateQueries("remittance-temp-pagination");
      setRemittance(null);
      navigate("..");
    },
  });

  return (
    <div className="my-2 p-8 w-full shadow-card relative">
      <div className="absolute top-6 left-4 flex gap-x-2 items-center">
        <Button
          variant="outline"
          onClick={() =>
            completeRemittance.mutate({
              id: remittance?.toString(),
              body: {
                status: "completed",
              },
            })
          }
        >
          تکمیل حواله
        </Button>
        <Button
          variant="ghost"
          color="danger"
          onClick={() =>
            removeRemittance.mutate({
              id: remittance?.toString(),
            })
          }
        >
          حذف حواله
        </Button>
      </div>

      <h1 className="text-xl mb-4">حواله : {data?.id}</h1>
      <h2 className="mb-4">ایجاد کالا برای حواله</h2>
      <RemittanceItem remittance={remittance} />
      {data?.remittance_items.length > 0 && (
        <table className="w-full text-lg text-G2 border border-G8 relatve my-5">
          <thead className="font-semibold z-20 uppercase sticky top-0 text-right">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                نام محصول
              </th>
              <th scope="col" className="px-6 py-3">
                تعداد
              </th>
              <th scope="col" className="px-6 py-3">
                قیمت واحد
              </th>
              <th scope="col" className="px-6 py-3">
                تخفیف
              </th>
              <th scope="col" className="px-6 py-3">
                جمع جزء
              </th>
              <th scope="col" className="px-6 py-3">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data?.remittance_items.map((item: any, index: number) => (
              <tr>
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4 truncate">{item.product?.name}</td>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4">
                  {Number(item.unit_price).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  {Number(item.discount_percentage)}%
                </td>
                <td className="px-6 py-4">
                  {Number(item.label_price).toLocaleString()}
                </td>
                <td>
                  <Button
                    variant="ghost"
                    color="danger"
                    onClick={() =>
                      removeRemittanceItem.mutate({
                        id: item.id,
                      })
                    }
                  >
                    <Trash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export { RemittanceSingle };
