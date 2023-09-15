import React from "react";

function Tick(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={30}
      height={20}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m2 10.386 8.471 7.414L28 2.2"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export { Tick };
