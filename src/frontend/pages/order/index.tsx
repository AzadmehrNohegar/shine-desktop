import { Close, Plus } from "@frontend/assets/svg";
import { Button } from "@frontend/components";
import { Tab } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { AsideOrder, CreateOrder, SingleOrder } from "./partials";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteOrder, getOrder } from "@frontend/api";
import Skeleton from "react-loading-skeleton";
import clsx from "clsx";
import { ORDER_TYPES, errorResponse } from "@model/general";
import { Order, OrderItem, Product } from "@prisma/client";
import { toast } from "react-toastify";

type compositeOrderItem = OrderItem & {
  sub_total: number;
  discount_total: number;
  product: Product;
};

type compositeOrder = Order & {
  order_items: compositeOrderItem[];
};

function OrderPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [order_id, setOrder_id] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const btnRef = useRef<HTMLButtonElement | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["open-orders"],
    queryFn: () =>
      getOrder({
        params: {
          status: ORDER_TYPES["temp"],
        },
      }),
    onSuccess: (res: compositeOrder[]) => {
      setCount(res.length);
      if (res.length === 0) {
        setOrder_id(null);
        setSelectedIndex(0);
      } else if (Number(res.length) > 0 && order_id === null) {
        setOrder_id(res[0].id as number);
      }
    },
    onError: (err: unknown) => {
      const { reason } = err as errorResponse;
      toast(reason, {
        type: "error",
      });
    },
  });

  useEffect(() => {
    const debouncedTabChange = setTimeout(() => {
      setSelectedIndex(count - 1);
      if (data?.at(-1)) {
        setOrder_id(data?.at(-1)?.id as number);
      } else {
        setOrder_id(null);
      }
    }, 0);

    return () => {
      clearTimeout(debouncedTabChange);
    };
  }, [count]);

  const deleteOrderItem = useMutation(deleteOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries("open-orders");
    },
    onError: (err: unknown) => {
      const { reason } = err as errorResponse;
      toast(reason, {
        type: "error",
      });
    },
  });

  const handleTabDelete = (id: number) => {
    deleteOrderItem.mutate({
      id,
    });
  };

  const handleAddTab = () => {
    setOrder_id(null);
    if (btnRef.current) btnRef.current.blur();
  };

  if (isLoading || isError)
    return <Skeleton containerClassName="w-full" className="h-full" />;

  return (
    <div className="flex items-start h-full w-full pt-4">
      <AsideOrder order_id={order_id} />
      <Tab.Group
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
        as="div"
        className="flex flex-col gap-y-2 align-baseline w-full px-8 h-full"
      >
        <Tab.List
          as="div"
          className={clsx(
            "flex items-center gap-x-2 p-2 w-full rounded-md overflow-x-auto min-h-[60px] overflow-y-hidden",
            Number(data?.length) > 0 && "shadow-card"
          )}
        >
          {data?.map((item) => (
            <Tab
              key={item.id}
              onClick={() => setOrder_id(item.id as number)}
              as="div"
              className="min-w-max text-sm ui-selected:bg-primary ui-selected:text-white ui-not-selected:bg-white ui-not-selected:text-G2 ui-not-selected:border ui-not-selected:border-G10 pr-4 pl-14 py-3 rounded-md relative text-center cursor-pointer"
            >
              <span>سفارش باز ({item.id})</span>
              <Button
                variant="unstyled"
                size="unspecified"
                className="absolute left-1 inset-y-0 outline-none"
                onClick={(e) => {
                  e.preventDefault();
                  handleTabDelete(item.id as number);
                }}
              >
                <Close />
              </Button>
            </Tab>
          ))}
          {Number(data?.length) > 0 && (
            <Button
              variant="unstyled"
              size="unspecified"
              className="p-3 inline-flex items-center gap-x-2 min-w-max border-r border-r-G10 text-G2 rounded-md mr-auto"
              onClick={handleAddTab}
              ref={btnRef}
              disabled={Number(data?.length) > 2}
            >
              <Plus />
              افزودن سفارش
            </Button>
          )}
        </Tab.List>
        <Tab.Panels className="h-full pt-4" as="div">
          {!order_id && <CreateOrder />}
          {order_id && (
            <Fragment>
              {data?.map((item) => (
                <Tab.Panel
                  key={item.id}
                  as={SingleOrder}
                  order_id={item.id}
                  order_items={item.order_items}
                  created_date={item.created_date as unknown as string}
                />
              ))}
            </Fragment>
          )}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default OrderPage;
