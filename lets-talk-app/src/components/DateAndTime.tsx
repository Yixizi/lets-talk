"use client";

import { useEffect, useState } from "react";

const DateAndTime = () => {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  });

  const [date, setdate] = useState(() => {
    const now = new Date();
    return new Intl.DateTimeFormat("zh-CN", {
      dateStyle: "full",
    }).format(now);
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
      setdate(
        new Intl.DateTimeFormat("zh-CN", {
          dateStyle: "full",
        }).format(now),
      );

      //   now.toLocaleDateString
      //   now.toLocaleString
      //   now.toLocaleTimeString
    });

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className=" flex flex-col gap-5">
      <h1 className=" text-4xl font-extrabold lg:text-7xl">{time}</h1>
      <p className=" text-lg font-medium text-sky-400 lg:text-2xl">{date}</p>
    </div>
  );
};
export default DateAndTime;
