"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import MenuItemCard from "./MenuItemCard";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import DatePicker from "react-datepicker";
import { useUser } from "@clerk/nextjs";
import Loading from "./Loading";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner";

const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
};

const MainMenu = () => {
  const { user } = useUser();
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [meetingState, setMeetingState] = useState<
    "Schedule" | "Instant" | undefined
  >(undefined);

  const client = useStreamVideoClient();

  if (!user) {
    // return router.push("/login");
    return <Loading />;
  }

  const createMeeting = async () => {
    console.log(client);

    if (!user) return router.push("/login");
    if (!client) return router.push("/");

    console.log(client);

    try {
      if (!values.dateTime) {
        toast(`Please select a date and time `, {
          duration: 3000,
          className: "bg-gray-300 rounded-3xl py-8 px-5 justify-center",
        });
      }

      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call)
        return toast(`Failded to create Meeting `, {
          duration: 3000,
          className: "bg-gray-300 rounded-3xl py-8 px-5 justify-center",
        });

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "No Description";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      await call.updateCallMembers({
        update_members: [{ user_id: user.id }],
      });

      if (meetingState === "Instant") {
        router.push(`/meeting/${call.id}`);
        toast("设置你的会议", {
          duration: 3000,
          className: "bg-gray-300 rounded-3xl py-8 px-5 justify-center",
        });
      }
      if (meetingState === "Schedule") {
        router.push(`/upcoming`);
        toast(`你的会议日程在${values.dateTime}`, {
          duration: 5000,
          className: "bg-gray-300 rounded-3xl py-8 px-5 justify-center",
        });
      }
    } catch (error: any) {
      toast(`Failded to create Meeting ${error.message}`, {
        duration: 3000,
        className: "bg-gray-300 rounded-3xl py-8 px-5 justify-center",
      });
    }
  };

  useEffect(() => {
    if (meetingState) {
      createMeeting();
    }
  }, [meetingState]);
  return (
    <section className=" sm:w-[50%] grid grid-cols-2 gap-3 max-sm:grid-cols-1">
      <Dialog>
        <DialogTrigger>
          <MenuItemCard
            img="/assets/new-meeting.svg"
            title="建立"
            bgColor="bg-orange-500"
            hoverColor="hover:bg-orange-800"
          />
        </DialogTrigger>
        <DialogContent className=" bg-gray-200 px-16 py-10 text-gray-900 rounded-3xl">
          <DialogHeader>
            <DialogTitle className=" text-3xl font-black leading-relaxed text-center">
              创建一个会议
            </DialogTitle>
            <DialogDescription className=" flex flex-col gap-5  items-center">
              添加会议详情
              <Textarea
                className=" inputs p-5"
                rows={4}
                onChange={(e) =>
                  setValues({
                    ...values,
                    description: e.target.value,
                  })
                }
              />
              <Button
                className="cursor-pointer mt-5 font-extrabold text-lg text-white rounded-xl bg-blue-700 py-5 
              px-10 hover:bg-blue-900 hover:scale-110 transform ease-in-out delay-75 duration-700 hover:-translate-y-1"
                onClick={() => setMeetingState("Instant")}
              >
                创建会议
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger>
          <MenuItemCard
            img="/assets/join-meeting.svg"
            title="加入"
            bgColor="bg-blue-500"
            hoverColor="hover:bg-blue-800"
          />
        </DialogTrigger>
        <DialogContent className=" bg-gray-200 px-16 py-10 text-gray-900 rounded-3xl">
          <DialogHeader>
            <DialogTitle className=" text-3xl font-black leading-relaxed text-center">
              输入会议链接
            </DialogTitle>

            <DialogDescription className=" flex gap-5  flex-col ">
              <Input
                type="text"
                placeholder="会议链接"
                onChange={(e) => setValues({ ...values, link: e.target.value })}
                className=" inputs"
              />
              <Button
                className="cursor-pointer mt-5 font-extrabold text-lg text-white rounded-xl bg-blue-700 py-5 
              px-10 hover:bg-blue-900 hover:scale-110 transform ease-in-out delay-75 duration-700 hover:-translate-y-1"
                onClick={() => router.push(values.link)}
              >
                加入会议
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger>
          <MenuItemCard
            img="/assets/new-meeting.svg"
            title="日程"
            bgColor="bg-blue-500"
            hoverColor="hover:bg-blue-800"
          />
        </DialogTrigger>
        <DialogContent className=" bg-gray-200 px-16 py-10 text-gray-900 rounded-3xl">
          <DialogHeader>
            <DialogTitle className=" text-3xl font-black leading-relaxed text-center">
              会议日程
            </DialogTitle>
            <DialogDescription className=" flex flex-col gap-5 items-center">
              添加会议详情
              <Textarea
                className=" inputs p-5"
                rows={4}
                onChange={(e) =>
                  setValues({
                    ...values,
                    description: e.target.value,
                  })
                }
              />
            </DialogDescription>
            <div className=" flex w-full flex-col gap-2.5">
              <label className=" text-base font-normal leading-[22.4px] text-sky-200">
                选择日期时间
              </label>
            </div>
            <DatePicker
              preventOpenOnFocus
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showDateSelect
              timeIntervals={15}
              timeCaption="time"
              dateFormat={"MMMM d,yyyy h:mm aa"}
              className=" w-full rounded p-2 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            <Button
              className=" cursor-pointer mt-5 font-extrabold text-lg text-white rounded-xl bg-blue-700 py-5 
              px-10 hover:bg-blue-900 hover:scale-110 transform ease-in-out delay-75 duration-700 hover:-translate-y-1"
              onClick={() => setMeetingState("Schedule")}
            >
              创建日程
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <MenuItemCard
        img="/assets/recordings2.svg"
        title="记录"
        bgColor="bg-blue-500"
        hoverColor="hover:bg-blue-800"
        handleClick={() => router.push("/recordings")}
      />
    </section>
  );
};

export default MainMenu;
