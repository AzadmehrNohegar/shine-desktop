import { getPos, postPayment } from "@frontend/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { Button, Dialog, SpinnerElement } from "@frontend/components";
import { Dialog as HeadlessDialog } from "@headlessui/react";
import { Close } from "@frontend/assets/svg";
import { Fragment, useState } from "react";
import clsx from "clsx";
import { POS_DICTIONARY } from "@frontend/constants";
import { Payment, Pos } from "@prisma/client";
import { NumericFormat } from "react-number-format";
import { errorResponse } from "@model/general";

interface IPaymentActionProps {
  order_id: number;
  total_price: number;
  isOpen: boolean;
  closeModal: () => void;
  user_phone: string | null;
}

function PaymentAction({
  order_id,
  total_price,
  closeModal,
  isOpen,
  user_phone,
}: IPaymentActionProps) {
  const [cash_amount, setCash_amount] = useState("");
  const [pos_id, setPos_id] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const { data } = useQuery("pos_data", getPos, {
    onSuccess: (res: Pos[]) => {
      if (res?.length > 0) setPos_id(res[0].id);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createPayment.mutate({
      body: {
        order_id,
        cash_amount: Number(cash_amount) || 0,
        user_phone: user_phone || null,
        pos_id: pos_id,
      },
    });
  };

  const handleCashPayment = () =>
    createPayment.mutate({
      body: {
        order_id,
        cash_amount: total_price,
        user_phone: user_phone || null,
        pos_id: pos_id,
      },
    });

  const createPayment = useMutation(postPayment, {
    onSuccess: (res) => {
      const { is_resolved } = res as Payment;
      if (is_resolved) {
        toast("پرداخت موفق", {
          type: "success",
        });
      } else {
        toast("پرداخت ناموفق", {
          type: "error",
        });
      }
      closeModal();
      queryClient.invalidateQueries();
    },
    onError: (err: errorResponse) => {
      toast(err.reason, {
        type: "error",
      });
    },
  });

  return (
    <Fragment>
      <Dialog isOpen={isOpen} closeModal={closeModal} placement="top">
        <HeadlessDialog.Title
          as="h3"
          className="leading-6 text-G2 flex items-center justify-between border-b p-4"
        >
          <span className="py-4 text-lg font-bold">ثبت سفارش</span>
          <Button
            variant="ghost"
            onClick={closeModal}
            className="outline-none focus:outline-none"
          >
            <Close className="text-R4 scale-125" />
          </Button>
        </HeadlessDialog.Title>
        <form onSubmit={onSubmit} className="p-4 text-right">
          <div className="flex items-center gap-x-2 justify-between">
            <div className="flex flex-col gap-y-2">
              <label htmlFor="cash_amount">مبلغ نقدی</label>
              <NumericFormat
                name="labelPriceEditable"
                className="text-start w-full rounded-lg border border-G10 p-3 outline-none"
                placeholder="مبلغ نقدی..."
                value={cash_amount}
                max={total_price}
                onValueChange={({ value }) => setCash_amount(value)}
                thousandSeparator
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <span>کارتخوان</span>
              <strong>
                {(total_price - Number(cash_amount)).toLocaleString()} ریال
              </strong>
            </div>
            <div className="flex flex-col gap-y-2">
              <span>پرداختی نهایی</span>
              <strong>{total_price.toLocaleString()} ریال</strong>
            </div>
          </div>
          <div className="flex justify-between items-center my-4">
            <span>انتخاب کارتخوان:</span>
            <div className="flex items-center gap-x-2">
              {data?.map((item) => (
                <Button
                  type="button"
                  variant="unstyled"
                  size="large"
                  className={clsx(
                    "border rounded-lg",
                    pos_id === item.id && "border-primary",
                    pos_id !== item.id && "border-G5"
                  )}
                  key={item.id}
                  onClick={() => setPos_id(item.id as number)}
                >
                  {POS_DICTIONARY[item.name]}
                </Button>
              ))}
            </div>
          </div>
          <Button
            variant="regular"
            size="unspecified"
            type="submit"
            color="success"
            className="w-full py-4 mt-4 flex items-center justify-center gap-2"
            disabled={!pos_id || Number(cash_amount) > total_price}
          >
            {createPayment.isLoading && <SpinnerElement className="scale-75" />}
            ثبت پرداخت
          </Button>
          <Button
            variant="regular"
            size="unspecified"
            type="button"
            color="primary"
            className="w-full py-4 mt-4 flex items-center justify-center gap-2"
            onClick={handleCashPayment}
          >
            پرداخت نقدی و چاپ رسید
          </Button>
        </form>
      </Dialog>
    </Fragment>
  );
}

export { PaymentAction };
