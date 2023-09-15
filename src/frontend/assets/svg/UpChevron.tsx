import React from "react";

function UpChevron(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={9}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m1 8 5.763-6.43c.68-.76 1.794-.76 2.474 0L15 8"
        stroke="currentColor"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { UpChevron };
