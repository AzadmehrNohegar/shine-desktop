import { getProduct, postRemittanceItem } from "@frontend/api";
import { Button, Input } from "@frontend/components";
import { Fragment, useDeferredValue, useId, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";

interface IRemittanceItemProps {
  remittance: number | null;
}

function RemittanceItem({ remittance }: IRemittanceItemProps) {
  const queryClient = useQueryClient();

  const [autoCompleteOpen, setAutoCompleteOpen] = useState(false);
  const [product, setProduct] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit_price, setUnit_price] = useState("");
  const [discount_percentage, setDiscount_percentage] = useState("");
  const [label_price, setLabel_price] = useState("");

  const uniqID = useId();

  const deferredSearch = useDeferredValue(search);

  const { data: paginationData } = useInfiniteQuery(
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

  const createRemittanceItem = useMutation(postRemittanceItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(`remittance-${remittance}`);
    },
  });

  const handleCreateRemittanceItem = () =>
    createRemittanceItem.mutate({
      body: {
        quantity,
        unit_price,
        discount_percentage,
        label_price,
        remittance,
        product,
      },
    });

  return (
    <div className="flex gap-x-4 items-center flex-wrap gap-y-4 justify-between">
      <ClickAwayListener onClickAway={() => setAutoCompleteOpen(false)}>
        <div className="relative">
          <Input
            name="product-search"
            type="text"
            value={search}
            className="w-[250px]"
            handleChange={(value) => setSearch(value)}
            onFocus={() => setAutoCompleteOpen(true)}
            placeholder="کالای مورد نظر برای حواله را وارد کنید..."
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
                        setProduct(entry.id);
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
      <div className="flex items-center gap-x-2">
        <label htmlFor="quantity" className="inline-block min-w-max">
          تعداد:{" "}
        </label>
        <Input
          id="quantity"
          type="text"
          value={quantity}
          required
          handleChange={(value) => setQuantity(value)}
          placeholder="تعداد"
        />
      </div>
      <div className="flex items-center gap-x-2">
        <label htmlFor="unit_price" className="inline-block min-w-max">
          قیمت واحد:{" "}
        </label>
        <Input
          id="unit_price"
          type="text"
          required
          value={unit_price}
          handleChange={(value) => setUnit_price(value)}
          placeholder="قیمت واحد"
        />
      </div>
      <div className="flex items-center gap-x-2">
        <label htmlFor="discount_percentage" className="inline-block min-w-max">
          درصد تخفیف:{" "}
        </label>
        <Input
          id="discount_percentage"
          type="text"
          value={discount_percentage}
          required
          handleChange={(value) => setDiscount_percentage(value)}
          placeholder="درصد تخفیف"
        />
      </div>
      <div className="flex items-center gap-x-2">
        <label htmlFor="label_price" className="inline-block min-w-max">
          قیمت روی محصول:{" "}
        </label>
        <Input
          id="label_price"
          type="text"
          value={label_price}
          required
          handleChange={(value) => setLabel_price(value)}
          placeholder="قیمت روی محصول"
        />
      </div>
      <Button size="touch" onClick={handleCreateRemittanceItem}>
        ثبت کالا
      </Button>
    </div>
  );
}

export { RemittanceItem };
