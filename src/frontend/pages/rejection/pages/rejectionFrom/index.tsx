import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const RejectionFromListPage = lazy(() => import("./pages/rejectionFromList"));
const RejectionFromSinglePage = lazy(
  () => import("./pages/rejectionFromSingle")
);

function RejectionFromPage() {
  return (
    <Routes>
      <Route index element={<RejectionFromListPage />} />
      <Route path=":id" element={<RejectionFromSinglePage />} />
    </Routes>
  );
}

export default RejectionFromPage;
