import { ArrowRemittance } from "@frontend/assets/svg/ArrowRemittance";
import { Dropdown } from "@frontend/components";
import { useClock } from "@frontend/utils";
import clsx from "clsx";
import { House2, Profile, Receipt2, Send2, Shop, Tag2 } from "iconsax-react";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const { hours, minutes } = useClock();
  return (
    <header className="px-6 py-2 flex shadow-bottom w-full gap-x-2 z-20 sticky top-0 text-sm">
      <NavLink
        to="/"
        className={({ isActive }) =>
          clsx(
            "flex items-center gap-2 px-6 py-2 rounded-lg border",
            isActive && "bg-primary text-white border-primary",
            !isActive && "text-G2 border-G10"
          )
        }
        end
      >
        <Receipt2 size={20} />
        فروش
      </NavLink>
      <NavLink
        to="/history"
        className={({ isActive }) =>
          clsx(
            "flex items-center gap-2 px-6 py-2 rounded-lg border",
            isActive && "bg-primary text-white border-primary",
            !isActive && "text-G2 border-G10"
          )
        }
      >
        <Receipt2 size={20} />
        سفارشات
      </NavLink>
      {/* <Dropdown
        dropdownBtn={
          <span className="flex px-6 py-2 text-G2 items-center gap-2 border border-G10 rounded-lg">
            <Truck size={20} />
            <span>خرید</span>
          </span>
        }
      >
        <NavLink
          to="/remittance/create"
          className={({ isActive }) =>
            clsx(
              "p-4 w-full text-right",
              isActive && "bg-primary text-white",
              !isActive && "text-G2"
            )
          }
        >
          ایجاد حواله
        </NavLink>
        <NavLink
          to="/remittance"
          className={({ isActive }) =>
            clsx(
              "p-4 w-full text-right",
              isActive && "bg-primary text-white",
              !isActive && "text-G2"
            )
          }
          end
        >
          لیست حوالات
        </NavLink>
      </Dropdown> */}
      <Dropdown
        dropdownBtn={
          <span className="flex px-6 py-2 text-G2 items-center gap-2 border border-G10 rounded-lg">
            <Send2 size={20} />
            <span>مرجوعی</span>
          </span>
        }
      >
        <NavLink
          to="/rejection/from"
          className={({ isActive }) =>
            clsx(
              "pl-6 pr-2 py-2 flex items-center",
              isActive && "bg-primary text-white",
              !isActive && "text-G2"
            )
          }
        >
          {({ isActive }) => (
            <Fragment>
              <Shop
                className={clsx(
                  "scale-75",
                  isActive && "text-white",
                  !isActive && "text-primary"
                )}
              />
              <ArrowRemittance
                className={clsx(
                  "scale-75",
                  isActive && "text-white",
                  !isActive && "text-primary"
                )}
              />
              <Profile className="scale-75" />
              <span className="inline-block mx-2">مرجوعی سفارشات</span>
            </Fragment>
          )}
        </NavLink>
        <NavLink
          to="/rejection/to"
          className={({ isActive }) =>
            clsx(
              "pl-6 pr-2 py-2 flex items-center hidden",
              isActive && "bg-primary text-white",
              !isActive && "text-G2"
            )
          }
        >
          {({ isActive }) => (
            <Fragment>
              <House2
                className={clsx(
                  "scale-75",
                  isActive && "text-white",
                  !isActive && "text-primary"
                )}
              />
              <ArrowRemittance
                className={clsx(
                  "scale-75",
                  isActive && "text-white",
                  !isActive && "text-primary"
                )}
              />
              <Shop className="scale-75" />
              <span className="inline-block mx-2">مرجوعی به کارخانه</span>
            </Fragment>
          )}
        </NavLink>
      </Dropdown>
      <NavLink
        to="/product"
        className={({ isActive }) =>
          clsx(
            "flex items-center gap-2 px-6 py-2 rounded-lg border",
            isActive && "bg-primary text-white border-primary",
            !isActive && "text-G2 border-G10"
          )
        }
        end
      >
        <Tag2 size={20} />
        قیمت
      </NavLink>

      <div className="flex items-center my-auto ms-auto gap-x-4">
        <span>اپراتور: {"مهندس"}</span>
        <span>شماره صندوق: {1}</span>
        <span>
          {new Intl.DateTimeFormat("fa-IR", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }).format(new Date())}
        </span>
        <span>
          {hours}:{minutes}
        </span>
      </div>
    </header>
  );
}

export { Header };
