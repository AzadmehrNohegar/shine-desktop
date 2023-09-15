import { getProduct, postOrder } from "@frontend/api";
import { Close } from "@frontend/assets/svg";
import { Button, Dialog, Input } from "@frontend/components";
import { Dialog as HeadlessDialog } from "@headlessui/react";
import { useDeferredValue, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

interface IAddOrderItemProps {
  order_id: number | null;
  isOpen: boolean;
  closeModal: () => void;
}
function AddOrderItem({ order_id, isOpen, closeModal }: IAddOrderItemProps) {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");

  const deferredSearch = useDeferredValue(search);

  const { data: paginationData, isLoading: isPaginationLoading } =
    useInfiniteQuery(
      ["product-pagination", deferredSearch],
      ({ pageParam = 1 }) =>
        getProduct({ params: { page: pageParam, page_size: 10, search } }),
      {
        getNextPageParam: (lastPage, page) => {
          if (lastPage?.next) return page.length + 1;
          return null;
        },
      }
    );

  const createOrderItem = useMutation(postOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries("open-orders");
      toast("محصول اضافه شد", {
        type: "success",
      });
    },
    onError: (err) => {
      // toast("محصولی با این بارکد یافت نشد.", {
      //   type: "error",
      // });
    },
  });

  const handleCreateOrderItem = (id: number) =>
    createOrderItem.mutate({
      body: {
        product_id: id,
        barcode: null,
        order_id: order_id,
      },
    });

  return (
    <Dialog isOpen={isOpen} closeModal={closeModal} placement="center">
      <HeadlessDialog.Title
        as="h3"
        className="leading-6 text-G2 flex items-center relative border-b p-4"
      >
        <span className="block mx-auto py-4 text-lg font-medium">
          ایجاد محصول
        </span>
        <Button
          variant="ghost"
          onClick={closeModal}
          className="absolute inset-y-auto left-4 outline-none focus:outline-none"
        >
          <Close className="text-G2 scale-125" />
        </Button>
      </HeadlessDialog.Title>
      <div className="border-l border-l-G8 py-4 pl-4 pr-8 h-full rtl">
        <div className="flex flex-col items-start gap-3">
          <label htmlFor="product">جست‌وجو:</label>
          <Input
            id="product"
            placeholder="محصول..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col my-6 gap-y-2 items-start">
          <h6 className="pb-2">لیست کالا</h6>
          {paginationData?.pages[0].count === 0 && (
            <span className="inline-block w-100 text-center">
              کالایی یافت نشد.
            </span>
          )}
          {isPaginationLoading && <Skeleton height={300} />}

          {paginationData?.pages[0].count > 0 && (
            <div className="max-h-[300px] overflow-y-auto border border-G8 p-2">
              {paginationData?.pages[0].results.map((item: any) => (
                <Button
                  key={item.id}
                  variant="unstyled"
                  size="unspecified"
                  className="w-full text-right py-4 border-b border-b-G6 last-of-type:border-0 text-primary truncate"
                  onClick={() => handleCreateOrderItem(item.id)}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}

export { AddOrderItem };
