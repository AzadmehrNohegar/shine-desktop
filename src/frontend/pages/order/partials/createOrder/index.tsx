import { ScanDetection } from "@frontend/shared";
import { Fragment } from "react";

function CreateOrder() {
  return (
    <Fragment>
      <ScanDetection order_id={null} />
      <div className="h-full w-full flex flex-col gap-y-4 items-center justify-center">
        <svg
          width={276}
          height={245}
          viewBox="0 0 276 245"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1.5"
            y="-1.5"
            width={47}
            height={28}
            rx={14}
            transform="matrix(1 0 0 -1 78 173)"
            fill="#FDB913"
            stroke="#414143"
            strokeWidth={3}
          />
          <path
            d="M65.5977 82.5598L130.436 106.159L92.736 209.74C86.2192 227.645 66.4216 236.877 48.5169 230.36C30.6121 223.843 21.3804 204.046 27.8972 186.141L65.5977 82.5598Z"
            stroke="#414143"
            strokeWidth={3}
          />
          <path
            d="M75.4434 86.7695L129.348 106.389L91.7139 209.787C86.2961 224.673 69.8372 232.347 54.9519 226.93C40.0666 221.512 32.3917 205.053 37.8095 190.168L75.4434 86.7695Z"
            fill="#52A0F5"
          />
          <path
            d="M11 60C11 32.938 32.938 11 60 11H160C166.627 11 172 16.3726 172 23V97C172 103.627 166.627 109 160 109H60C32.938 109 11 87.062 11 60Z"
            fill="#52A0F5"
          />
          <path
            d="M15.5 42.5003C25 12.0003 54.5 13.5003 54.5 13.5003"
            stroke="#414143"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M193 15.5L214 1.5"
            stroke="#414143"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M192.188 90L214.812 101.187"
            stroke="#414143"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.5 54.5C1.5 25.2289 25.2289 1.5 54.5 1.5H160C165.799 1.5 170.5 6.20101 170.5 12V97C170.5 102.799 165.799 107.5 160 107.5H54.5C25.2289 107.5 1.5 83.7711 1.5 54.5Z"
            stroke="#414143"
            strokeWidth={3}
          />
          <path
            d="M229.5 2H273.5C274.052 2 274.5 2.44772 274.5 3V15.5M274.5 15.5V29M274.5 15.5H241M274.5 29V42.5M274.5 29H229.5M274.5 42.5V57M274.5 42.5H241M274.5 57V72.5M274.5 57H241M274.5 72.5V88.5M274.5 72.5H241M274.5 88.5V100.5C274.5 101.052 274.052 101.5 273.5 101.5H229.5M274.5 88.5H229.5"
            stroke="#414143"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M193 52H218"
            stroke="#414143"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M76 54C76 50.6863 78.6863 48 82 48H135V56C135 59.3137 132.314 62 129 62H82C78.6863 62 76 59.3137 76 56V54Z"
            fill="#FDB913"
          />
          <path
            d="M84.5 161.5C84.5 158.739 86.7386 156.5 89.5 156.5H112.143L108.455 166.5H89.5C86.7386 166.5 84.5 164.261 84.5 161.5Z"
            fill="#FDB913"
            stroke="#414143"
            strokeWidth={3}
          />
          <line
            x1="151.5"
            y1="-6.55671e-08"
            x2="151.5"
            y2={106}
            stroke="#414143"
            strokeWidth={3}
          />
          <path
            d="M163.5 37C163.5 33.9624 165.962 31.5 169 31.5H170.5V72.5H169C165.962 72.5 163.5 70.0376 163.5 67V37Z"
            fill="#FA5252"
            stroke="#414143"
            strokeWidth={3}
          />
          <rect
            x="71.5"
            y="41.5"
            width={65}
            height={20}
            rx={10}
            stroke="#414143"
            strokeWidth={3}
          />
        </svg>

        <span className="font-bold text-xl">
          جهت افزودن محصول بارکد را اسکن کنید.
        </span>
      </div>
    </Fragment>
  );
}

export { CreateOrder };
