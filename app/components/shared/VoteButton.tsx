"use client";

import { useState } from "react";

interface VoteButtonProps {
  robot: string;                                // name of the robot
  handleVote: (robotName: string) => void;      // function that handles the vote
}

export default function VoteButton({ robot, handleVote }: VoteButtonProps) {
  const [voted, setVoted] = useState(false);

  const handleClick = async () => {
    setVoted(true);
    handleVote(robot);
    setTimeout(() => setVoted(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      className="
        mt-2 relative overflow-hidden
        bg-transparent border-2 border-[#00FF1E] text-[#00FF1E]
        px-4 py-1 text-sm sm:px-5 sm:py-1.5 sm:text-base font-semibold
        transition-all duration-200 ease-in-out
        hover:bg-[#00FF1E] hover:text-black hover:shadow-[0_0_15px_#00FF1E]
        active:scale-95 active:shadow-[0_0_20px_#00FF1E]
      "
    >
      <span className="relative z-10">{voted ? "✅" : "VOTE"}</span>
      <span className="absolute inset-0 opacity-0 hover:opacity-20 bg-[#00FF1E] transition-opacity duration-300"></span>
    </button>
  );
}
