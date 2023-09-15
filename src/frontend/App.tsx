import { Fragment } from "react";
import BasePage from "./pages";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Fragment>
      <BasePage />
      <ToastContainer
        pauseOnHover={false}
        autoClose={3000}
        theme="light"
        rtl={true}
      />
    </Fragment>
  );
}

export default App;
