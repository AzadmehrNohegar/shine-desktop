/* eslint-disable @typescript-eslint/ban-types */
import { postOrder } from "@frontend/api";
import { Input } from "@frontend/components";
import { useDebouncedValue } from "@frontend/utils";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import useScanDetection from "use-scan-detection";

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
  });

  const handleCreateOrderItem = (value?: String | string) => {
    createOrderItem.mutate({
      body: {
        barcode: value,
        product_id: null,
        order_id: order_id || null,
      },
    });
    setCodeValue("");
  };

  useEffect(() => {
    if (debouncedValue !== "") handleCreateOrderItem(debouncedValue);
  }, [debouncedValue]);

  useScanDetection({
    onComplete: (code: String) => setCodeValue(code),
  });

  return (
    <Input
      value={codeValue}
      handleChange={(value?: String | string) => {
        setCodeValue(value);
      }}
      className="hidden"
    />
  );
}

export { ScanDetection };
