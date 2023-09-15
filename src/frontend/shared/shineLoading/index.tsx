import React from "react";

function ShineLoading() {
  return (
    <div className="fixed w-full h-full bg-G9 flex justify-center items-center gap-x-2">
      <div className="w-3 bg-B9 rounded-full animate-grow" />
      <div className="w-3 bg-B9 rounded-full animate-grow animation-delay-200" />
      <div className="w-3 bg-B9 rounded-full animate-grow animation-delay-400" />
    </div>
  );
}

export { ShineLoading };
