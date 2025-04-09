import { Call } from "@stream-io/video-react-sdk";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Members from "./Members";
import { toast } from "sonner";
interface MeetingCardProps {
  /** 通话对象，正常会议或录制回放 */
  call: Call;
  /** 会议卡片类型，用于决定图标、按钮文案等 */
  type: string;
  /** 卡片左侧图标 URL */
  icon: string;
  /** 标题文案（会议描述或录制文件名） */
  title: string;
  /** 日期文案（会议开始时间或录制开始时间） */
  date: string;
  /** 是否为已结束的会议，用于样式或行为区分 */
  isPreviousMeeting?: boolean;
  /** 点击按钮或卡片时跳转的链接 */
  link: string;
  /** 按钮左侧可选图标 URL，仅在 type 为 "recordings" 时存在 */
  buttonIcon1?: string;
  /** 按钮文字（“Play” 或 “Start”） */
  buttonText: string;
  /** 点击按钮的回调，通常做路由跳转 */
  handleClick: () => void;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  type,
  call,
  buttonText,
}: MeetingCardProps) => {
  return (
    <section
      className=" flex  min-h-[258px]  w-full  flex-col  justify-between 
       rounded-3xl  bg-blue-200  px-5  py-8  xl:max-w-[568px]  text-black
        scale-90  shadow-2xl"
    >
      <article className=" flex flex-col gap-5">
        <Image src={icon} alt="即将" width={28} height={28} />
        <div className="flex  justify-between">
          <div className=" flex flex-col gap-2">
            <h1 className=" text-2xl font-bold">{title}</h1>
            <p className=" text-base font-normal">{date}</p>
          </div>
        </div>
      </article>

      <article
        className={cn("flex justify-center relative flex-col gap-3", {})}
      >
        <div>
          {/* Show meeting members only if the meeting has ended */}
          {type === "ended" && <Members call={call} />}
        </div>

        {/* Show action buttons only if it's an active meeting */}
        {!isPreviousMeeting && (
          <div className="flex gap-5">
            {/* Button to join or start a meeting */}
            <Button
              onClick={handleClick}
              className="rounded bg-blue-700 p-4 hover:bg-blue-400 px-6"
            >
              {buttonIcon1 && (
                /* 如果有图标，就渲染图标 */
                <Image src={buttonIcon1} alt="icon" width={20} height={20} />
              )}
              {buttonText}
            </Button>

            <Button
              className="bg-gray-700"
              onClick={() => {
                navigator.clipboard.writeText(link); // Copy link to clipboard
                toast("Link Copied", {
                  duration: 3000,
                  className:
                    "!bg-gray-300 !rounded-3xl !py-8 !px-5 !justify-center",
                });
              }}
            >
              {/* Copy icon */}
              <Image src="/assets/copy.svg" alt="copy" width={20} height={20} />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
