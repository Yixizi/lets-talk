"use client";
import Image from "next/image";
import React from "react";
import DateAndTime from "./DateAndTime";
import { useGetCalls } from "@/hooks/useGetCalls";

const StatusBar = () => {
  const { upcomingCalls } = useGetCalls() || { upcomingCalls: [] };

  const nearestUpcomingCall = upcomingCalls
    ?.filter((call) => call?.state?.startsAt)
    .sort(
      (a, b) =>
        new Date(a.state.startedAt!).getTime() -
        new Date(b.state.startedAt!).getTime(),
    )[0];

  const startsAt = nearestUpcomingCall?.state?.startsAt;

  const formattedDate = startsAt
    ? new Date(startsAt).toLocaleString()
    : "No upcoming meetings";

  if (formattedDate === "No upcoming meetings") {
    return (
      <section className=" flex flex-col gap-5 text-black items-center md:items-start">
        <h2 className=" bg-blue-100 max-w-[273px] rounded-2xl p-4 text-center text-base font-light">
          之后没有会议
        </h2>
        <DateAndTime />
        <Image
          src={"/assets/home-image.svg"}
          width={400}
          height={400}
          alt="首页图片"
          className="max-md:hidden -ml-16"
        />
      </section>
    );
  }
  return (
    <section className=" flex flex-col gap-5 text-black items-center md:items-start">
      <h2 className=" bg-blue-100 max-w-[273px] rounded-2xl p-4 text-center text-base font-light">
        下一次会议:
        <p className=" text-lg font-semibold text-gray-800">{formattedDate}</p>
      </h2>
      <DateAndTime />
      <Image
        src={"/assets/home-image.svg"}
        width={400}
        height={400}
        alt="首页图片"
        className="max-md:hidden -ml-16"
      />
    </section>
  );
};

export default StatusBar;
