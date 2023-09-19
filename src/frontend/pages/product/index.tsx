import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const ProductList = lazy(() => import("./pages/productList"));
const ProductSingle = lazy(() => import("./pages/productSingle"));

function ProductPage() {
  return (
    <Routes>
      <Route index element={<ProductList />} />
      <Route path="create" element={<ProductSingle />} />
      <Route path=":id" element={<ProductSingle />} />
    </Routes>
  );
}

export default ProductPage;
