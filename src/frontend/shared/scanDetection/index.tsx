/* eslint-disable @typescript-eslint/ban-types */
import { getProductByBarcode, postOrder } from "@frontend/api";
import { Input } from "@frontend/components";
import { useDebouncedValue } from "@frontend/utils";
import { Price, Product } from "@prisma/client";
import { Fragment, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import useScanDetection from "use-scan-detection";
import { SelectPriceModal } from "..";
import { errorResponse } from "@model/general";
import { toast } from "react-toastify";

type compositeProduct = Product & {
  price: Price[];
};

interface IScanDetectionProps {
  order_id: number | null;
}

function ScanDetection({ order_id }: IScanDetectionProps) {
  const queryClient = useQueryClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [codeValue, setCodeValue] = useState<any>("");

  const debouncedValue = useDebouncedValue(codeValue, 100);

  const createOrderItem = useMutation(postOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries("open-orders");
    },
    onError: (err: errorResponse) => {
      toast(err.reason, {
        type: "error",
      });
    },
  });

  const [productId, setProductId] = useState<number | null>(null);

  const productPrices = useMutation(getProductByBarcode, {
    onSuccess: (res: unknown) => {
      const { id, price } = res as compositeProduct;
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
      setCodeValue("");
    },
  });

  const handleCreateOrderItem = (value?: String | string) =>
    productPrices.mutate({
      body: {
        barcode: value,
      },
    });

  useEffect(() => {
    if (debouncedValue !== "" && debouncedValue.length > 8)
      handleCreateOrderItem(debouncedValue);
  }, [debouncedValue]);

  useScanDetection({
    onComplete: (code: String) => setCodeValue(code),
  });

  return (
    <Fragment>
      <Input
        value={codeValue}
        handleChange={(value?: String | string) => {
          setCodeValue(value);
        }}
        className="hidden"
      />
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

export { ScanDetection };
