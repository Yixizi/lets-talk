"use client";
import { useUser } from "@clerk/nextjs";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LayoutList, Users } from "lucide-react";
import EndCallButton from "./EndCallButton";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";
const speakerOptions = [
  { title: "网格扬声器", value: "grid" },
  { title: "左扬声器", value: "speaker-left" },
  { title: "右扬声器", value: "speaker-right" },
];

const MeetingRoom = () => {
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const { user } = useUser();
  const [showParticipants, setShowParticipaabts] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  if (!user) return;
  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      toast('通话结束')
      router.push("/"); // 通话已退出，跳回根路由
    }
  }, [callingState, router]);

  if (callingState !== CallingState.JOINED) return <Loading />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition={"left"} />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition={"right"} />;
    }
  };

  return (
    <section className=" relative h-screen w-full overflow-hidden pt-4 text-white">
      <Button
        className=" ml-5 font-semibold bg-gray-900 hover:scale-110 rounded-3xl"
        onClick={() => {
          const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`;
          navigator.clipboard.writeText(meetingLink);
          toast("会议链接复制成功", {
            duration: 3000,
            className: "bg-gray-300 !rounded-3xl !px-5 py-8 justify-center",
          });
        }}
      >
        邀请
      </Button>

      <div className=" relative flex size-full items-center justify-center">
        <div className=" flex size-full max-w-[1000px] items-start  animate-fade-in">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-66px)] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipaabts(false)} />
        </div>
      </div>

      <div className=" fixed bottom-0 flex w-full items-center justify-center gap-5">
        <CallControls onLeave={() => router.push("/")} />

        <DropdownMenu>
          <div className=" flex items-center">
            <DropdownMenuTrigger className=" cursor-pointer rounded-2xl bg-[#19232d] px-5">
              <LayoutList size={20} className=" text-white" />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className=" border-black bg-black text-white">
            {speakerOptions.map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() => {
                    setLayout(item.value.toLowerCase() as CallLayoutType);
                  }}
                >
                  {item.title}
                </DropdownMenuItem>
                <DropdownMenuSeparator className=" border-black" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton />
        <button onClick={() => setShowParticipaabts((prev) => !prev)}>
          <div className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#0e1216]">
            <Users size={20} className=" text-white" />
          </div>
        </button>

        <EndCallButton />
      </div>
    </section>
  );
};

export default MeetingRoom;
