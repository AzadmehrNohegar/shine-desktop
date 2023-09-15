import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const RemittanceCreate = lazy(() => import("./pages/remittanceCreate"));
const RemittanceList = lazy(() => import("./pages/remittanceList"));
const RemittanceEdit = lazy(() => import("./pages/remittanceEdit"));

function RemittancePage() {
  return (
    <Routes>
      <Route index element={<RemittanceList />} />
      <Route path="create" element={<RemittanceCreate />} />
      <Route path=":remittance" element={<RemittanceEdit />} />
    </Routes>
  );
}

export default RemittancePage;
