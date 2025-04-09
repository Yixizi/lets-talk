import NavBar from "@/components/NavBar";
import React from "react";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" relative">
      <NavBar />

      <section className=" flex min-h-screen flex-1  flex-col px-6 pb-6 pt-24 max-md:pb-14 sm:px-14">
        <div className="max-w-[1300px] mx-auto w-full">{children}</div>
      </section>
    </main>
  );
};

export default HomeLayout;
