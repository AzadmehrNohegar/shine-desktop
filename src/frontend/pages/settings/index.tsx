import { getSettings, postCSV, putSettings } from "@frontend/api";
import { Button, Input } from "@frontend/components";
import { usePersianConvert } from "@frontend/utils";
import { Settings } from "@prisma/client";
import { useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { default as ReactDropzone } from "react-dropzone";
import { useState } from "react";
import { errorResponse } from "@model/general";

function SettingsPage() {
  const [csvData, setCsvData] = useState<string[]>([]);

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
  const uploadCSV = useMutation(postCSV, {
    onSuccess: () => {
      toast("فایل بارگذاری شد.", {
        type: "success",
      });
      setCsvData([]);
    },
    onError: (err: unknown) => {
      const { reason } = err as errorResponse;
      toast(reason, {
        type: "error",
      });
      setCsvData([]);
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

  const handleCSVUpload = () => {
    uploadCSV.mutate({
      body: {
        values: csvData,
      },
    });
  };

  if (isLoading) return <Skeleton width="100%" height={568} />;

  return (
    <div className="p-6 w-full relative">
      <div className="w-full flex items-stretch gap-x-4">
        <form
          className="w-full min-h-container flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-xl font-bold w-full my-5">
            <span>تنظیمات نرم‌افزار</span>
          </h2>
          <div>
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
              <span className="text-danger text-xs">
                {errors.apiKey.message}
              </span>
            )}
          </div>
          <div className="w-1/2 fixed bottom-0 right-0 p-4">
            <Button className="w-full" color="success" size="touch">
              اعمال تغییرات
            </Button>
          </div>
        </form>
        <div className="w-full flex flex-col justify-start">
          <h2 className="text-xl font-bold w-full my-5">
            <span>بارگذاری محصولات</span>
          </h2>
          <ReactDropzone
            onDrop={async (acceptedFiles) => {
              const reader = new FileReader();
              reader.readAsText(acceptedFiles[0]);
              reader.onload = function (e) {
                const text = e.target!.result as string;
                if (text)
                  setCsvData(
                    text
                      .replace(/(\r\n|\n|\r)/gm, "")
                      .split(",")
                      .filter((item) => item !== "")
                  );
              };
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section className="w-full flex flex-col justify-start">
                <div
                  {...getRootProps()}
                  className="flex gap-x-4 items-center p-4 justify-between gap-y-4 border border-dashed rounded-[20px]"
                >
                  <input {...getInputProps()} />
                  <span className="text-info-700">
                    {csvData.length === 0 &&
                      "فایل خود را اینجا بکشید و رها کنید."}
                    {csvData.length > 0 && "فایل انتخاب شد."}
                  </span>
                  <Button color="primary">جست‌وجو در فایل‌ها</Button>
                </div>
              </section>
            )}
          </ReactDropzone>
          <div className="w-1/2 fixed bottom-0 left-0 p-4">
            <Button
              className="w-full"
              color="primary"
              size="touch"
              disabled={!csvData}
              onClick={handleCSVUpload}
            >
              بارگذاری فایل
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
