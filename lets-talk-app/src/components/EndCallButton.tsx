"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

const EndCallButton = () => {
  const call = useCall();
  if (!call) {
    throw new Error("useStream must be used within a StreamCall component");
  }

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  const router = useRouter();

  const endCall = async () => {
    await call.endCall();
    router.push("/");
  };

  return (
    <Button onClick={endCall} className=" bg-red-500">
      结束通话
    </Button>
  );
};

export default EndCallButton;
