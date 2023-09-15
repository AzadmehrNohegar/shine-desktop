import { getProduct } from "@frontend/api";
import { Input } from "@frontend/components";
import { useDebouncedValue } from "@frontend/utils";
import { useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
// import { InventoryTableRow } from "./partials";
import { TablePagination } from "@frontend/shared";

function ProductPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebouncedValue<string>(search, 300);

  const handleSearch = (val: string) => setSearch(val);

  const { data } = useQuery(
    ["inventory-pagination", debouncedSearch, page],
    () =>
      getProduct({
        params: { page, page_size: 10, search: debouncedSearch },
      }),
    {
      keepPreviousData: true,
    }
  );

  return (
    <div className="w-full m-4 min-h-container h-full">
      <div className="flex items-center gap-x-2 mb-4">
        <label htmlFor="search">جستجو نام یا بارکد محصول: </label>
        <Input
          id="search"
          type="text"
          value={search}
          handleChange={handleSearch}
          placeholder="نام یا بارکد محصول..."
        />
      </div>
      <table className="w-full text-G2 text-right border border-G10 relative">
        <thead className="font-semibold z-10 bg-B11 sticky -top-1 border-b border-b-G10 text-GDesk">
          <tr>
            <th scope="col" className="px-6 py-3">
              نام محصول
            </th>
            <th scope="col" className="px-6 py-3">
              بارکد
              <span className="text-2xs font-light text-G2">(SKU)</span>
            </th>
            <th scope="col" className="px-6 py-3">
              قیمت پایه
              <span className="text-2xs font-light text-G2">(ریال)</span>
            </th>
            <th scope="col" className="px-6 py-3">
              قیمت با تخفیف
              <span className="text-2xs font-light text-G2">(ریال)</span>
            </th>
            <th scope="col" className="px-6 py-3">
              درصد تخفیف
            </th>
            <th scope="col" className="px-6 py-3">
              عملیات
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {/* {data?.results.map((item: any, index: number) => (
            <InventoryTableRow key={index} {...item} />
          ))} */}
        </tbody>
      </table>
      <TablePagination count={0} page={0} setPage={setPage} />
    </div>
  );
}

export default ProductPage;
