import { getProduct, postOrder } from "@frontend/api";
import { Close, Plus } from "@frontend/assets/svg";
import { Button, Input } from "@frontend/components";
import { SelectPriceModal } from "@frontend/shared";
import { Price, Product } from "@prisma/client";
import { Fragment, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

type compositeProduct = Product & {
  price: Price[];
};

interface IAsideOrderProps {
  order_id: number | null;
}

function AsideOrder({ order_id }: IAsideOrderProps) {
  const queryClient = useQueryClient();

  const searchRef = useRef<HTMLInputElement | null>(null);

  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [productId, setProductId] = useState<number | null>(null);

  const { data } = useQuery(
    ["product-pagination", search],
    () =>
      getProduct({
        params: { search },
      }),
    {
      keepPreviousData: true,
    }
  ) as { data: Record<string, string>[] };

  const createOrderItem = useMutation(postOrder, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (res: any) => {
      if (res?.required) {
        setProductId(res.required.product_id);
      }
      queryClient.invalidateQueries("open-orders");
    },
  });

  const handleCreateOrderItem = (price: Price[], id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (price && price.length === 1) {
      createOrderItem.mutate({
        body: {
          order_id: order_id,
          price_id: price[0].id,
        },
      });
    } else {
      setProductId(id);
    }
  };

  return (
    <Fragment>
      <aside className="min-w-[270px] max-w-[270px] border-l border-l-G8 py-4 pl-4 pr-8 h-full">
        <div className="flex flex-col items-basline gap-3">
          <label htmlFor="product" className="relative pb-4">
            افزودن محصول
            {isAddProductOpen && (
              <Button
                variant="ghost"
                color="danger"
                size="small"
                className="absolute left-0 -top-1/4"
                onClick={() => {
                  setIsAddProductOpen(false);
                  setSearch("");
                  if (searchRef.current) searchRef.current.blur();
                }}
              >
                <Close />
              </Button>
            )}
          </label>
          <Input
            id="product"
            placeholder="محصول..."
            value={search}
            onChange={(e) => {
              if (!isAddProductOpen) setIsAddProductOpen(true);
              setSearch(e.target.value);
            }}
            ref={searchRef}
          />
        </div>
        <div className="flex flex-col my-6 gap-y-2">
          {isAddProductOpen && (
            <div className="max-h-[500px] overflow-y-auto">
              {data?.length === 0 && (
                <span className="inline-block w-100 text-center">
                  کالایی یافت نشد.
                </span>
              )}
              {data?.length > 0 && (
                <div className="max-h-full overflow-y-auto flex flex-col items-start justify-start gap-y-2 text-md">
                  {data?.map((item: unknown) => {
                    const { id, name, price, sku } = item as compositeProduct;
                    return (
                      <Button
                        key={id}
                        variant="unstyled"
                        size="unspecified"
                        className="basis-modified p-2 border-b border-b-G6 last-of-type:border-b-transparent w-full text-right text-G2 flex items-center gap-x-2"
                        onClick={() => handleCreateOrderItem(price, id)}
                      >
                        <span>
                          <Plus />
                        </span>
                        <span>
                          {name} {sku}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          {!isAddProductOpen && (
            <Fragment>
              <h6 className="pb-2">محصولات متداول</h6>
              {data?.length === 0 && (
                <span className="inline-block w-100 text-center">
                  کالایی یافت نشد.
                </span>
              )}
              {data?.length > 0 && (
                <div className="max-h-full overflow-y-auto flex flex-wrap justify-between gap-y-2 text-sm">
                  {data?.map((item: unknown) => {
                    const { id, name, price } = item as compositeProduct;
                    return (
                      <Button
                        key={id}
                        variant="unstyled"
                        size="unspecified"
                        className="basis-modified p-2 border border-G6 text-G2 text-center"
                        onClick={(e) => {
                          e.currentTarget.blur();
                          handleCreateOrderItem(price, id);
                        }}
                      >
                        {name}
                      </Button>
                    );
                  })}
                </div>
              )}
            </Fragment>
          )}
        </div>
      </aside>
      {productId && (
        <SelectPriceModal
          order_id={order_id}
          isOpen={Boolean(productId)}
          closeModal={() => setProductId(null)}
          product_id={productId!}
        />
      )}
    </Fragment>
  );
}

export { AsideOrder };
