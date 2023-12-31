import { getOrderById, postRefund } from "@frontend/api";
import { ArrowRight } from "iconsax-react";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SingleRejectionFromRow } from "./partials";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Button, Input } from "@frontend/components";
import { OrderItem, Product } from "@prisma/client";
import { useComputedOrderItem } from "@frontend/utils";
import { errorResponse, rejectionOrderItem } from "@model/general";

type compositeOrderItem = OrderItem & {
  product: Product;
};

function RejectionFromSinglePage() {
  const { id } = useParams();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [orderItems, setOrderItems] = useState<rejectionOrderItem[] | null>(
    null
  );
  const [description, setDescription] = useState("");

  const { data, isLoading, isError } = useQuery(
    `order-single-${id}`,
    () => getOrderById({ id: Number(id) }),
    {
      onSuccess: (res: Record<string, unknown>) =>
        setOrderItems(
          (res.order_items as compositeOrderItem[]).map((item) => ({
            order_item: item.id,
            quantity: 0,
            max_quantity: item.quantity,
            name: item.product.name,
          }))
        ),
      onError: (err: unknown) => {
        const { reason } = err as errorResponse;
        toast(reason, {
          type: "error",
        });
      },
    }
  );

  const { total_count } = useComputedOrderItem(
    data?.order_items as OrderItem[]
  );

  const handleIncrementOrderItemQuantity = (id: number) =>
    setOrderItems((prevState) =>
      prevState!.map((item) => {
        if (item.order_item === id)
          return {
            ...item,
            order_item: item.order_item,
            quantity: item.quantity + 1,
          };
        return item;
      })
    );

  const handleDecrementOrderItemQuantity = (id: number) =>
    setOrderItems((prevState) =>
      prevState!.map((item) => {
        if (item.order_item === id)
          return {
            ...item,
            order_item: item.order_item,
            quantity: item.quantity - 1,
          };
        return item;
      })
    );

  const createRefund = useMutation(postRefund, {
    onSuccess: () => {
      toast("درخواست مرجوعی ثبت شد.", {
        type: "info",
      });
      queryClient.invalidateQueries("completed-orders");
      navigate("..");
    },
    onError: (err: unknown) => {
      const { reason } = err as errorResponse;
      toast(reason, {
        type: "error",
      });
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsedOrderItems = orderItems!
      .filter((item) => item.quantity > 0)
      .map(({ order_item, quantity }) => ({
        order_item,
        quantity,
      }));
    if (parsedOrderItems.length > 0)
      createRefund.mutate({
        body: {
          order_id: Number(id),
          description,
          items: parsedOrderItems,
        },
      });
  };

  if (isLoading || isError)
    return <Skeleton width="97vw" height="88vh" className="mr-4" />;

  return (
    <div className="px-4 w-full h-container">
      <div className="flex w-full items-center justify-between">
        <h1 className="flex items-center text-xl font-bold gap-x-2">
          <Link to=".." className="p-4">
            <ArrowRight />
          </Link>
          <span>مرجوعی سفارش شماره {id}</span>
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
        <div className="relative text-sm overflow-x-auto w-2/3 text-right shadow-sm rounded-lg max-h-[80vh] overflow-y-auto">
          <table className="w-full text-G2 text-right relative">
            <thead className="font-semibold z-10 bg-B11 sticky -top-1 border-b border-b-G10 text-GDesk">
              <tr>
                <th scope="col" className="px-2 py-3 text-right">
                  نام و کد محصول
                </th>
                <th scope="col" className="px-2 py-3 text-right">
                  تعداد مرجوعی
                </th>
                <th scope="col" className="px-2 py-3 text-right">
                  <span className="inline-block min-w-max">
                    قیمت{" "}
                    <span className="text-2xs font-light text-G2">(ریال)</span>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {orderItems &&
                (data?.order_items as compositeOrderItem[]).map(
                  (item, index: number) => {
                    const { id, product, ...rest } = item;
                    return (
                      <SingleRejectionFromRow
                        id={id}
                        product={product}
                        orderItemData={orderItems[index]}
                        index={index}
                        key={item.id}
                        handleDecrementOrderItemQuantity={
                          handleDecrementOrderItemQuantity
                        }
                        handleIncrementOrderItemQuantity={
                          handleIncrementOrderItemQuantity
                        }
                        {...rest}
                      />
                    );
                  }
                )}
            </tbody>
          </table>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-1/3 self-start min-h-[80vh] shadow-sm p-4 flex flex-col"
        >
          <h2 className="mb-4 font-semibold text-lg">اقلام مرجوعی</h2>
          {orderItems!.filter((item) => item.quantity > 0).length > 0 && (
            <ul className="border border-G10 p-2 min-h-[310px] max-h-[310px] overflow-y-auto">
              {orderItems!
                .filter((item) => item.quantity > 0)
                .map((item) => (
                  <li
                    key={item.order_item}
                    className="flex items-center justify-between border-b border-b-G10 last-of-type:border-b-transparent py-2 text-light"
                  >
                    <span>{item.name}</span>
                    <span>{item.quantity} عدد</span>
                  </li>
                ))}
            </ul>
          )}

          <ul className="flex flex-col gap-y-4 mt-auto px-1">
            <li className="flex items-center justify-between">
              <span className="text-G3">تعداد اقلام</span>
              <span className="text-G3">{total_count} عدد</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-primary font-semibold text-lg">
                مبلغ مرجوعی
              </span>
              <span className="text-G3 font-semibold text-lg">
                {Number(data?.total_paid_amount || 0).toLocaleString()} ریال
              </span>
            </li>
          </ul>
          <Input
            id="description"
            placeholder=" دلیل مرجوعی..."
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-4"
          />
          <Button
            variant="regular"
            size="unspecified"
            className="w-full py-4 mt-4"
            disabled={
              orderItems!.filter((item) => item.quantity > 0).length === 0
            }
          >
            مرجوع کردن سفارش
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RejectionFromSinglePage;
