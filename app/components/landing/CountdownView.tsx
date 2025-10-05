"use client";
import Image from "next/image";
import Countdown from "./Countdown";
import NotifyForm from "./NotifyForm";
import SocialMedia from "../shared/SocialMedia";

export default function CountdownView() {
  return (
    <>
      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="Logo"
          width={259}
          height={234}
          className="mb-6 w-[130px] h-auto sm:w-[180px] md:w-[220px] lg:w-[259px]"
        />
        <Countdown />
        <NotifyForm />
      </div>
    </>
  );
}
