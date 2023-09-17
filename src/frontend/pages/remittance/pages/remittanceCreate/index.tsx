import {
  getRemittance,
  getRemittanceProvider,
  postRemittance,
} from "@frontend/api";
import { Button, Input } from "@frontend/components";
import { Fragment, useDeferredValue, useId, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { RemittanceSingle } from "./partials";
import Skeleton from "react-loading-skeleton";
import { ORDER_TYPES } from "@model/general";

function RemittanceCreate() {
  const [search, setSearch] = useState("");
  const [autoCompleteOpen, setAutoCompleteOpen] = useState(false);
  const [provider, setProvider] = useState<number | null>(null);
  const [remittance, setRemittance] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const uniqID = useId();

  const deferredSearch = useDeferredValue(search);

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

  const { data: remittanceData, isLoading: remittanceLoading } =
    useInfiniteQuery(
      ["remittance-temp-pagination"],
      ({ pageParam = 1 }) =>
        getRemittance({
          params: {
            page: pageParam,
            page_size: 10,
            status: ORDER_TYPES["temp"],
          },
        }),
      {
        getNextPageParam: (lastPage, page) => {
          if (lastPage?.next) return page.length + 1;
          return null;
        },
      }
    );

  const createRemittance = useMutation(postRemittance, {
    onSuccess: (res: any) => {
      setRemittance(res.id);
      toast("حواله ایجاد شد.", {
        type: "info",
      });
      setSearch("");
      setProvider(null);
      queryClient.invalidateQueries("remittance-temp-pagination");
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (provider) {
      createRemittance.mutate({
        body: {
          id: provider,
        },
      });
    } else {
      toast("لطفا تامین کننده انتخاب کنید.", {
        type: "info",
      });
    }
  };

  return (
    <div className="w-full my-4 p-4 min-h-container">
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
          <span className="inline-block w-max">ایجاد حواله جدید</span>
        </Button>
      </form>
      {remittanceLoading && (
        <Skeleton width="100%" height={150} className="my-4 p-4" />
      )}
      {remittanceData?.pages[0].count > 0 && (
        <div className="p-8 w-full shadow-card my-4">
          <h2 className="mb-4">حواله های باز</h2>
          {remittanceData?.pages.map((item: any, index: number) => (
            <Fragment key={index}>
              {item.results.map((entry: any) => (
                <Button
                  key={entry.id}
                  variant="ghost"
                  color="primary"
                  onClick={() => setRemittance(entry.id)}
                >
                  {entry.id}: حواله{" "}
                  {new Intl.DateTimeFormat("fa-IR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date(entry.created_date))}
                </Button>
              ))}
            </Fragment>
          ))}
        </div>
      )}
      {remittance && (
        <RemittanceSingle
          remittance={remittance}
          setRemittance={setRemittance}
        />
      )}
    </div>
  );
}

export default RemittanceCreate;
