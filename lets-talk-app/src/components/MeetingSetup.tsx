"use client";

import { useUser } from "@clerk/nextjs";
import {
  DeviceSettings,
  useCall,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import Alert from "./Alert";
import { Button } from "./ui/button";
import { toast } from "sonner";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const { user } = useUser();
  if (!user) return;

  const call = useCall();
  if (!call) {
    toast.error("useStreamCall must be used within a StreamCall component");
    throw new Error("useStreamCall must be used within a StreamCall component");
  }

  const [isMicCamToggled, setIsMicCamToggled] = useState(true);

  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  if (callTimeNotArrived) {
    return <Alert title={`你的会议还未开始，它的日程在${callStartsAt}`} />;
  }
  if (callHasEnded) {
    return <Alert title={`此通话已结束`} iconUrl="/assets/call-ended.svg" />;
  }

  return (
    <div className=" flex h-screen w-full flex-col items-center justify-center gap-3 text-black">
      <h1 className=" text-center text-2xl font-bold">
        <VideoPreview />
      </h1>

      <div className=" flex h-16 items-center justify-center gap-3">
        <label
          htmlFor=""
          className=" flex items-center justify-center gap-2 font-medium"
        >
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          加入时麦克风和摄像头默认关闭
        </label>
        <DeviceSettings />
      </div>

      <Button
        className=" rounded-3xl bg-blue-500 p-6 hover:bg-blue-800 hover:scale-125
      transition ease-in-out delay-100 duration-300"
        onClick={() => {
          call.join();
          call.updateCallMembers({
            update_members: [{ user_id: user.id }],
          });

          setIsSetupComplete(true);
        }}
      >
        加入会议
      </Button>
    </div>
  );
};

export default MeetingSetup;
