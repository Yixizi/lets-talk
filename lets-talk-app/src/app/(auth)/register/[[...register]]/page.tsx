import { SignUp } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import Image from "next/image";

const RegisterPage = () => {
  return (
    <>
      <main className=" flex flex-col items-center p-5 gap-3 animate-fade-in">
        <div className="relative w-full h-[80px]">
          <Image src="/logo.svg" alt="logo" fill />
        </div>
        <div className=" text-3xl font-medium">实时连接，协作，交流</div>
        <div>
          <SignUp
            appearance={{
              baseTheme: neobrutalism,
            }}
          />
        </div>
      </main>
    </>
  );
};

export default RegisterPage;
