import { cn } from "@/lib/utils";
import { Call } from "@stream-io/video-react-sdk";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Members = ({ call }: { call: Call }) => {
  if (!call) return;
  const [callMenbers, setCallMembers] = useState<any[]>([]);
  useEffect(() => {
    const getMembers = async () => {
      const menbers = await call.queryMembers();
      setCallMembers(menbers.members);
    };
    getMembers();
  }, []);
  if (callMenbers.length > 0) {
    return (
      <div className=" relative flex w-full">
        {callMenbers.map((member, index) => {
          const user = member.user;
          return (
            <Image
              key={user.id}
              src={user.image}
              alt="attendees"
              width={40}
              height={40}
              className={cn("rounded-full", { absolute: index > 0 })}
              style={{ top: 0, left: index * 28 }}
            />
          );
        })}
      </div>
    );
  }
  return <div>Members</div>;
};

export default Members;
