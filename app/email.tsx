"use client";

import { useState } from "react";
import Image from "next/image";

export default function NotifyForm() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("./api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                alert("✅ You’re subscribed!");
                setEmail("");
            } else {
                alert("❌ Something went wrong.");
            }
        } catch (error) {
            alert("❌ Error connecting to server.");
        }
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 mt-8 w-full max-w-md mx-auto"
        >
            {/* Email Input */}
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-full text-black focus:outline-none border-2"
                style={{
                    backgroundColor: "rgba(0, 255, 30, 0.35)", // 35% opacity
                    borderColor: "#00FF1E", // stroke color
                }}
            />

            {/* Send Button with Icon */}
            <button type="submit" className="p-2">
                <Image
                    src="/send.png"
                    alt="Send"
                    width={36}
                    height={36}
                    className="cursor-pointer"
                />
            </button>

            {message && <p className="ml-2 text-sm text-gray-200">{message}</p>}
        </form>
    );
}
