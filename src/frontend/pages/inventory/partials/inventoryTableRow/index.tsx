import { useState } from "react";
import { EditableCell } from "./partials";
import { Button } from "@frontend/components";

function InventoryTableRow() {
  const [value, setValue] = useState("darizer awdaw awd awd awd adw awd awdaw");
  const [numericValue, setNumericValue] = useState(null);

  return (
    <tr>
      <EditableCell
        name="name"
        initialValue={value}
        action={(val) => setValue(val)}
        placeholder="نام محصول"
        type="text"
        additionalClasses="max-w-[200px]"
      />
      <EditableCell
        name="sku"
        initialValue={numericValue}
        action={(val) => setNumericValue(val)}
        placeholder="بارکد"
        additionalClasses="max-w-[160px]"
      />
      <EditableCell
        name="price"
        initialValue={numericValue}
        action={(val) => setNumericValue(val)}
        placeholder="قیمت پایه"
        additionalClasses="max-w-[120px]"
        isThousandSeparated
      />
      <EditableCell
        name="discount_price"
        initialValue={numericValue}
        action={(val) => setNumericValue(val)}
        placeholder="قیمت پایه"
        additionalClasses="max-w-[120px]"
        isThousandSeparated
      />
      <EditableCell
        name="discount_percentage"
        initialValue={numericValue}
        action={(val) => setNumericValue(val)}
        placeholder="قیمت پایه"
        additionalClasses="max-w-[120px]"
      />
      <td className="px-2 py-3 truncate border-l border-l-G10 text-center">
        <Button size="large" className="min-w-[100px]">
          ثبت
        </Button>
      </td>
    </tr>
  );
}

export { InventoryTableRow };
