"use client";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const MeetingPage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return;
  const { isLoaded, user } = useUser();
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (!isLoaded || isCallLoading) return <Loading />;

  if (!call) {
    return (
      <p className=" text-center text-3xl font-bold text-white ">
        Call Not Found
      </p>
    );
  }

  const notAllowed =
    call.type === "invited" &&
    (!user || (user && !call.state.members.find((m) => m.user.id === user.id)));

  if (notAllowed) return <Alert title="您未被允许参与此会议" />;
  return (
    <main className=" h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
