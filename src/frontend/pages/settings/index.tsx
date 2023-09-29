import { getSettings, putSettings } from "@frontend/api";
import { Button, Input } from "@frontend/components";
import { usePersianConvert } from "@frontend/utils";
import { Settings } from "@prisma/client";
import { useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

function SettingsPage() {
  const { convertPersian2English } = usePersianConvert();

  const { data, isLoading } = useQuery("settings-all", () => getSettings());
  const editSettings = useMutation(putSettings, {
    onSuccess: () => {
      toast("تغییرات با موفقیت اعمال شد.", {
        type: "success",
      });
    },
    onError: () => {
      toast("اطلاعات نامعتبر می‌باشد.", {
        type: "error",
      });
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      apiKey: "",
    },
    values: {
      apiKey: (data as Settings[])?.find((el) => el.key === "apiKey")?.value,
    },
  });

  const onSubmit = () =>
    editSettings.mutate({
      body: {
        values: Object.entries(getValues()).map((entry: unknown[]) => {
          const [key, value] = entry;
          return {
            key,
            value: convertPersian2English(value as string),
          };
        }),
      },
    });

  if (isLoading) return <Skeleton width="100%" height={568} />;

  return (
    <div className="p-6 w-full relative">
      <h1 className="text-xl font-bold w-full">
        <span>تنظیمات نرم‌افزار</span>
      </h1>
      <form className="my-10 max-w-1/2" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="unit_price" className="inline-block min-w-max">
          API KEY
        </label>
        <Input
          id="apiKey"
          containerClassName="w-full"
          placeholder="API KEY"
          {...register("apiKey", {
            required: "این فیلد اجباری است.",
            minLength: {
              value: 16,
              message: "باید ۱۶ حرف یا رقم باشد.",
            },
            maxLength: {
              value: 16,
              message: "باید ۱۶ حرف یا رقم باشد.",
            },
          })}
        />
        {errors.apiKey && (
          <span className="text-danger text-xs">{errors.apiKey.message}</span>
        )}
        <div className="fixed bottom-0 left-0 w-screen p-4">
          <Button className="w-full" color="success" size="touch">
            اعمال تغییرات
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SettingsPage;
