import React from "react";

function Minus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={2}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 1h14"
        stroke="currentColor"
        strokeWidth={1.998}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export { Minus };
