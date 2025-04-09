import CallList from "@/components/CallList";
import React from "react";

const RecordingsPage = () => {
  return (
    <section className=" flex size-full flex-col gap-10 animate-fade-in">
      <h1 className=" text-3xl text-black text-center mt-3">记录</h1>
      <CallList type="recordings" />
    </section>
  );
};

export default RecordingsPage;
