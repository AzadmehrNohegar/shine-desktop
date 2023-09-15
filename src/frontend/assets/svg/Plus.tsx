import React from "react";

function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={18}
      height={18}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 1v16M1 9h16"
        stroke="currentColor"
        strokeWidth={1.998}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Plus };
