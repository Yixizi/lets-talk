"use client";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, serIsCallLoading] = useState(true);

  const client = useStreamVideoClient();
  const callId = Array.isArray(id) ? id[0] : id;
  useEffect(() => {
    if (!client) return;

    const loadCall = async () => {
      try {
        const { calls } = await client.queryCalls({
          filter_conditions: { id: callId },
        });
        console.log(calls);

        if (calls.length > 0) setCall(calls[0]);
        serIsCallLoading(false);
      } catch (error: any) {
        console.log(error);
        serIsCallLoading(false);
      }
    };

    loadCall();
  }, [client, id]);

  return { call, isCallLoading };
};
