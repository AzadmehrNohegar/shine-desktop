import React from "react";

function RightChevron(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={9}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m1 1 6.43 5.763c.76.68.76 1.794 0 2.474L1 15"
        stroke="currentColor"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export { RightChevron };
