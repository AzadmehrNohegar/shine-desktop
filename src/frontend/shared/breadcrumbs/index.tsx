import { Link } from "react-router-dom";
import { ArrowLeft2 } from "iconsax-react";

type breadcrumb = { link: string; label: string } | any;

interface IBreadcrumbsProps {
  depthAdj: breadcrumb[];
}

function Breadcrumbs({ depthAdj }: IBreadcrumbsProps) {
  return (
    <div className="my-3 border-b border-b-1 inline-flex flex-row-reverse">
      {depthAdj?.map((item, index) => (
        <Link
          to={item.link}
          relative="path"
          className="inline-flex items-center text-sm text-G3"
          key={`${item}-${index}`}
        >
          {item.label}
          {index !== 0 && <ArrowLeft2 className="scale-[0.7]" />}
        </Link>
      ))}
      <Link
        to="/"
        relative="path"
        className="inline-flex items-center text-sm text-G3"
      >
        خانه
        <ArrowLeft2 className="scale-[0.7]" />
      </Link>
    </div>
  );
}

export { Breadcrumbs };
