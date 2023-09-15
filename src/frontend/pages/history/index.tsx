import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const HistoryList = lazy(() => import("./pages/historyList"));
const HistorySingle = lazy(() => import("./pages/historySingle"));

function HistoryPage() {
  return (
    <Routes>
      <Route index element={<HistoryList />} />
      <Route path=":order_id" element={<HistorySingle />} />
    </Routes>
  );
}

export default HistoryPage;
