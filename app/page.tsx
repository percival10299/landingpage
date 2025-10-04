"use client";
import Image from "next/image";
import Countdown from "./countdown";
import NotifyForm from "./email";
import SocialMedia from "./socialmedia";
import Background from "./background";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* Background Component */}
      <div className="absolute inset-0 -z-10">
        <Background />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 -z-5"></div>

      <SocialMedia />
      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        {/* 👇 Icon above countdown */}
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
    </main>
  );
}
