import React from "react";

function LinkedIn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={28}
      height={28}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.625 3.45h10.35c2.875 0 5.175 2.3 5.175 5.175v10.35c0 2.875-2.3 5.175-5.175 5.175H8.625a5.153 5.153 0 0 1-5.175-5.175V8.625c0-2.875 2.3-5.175 5.175-5.175ZM9.314 12.764v6.21"
        stroke="#495058"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.455 18.975v-3.68c0-1.38 1.15-2.53 2.53-2.53s2.53 1.15 2.53 2.53v3.68M9.286 8.97a.427.427 0 1 0 0 .855.43.43 0 0 0 .433-.428.43.43 0 0 0-.433-.427"
        stroke="#495058"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { LinkedIn };
