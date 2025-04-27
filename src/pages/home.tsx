import AuroraText from "@/components/magicui/aurora-text-hover";
import { BackgroundBeamsWithCollision } from "@/components/magicui/background-beams-with-collision";
import { LoginButton } from "@/components/login-button";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";

import { ModeToggle } from "@/components/theme/mode-toggle";
import { Link } from "react-router-dom";

const homePage = () => {
  return (
    <div className="flex flex-col h-screen w-screen">
      {/**navbar */}
      <div className="h-[80px] w-full p-4  grid grid-cols-3">
        <div className="flex justify-start items-center text-2xl pl-4">
          <Link to={"/"} className="flex font-semibold">
            <AnimatedShinyText>PresencePro</AnimatedShinyText>
          </Link>
        </div>
        <div className="flex justify-center items-center text-[17px] gap-6">
          <Link to={"/about"}>
            <AnimatedShinyText>About</AnimatedShinyText>
          </Link>
        </div>
        <div className="flex justify-end items-center">
          <div className="cursor-pointer">
            <ModeToggle />
          </div>
        </div>
      </div>

      {/**home hero */}
      <BackgroundBeamsWithCollision className="w-full h-full flex flex-col items-center justify-center">
        <div className=" w-full h-full flex flex-col items-center justify-center">
          <h1
            className="bg-gradient-to-r from-[#0D0D0D] via-[#080E85] to-[#011014]   
        relative mb-6 z-10 text-lg md:text-[4rem]  bg-clip-text text-transparent dark:bg-gradient-to-r 
        dark:from-[#252554] dark:via-[#090979] dark:to-[#1D1D4F] dark:hidden  text-center font-sans font-bold"
          >
            Attendance with PresencePro
          </h1>
          <div className="hidden dark:inline-block">
            <AuroraText lines="Attendance with PresencePro" />
          </div>

          <p className="dark:text-neutral-400 max-w-lg mx-auto my-2 mb-16 text-m text-center relative z-10">
            An intuitive, biometric-based attendance platform built for accuracy
            and ease. Seamlessly manage student records, subject-wise logs, and
            live device monitoring—all in one modern, responsive dashboard.
          </p>
          <div className="flex justify-around gap-[20px]">
            <Link to={"/studentLogin"}>
              <LoginButton>Student Login</LoginButton>
            </Link>
            <Link to={"/adminLogin"}>
              <LoginButton>Admin Login</LoginButton>
            </Link>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
};

export default homePage;
