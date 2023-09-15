import React from "react";

function LeftChevron(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={9}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 15 1.57 9.237c-.76-.68-.76-1.794 0-2.474L8 1"
        stroke="currentColor"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { LeftChevron };
