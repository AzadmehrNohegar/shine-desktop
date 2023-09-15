import { Outlet } from "react-router-dom";
import { Header } from "./partials";

function DeskLayout() {
  return (
    <section className="h-screen w-full">
      <Header />
      <main className="flex items-stretch justify-start h-container overflow-y-auto w-full">
        <Outlet />
      </main>
    </section>
  );
}

export { DeskLayout };
