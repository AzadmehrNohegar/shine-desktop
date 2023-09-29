import { DeskLayout } from "@frontend/layouts";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const OrderPage = lazy(() => import("./order"));
const RejectionPage = lazy(() => import("./rejection"));
const HistoryPage = lazy(() => import("./history"));
const ProductPage = lazy(() => import("./product"));
const SettingsPage = lazy(() => import("./settings"));

function BasePage() {
  return (
    <Routes>
      <Route element={<DeskLayout />}>
        <Route index element={<OrderPage />} />
        <Route path="history/*" element={<HistoryPage />} />
        <Route path="rejection/*" element={<RejectionPage />} />
        <Route path="product/*" element={<ProductPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default BasePage;
