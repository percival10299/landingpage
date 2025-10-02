import Image from "next/image";

export default function SocialMedia() {
    return (
        <div
            className="
            absolute
            top-6 left-8 gap-4     /* mobile default */
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
                    className="hover:opacity-80 w-8 h-8"
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
                    className="hover:opacity-80 w-8 h-8"
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
                    className="hover:opacity-80 w-8 h-8"
                />
            </a>
        </div>
    );
}
