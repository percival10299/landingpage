import Image from "next/image";

export default function SocialMedia({
  isVotingOpen,
  toggleState,
}: {
  isVotingOpen: boolean;
  toggleState: () => void;
}) {
  return (
    <div>
      {/* Left side icons */}
      <div
        className="
          absolute
          top-6 left-5 gap-3     /* mobile default */
          sm:top-10 sm:left-14 sm:gap-6  /* laptop/desktop */
          flex z-20"
      >
        <a
          href="https://www.instagram.com/deliveryidol?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/instagram.png"
            alt="Instagram"
            width={40}
            height={40}
            className="hover:opacity-80 w-6 h-6 sm:w-10 sm:h-10"
          />
        </a>

        <a
          href="https://www.tiktok.com/@delivery.idol?is_from_webapp=1&sender_device=pc"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/tiktoc.png"
            alt="TikTok"
            width={40}
            height={40}
            className="hover:opacity-80 w-6 h-6 sm:w-10 sm:h-10"
          />
        </a>

        <a
          href="https://www.youtube.com/channel/UCOTCBYCul-EBqKHBPcWIh1w"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/youtube.png"
            alt="YouTube"
            width={40}
            height={40}
            className="hover:opacity-80 w-6 h-6 sm:w-10 sm:h-10"
          />
        </a>
      </div>

      <div
        className="
          absolute
          top-4 right-5 gap-3     /* mobile default */
          sm:top-10 sm:right-14 sm:gap-6  /* laptop/desktop */
          flex z-20"
      >
        <button
          onClick={() =>
            window.open("https://youtu.be/Hw7rJj8a6zs?si=lUoweRA38NPp3fFA", "_blank")
          }
          className="
      bg-[#00FF1E] text-black px-4 py-2 rounded-full font-bold
      hover:opacity-80 transition-opacity
    "
        >
          ■ watch
        </button>
        <button
          onClick={toggleState}
          className="
      bg-transparent border-2 border-[#00FF1E] text-[#00FF1E]
      px-4 py-2 rounded-full font-bold
      hover:bg-[#00FF1E] hover:text-black transition-all
    "
        >
          {isVotingOpen ? "▶ countdown" : "▶ vote"}
        </button>
      </div>


    </div>
  );
}
