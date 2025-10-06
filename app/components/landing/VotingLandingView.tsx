"use client";
import Image from "next/image";
import SocialMedia from "../shared/SocialMedia";

export default function VotingLandingView() {
  const robotRows = [
    [{ id: 1, type: "green", status: "active" }],
    [
      { id: 2, type: "green", status: "active" },
      { id: 3, type: "green", status: "active" },
    ],
    [
      { id: 4, type: "white", status: "active" },
      { id: 5, type: "white", status: "active" },
      { id: 6, type: "white", status: "active" },
    ],
    [
      { id: 7, type: "white", status: "active" },
      { id: 8, type: "white", status: "active" },
      { id: 9, type: "black", status: "eliminated" },
      { id: 10, type: "black", status: "eliminated" },
    ],
  ];

  return (
    <>
      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-screen px-8 md:px-16">
        {/* Left Side - Robot Grid */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex flex-col gap-6 md:gap-8">
            {robotRows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-6 md:gap-8">
                {row.map((robot) => (
                  <div key={robot.id} className="flex flex-col items-center">
                    <div
                      className={`relative ${
                        robot.type === "black"
                          ? "w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
                          : "w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
                      }`}
                    >
                      <Image
                        src={`/robots/${robot.type}bot.png`}
                        alt={`${robot.type} Robot`}
                        width={128}
                        height={128}
                        className="w-full h-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        {robot.status === "eliminated" ? (
                          <Image
                            src="/robots/X.png"
                            alt="Eliminated"
                            width={robot.type === "black" ? 32 : 24}
                            height={robot.type === "black" ? 32 : 24}
                            className={
                              robot.type === "black"
                                ? "w-8 h-8 md:w-10 md:h-10"
                                : "w-6 h-6 md:w-8 md:h-8"
                            }
                          />
                        ) : (
                          <Image
                            src="/robots/question_mark.png"
                            alt="Unknown"
                            width={robot.type === "black" ? 32 : 24}
                            height={robot.type === "black" ? 32 : 24}
                            className={
                              robot.type === "black"
                                ? "w-8 h-8 md:w-10 md:h-10"
                                : "w-6 h-6 md:w-8 md:h-8"
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* 👇 Mobile-only Text (below robots, vertically centered) */}
          <div className="block md:hidden flex flex-col justify-center items-center text-center text-white mt-8">
            <p className="text-lg mb-2">Elimination hits Friday:</p>
            <h2 className="text-3xl font-bold mb-2">10 BOTS. 8 SPOTS.</h2>
            <p className="text-sm opacity-80 mb-2">
              cast your vote and keep your favorite rolling!
            </p>
            <div className="text-3xl">↓</div>
          </div>
        </div>

        {/* Right Side - Desktop Only */}
        <div className="hidden md:flex flex-1 flex-col items-center justify-center text-white text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-wider">
            DELIVERY IDOL
          </h1>

          {/* Logo only visible on desktop */}
          <div className="mb-8">
            <Image
              src="/logo.png"
              alt="Delivery Idol Logo"
              width={200}
              height={180}
              className="w-32 h-auto sm:w-40 md:w-48 lg:w-52"
            />
          </div>

          {/* Text */}
          <div className="text-center">
            <p className="text-lg md:text-xl mb-4">Elimination hits Friday:</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              10 BOTS. 8 SPOTS.
            </h2>
            <p className="text-sm md:text-base opacity-80 mb-4">
              cast your vote and keep your favorite rolling!
            </p>
            <div className="text-3xl md:text-4xl">↓</div>
          </div>
        </div>
      </div>
    </>
  );
}
