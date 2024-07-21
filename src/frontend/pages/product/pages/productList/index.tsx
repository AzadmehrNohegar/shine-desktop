import { getProductPagination } from "@frontend/api";
import { Input } from "@frontend/components";
import { useState } from "react";
import { useQuery } from "react-query";
import { TablePagination } from "@frontend/shared";
import { ProductTableRow } from "./partials";
import { Barcode, Price, Product } from "@prisma/client";
import { Plus } from "@frontend/assets/svg";
import { Link } from "react-router-dom";
import { errorResponse } from "@model/general";
import { toast } from "react-toastify";

type compositeProductBarcode = Product & {
  price: Price[];
  barcode: Barcode[];
};

function ProductList() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = (val: string) => setSearch(val);

  const { data } = useQuery(
    ["product-pagination", search, page],
    () =>
      getProductPagination({
        params: { page, page_size: 10, search: search },
      }),
    {
      keepPreviousData: true,
      onError: (err: unknown) => {
        const { reason } = err as errorResponse;
        toast(reason, {
          type: "error",
        });
      },
    }
  );

  return (
    <div className="w-full m-4">
      <div className="flex items-center gap-x-2 mb-4">
        <label htmlFor="search">جستجو نام یا بارکد محصول: </label>
        <Input
          id="search"
          type="text"
          value={search}
          handleChange={handleSearch}
          className="min-w-[400px]"
          placeholder="نام یا بارکد محصول..."
        />
        <Link
          to="./create"
          className="flex items-center ms-auto gap-x-4 h-fit w-fit px-10 py-5 text-xl bg-primary text-white rounded-lg"
        >
          <Plus />
          افزودن محصول
        </Link>
      </div>
      <table className="w-full text-G2 text-right border border-G10 relative">
        <thead className="font-semibold z-10 bg-B11 sticky -top-1 border-b border-b-G10 text-GDesk">
          <tr>
            <th scope="col" className="px-6 py-3">
              نام محصول
            </th>
            <th scope="col" className="px-6 py-3">
              بارکدها
            </th>
            <th scope="col" className="px-6 py-3">
              موجودی
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
          {data?.results.map((item: unknown) => {
            const { id, ...rest } = item as compositeProductBarcode;
            return <ProductTableRow key={id} id={id} {...rest} />;
          })}
        </tbody>
      </table>
      <TablePagination count={data?.count || 0} page={page} setPage={setPage} />
    </div>
  );
}

export default ProductList;
