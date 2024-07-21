import { Outlet } from "react-router-dom";
import { Header } from "./partials";

function DeskLayout() {
  return (
    <section className="flex flex-col h-screen w-full">
      <Header />
      <main className="flex items-stretch justify-start h-full overflow-y-auto w-full">
        <Outlet />
      </main>
    </section>
  );
}

export { DeskLayout };
