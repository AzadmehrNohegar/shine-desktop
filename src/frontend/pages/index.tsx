import { DeskLayout } from "@frontend/layouts";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const OrderPage = lazy(() => import("./order"));
const RejectionPage = lazy(() => import("./rejection"));
const RemittancePage = lazy(() => import("./remittance"));
const HistoryPage = lazy(() => import("./history"));
const InventoryPage = lazy(() => import("./inventory"));
const ProductPage = lazy(() => import("./product"));

function BasePage() {
  return (
    <Routes>
      <Route element={<DeskLayout />}>
        <Route index element={<OrderPage />} />
        <Route path="history/*" element={<HistoryPage />} />
        <Route path="remittance/*" element={<RemittancePage />} />
        <Route path="rejection/*" element={<RejectionPage />} />
        <Route path="product/*" element={<ProductPage />} />
        <Route path="inventory" element={<InventoryPage />} />
      </Route>
    </Routes>
  );
}

export default BasePage;
