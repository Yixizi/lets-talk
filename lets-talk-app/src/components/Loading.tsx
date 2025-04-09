import React from "react";
import { ThreeDot } from "react-loading-indicators";

const Loading = () => {
  return (
    <div className=" flex flex-col items-center animate-fade-in pt-16">
      <ThreeDot color="#32cd32" size="medium" text="" textColor="" />
    </div>
  );
};

export default Loading;
