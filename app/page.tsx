"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Countdown from "./countdown";
import NotifyForm from "./email";
import SocialMedia from "./socialmedia";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 min-w-full min-h-full object-cover object-center -z-10"
      >
        <source
          src={isMobile ? "/background-mobile.mp4" : "/background.mp4"}
          type="video/mp4"
        />
      </video>


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
