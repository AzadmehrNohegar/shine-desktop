import {
  deleteRemittance,
  deleteRemittanceItem,
  getRemittanceById,
  getRemittanceProvider,
  putRemittance,
} from "@frontend/api";
import { Button, Input } from "@frontend/components";
import { RemittanceItem } from "@frontend/shared";
import { Trash } from "iconsax-react";
import { Fragment, useDeferredValue, useId, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function RemittanceEdit() {
  const [provider, setProvider] = useState<any>(null);
  const [search, setSearch] = useState<any>(null);
  const [autoCompleteOpen, setAutoCompleteOpen] = useState(false);

  const deferredSearch = useDeferredValue(search);

  const { remittance } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const uniqID = useId();

  const { data: paginationData } = useInfiniteQuery(
    ["remittance-provider-pagination", deferredSearch],
    ({ pageParam = 1 }) =>
      getRemittanceProvider({
        params: { page: pageParam, page_size: 10, search },
      }),
    {
      getNextPageParam: (lastPage, page) => {
        if (lastPage?.next) return page.length + 1;
        return null;
      },
    }
  );

  const { data } = useQuery(
    [`remittance-${remittance}`, remittance],
    () => getRemittanceById({ id: remittance?.toString() }),
    {
      enabled: Boolean(remittance),
      onSuccess: (res) => {
        setProvider(res.provider);
        if (res.provider) setSearch(provider.name);
      },
    }
  );

  const removeRemittanceItem = useMutation(deleteRemittanceItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(`remittance-${remittance}`);
    },
  });

  const removeRemittance = useMutation(deleteRemittance, {
    onSuccess: () => {
      navigate("..");
    },
  });

  const mutateRemittance = useMutation(putRemittance, {
    onSuccess: () => {
      queryClient.invalidateQueries(`remittance-${remittance}`);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (provider) {
      mutateRemittance.mutate({
        id: data?.id,
        body: {
          provider,
        },
      });
    } else {
      toast("لطفا تامین کننده انتخاب کنید.", {
        type: "info",
      });
    }
  };

  return (
    <div className="w-full my-4 p-4 min-h-container h-full">
      <form
        onSubmit={handleSubmit}
        className="w-full flex justify-between items-center shadow-card p-8"
      >
        <ClickAwayListener onClickAway={() => setAutoCompleteOpen(false)}>
          <div className="relative w-fit">
            <Input
              name="provider-search"
              type="text"
              value={search}
              className="w-[250px]"
              handleChange={(value) => setSearch(value)}
              onFocus={() => setAutoCompleteOpen(true)}
              placeholder="تامین کننده حواله را انتخاب کنید..."
            />
            {autoCompleteOpen && (
              <div className="absolute w-[250px] bg-white shadow-bottom z-10">
                {paginationData?.pages.map((item: any, index: number) => (
                  <Fragment key={index}>
                    {item?.results.map((entry: any, itemIndex: number) => (
                      <Button
                        key={`${entry.id}-${uniqID}`}
                        variant="unstyled"
                        size="unspecified"
                        className="w-full text-right border p-3 bg-white"
                        onClick={() => {
                          setAutoCompleteOpen(false);
                          setSearch(entry.name);
                          setProvider(entry.id);
                        }}
                      >
                        {entry.name}
                      </Button>
                    ))}
                  </Fragment>
                ))}
              </div>
            )}
          </div>
        </ClickAwayListener>

        <Button type="submit" size="touch">
          <span className="inline-block w-max">تغییر تامین کننده حواله</span>
        </Button>
      </form>
      <div className="my-2 p-8 w-full shadow-card relative">
        <div className="absolute top-6 left-4 flex gap-x-2 items-center">
          <Button
            variant="outline"
            onClick={() =>
              mutateRemittance
                .mutateAsync({
                  id: remittance?.toString(),
                  body: {
                    status: "completed",
                  },
                })
                .then(() => navigate(".."))
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
        <RemittanceItem remittance={Number(remittance)} />
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
    </div>
  );
}

export default RemittanceEdit;
