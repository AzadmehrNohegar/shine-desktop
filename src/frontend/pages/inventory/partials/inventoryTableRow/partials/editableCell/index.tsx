import { Input } from "@frontend/components";
import { useDebouncedValue } from "@frontend/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

interface IEditableCellProps {
  name: string;
  initialValue: any;
  action: (val: any) => void;
  isThousandSeparated?: boolean;
  placeholder?: string;
  type?: "text" | undefined;
  additionalClasses?: string;
}

function EditableCell({
  action,
  initialValue,
  isThousandSeparated = false,
  name,
  placeholder = "",
  type = undefined,
  additionalClasses = "",
}: IEditableCellProps) {
  const [cellValue, setCellValue] = useState(initialValue);
  const debouncedValue = useDebouncedValue(cellValue, 300);

  useEffect(() => {
    if (debouncedValue !== initialValue) action(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    if (initialValue !== cellValue) setCellValue(initialValue);
  }, [initialValue]);

  return (
    <td className="px-2 py-3 truncate border-l border-l-G10 text-right">
      {type === "text" && (
        <Input
          type={type}
          name={name}
          placeholder={placeholder}
          className={clsx(
            "px-2 text-right w-full rounded-lg border border-G10 py-3",
            additionalClasses
          )}
          value={cellValue}
          handleChange={(value) => setCellValue(value)}
        />
      )}
      {type !== "text" && (
        <NumericFormat
          type={type}
          name={name}
          placeholder={placeholder}
          className={clsx(
            "px-2 text-right w-full rounded-lg border border-G10 py-3",
            additionalClasses
          )}
          value={cellValue}
          onValueChange={({ value }) => setCellValue(value)}
          thousandSeparator={isThousandSeparated}
        />
      )}
    </td>
  );
}

export { EditableCell };
