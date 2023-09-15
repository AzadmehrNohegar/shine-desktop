import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const RejectionFromPage = lazy(() => import("./pages/rejectionFrom"));
const RejectionToPage = lazy(() => import("./pages/rejectionTo"));

function RejectionPage() {
  return (
    <Routes>
      <Route index element={<Navigate to="from" replace />} />
      <Route path="from/*" element={<RejectionFromPage />} />
      <Route path="to/*" element={<RejectionToPage />} />
    </Routes>
  );
}

export default RejectionPage;
