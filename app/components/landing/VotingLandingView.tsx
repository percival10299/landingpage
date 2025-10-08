"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function VotingLandingView() {
  const [votes, setVotes] = useState<Record<string, number>>({});

  const votingRobots = [
    "DEEPAK", "MALIN", "LYNDON", "JUNPEI", "COLLEEN",
    "LIV", "DANI", "LOU", "DARYAN", "KENSHIN",
  ];

  // ✅ Fetch votes and subscribe
  useEffect(() => {
    async function loadVotes() {
      const { data, error } = await supabase
        .from("votes")
        .select("robot_name, vote_count");
      if (!error && data) {
        const mapped = Object.fromEntries(data.map((v) => [v.robot_name, v.vote_count]));
        setVotes(mapped);
      }
    }
    loadVotes();

    const channel = supabase
      .channel("votes-changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "votes" },
        (payload) => {
          const { robot_name, vote_count } = payload.new;
          setVotes((prev) => ({ ...prev, [robot_name]: vote_count }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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

  // ✅ Handle voting action
  async function handleVote(robotName: string) {
    // Update vote count in database
    const currentCount = votes[robotName] ?? 0;

    const { error } = await supabase
      .from("votes")
      .update({ vote_count: currentCount + 1 })
      .eq("robot_name", robotName);

    if (error) {
      console.error("Vote update failed:", error);
    } else {
      // Optional local update (will also update via realtime)
      setVotes((prev) => ({ ...prev, [robotName]: currentCount + 1 }));
    }
  }


  return (
    <>
      {/* Landing Section */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-screen px-8 md:px-16">
        {/* Left Side - Robot Grid */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex flex-col gap-6 md:gap-8">
            {robotRows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-6 md:gap-8">
                {row.map((robot) => (
                  <div key={robot.id} className="flex flex-col items-center">
                    <div
                      className={`relative ${robot.type === "black"
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

          {/* 👇 Mobile-only Text */}
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

          {/* Logo */}
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

      {/* =========================== */}
      {/* Voting Section (Desktop) */}
      {/* =========================== */}
      <div className="bg-[#1b8d81] min-h-screen flex flex-col justify-center items-center py-16 text-white">
        <h1 className="text-4xl sm:text-5xl font-bold mb-12 tracking-wide text-center">
          VOTE YOUR BOT
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-14 px-6 sm:px-8 md:px-12 max-w-7xl">
          {votingRobots.map((robot, index) => {
            // bright, solid color cycle
            const colors = ["bg-[#FFD600]", "bg-[#FF3131]", "bg-[#00FF1E]"];
            const colorClass = colors[index % colors.length];

            return (
              <div
                key={index}
                className="flex flex-col items-center justify-start h-[340px] w-[180px] text-center relative"
              >
                {/* Name above robot */}
                <div
                  className={`${colorClass} w-[100%] px-4 py-0.5 font-extrabold text-4xl sm:text-5xl mb-1 text-left text-outline-black`}
                  style={{
                    fontFamily: "PP Neue Bit",
                    lineHeight: "1",
                  }}
                >
                  {robot}
                </div>


                {/* Robot image */}
                <div className="relative flex items-center justify-center w-full h-[200px]">
                  <Image
                    src={`/robots/${robot.toLowerCase()}.png`}
                    alt={robot}
                    fill
                    className="object-contain border-4 border-transparent hover:border-[#00FF1E] transition-all duration-200"
                  />
                  <div
                    className="absolute top-2 left-2 bg-black/80 text-[#00FF1E] px-3 py-1 text-xl font-extrabold transform -rotate-12 tracking-widest border-2 border-[#00FF1E] pulse-glow"
                    style={{ fontFamily: 'PP Neue Bit' }}
                  >
                    {votes[robot] ?? 0}
                  </div>


                </div>

                {/* Vote button (less spacing) */}
                <button
                  onClick={() => handleVote(robot)}
                  className="mt-2 bg-transparent border-2 border-[#00FF1E] text-[#00FF1E] px-5 py-1.5 font-semibold hover:bg-[#00FF1E] hover:text-black transition-all duration-200"
                >
                  VOTE
                </button>

              </div>
            );
          })}
        </div>
      </div>


    </>
  );
}
