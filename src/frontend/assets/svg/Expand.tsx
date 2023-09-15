import React from "react";

function Expand(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={3}
      height={19}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx={1.5}
        cy={1.5}
        r={1.5}
        transform="matrix(1 0 0 -1 0 3)"
        fill="currentColor"
      />
      <circle
        cx={1.5}
        cy={1.5}
        r={1.5}
        transform="matrix(1 0 0 -1 0 11)"
        fill="currentColor"
      />
      <circle
        cx={1.5}
        cy={1.5}
        r={1.5}
        transform="matrix(1 0 0 -1 0 19)"
        fill="currentColor"
      />
    </svg>
  );
}
export { Expand };
