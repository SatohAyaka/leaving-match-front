"use client";

import "../styles/style.css";
import { useEffect } from "react";
import "../styles/shootingstar.css";


export default function WaitingDisplay() {
    console.log("=== WAITING ===");
    useEffect(() => {
        const sky = document.getElementById("sky");

        if (!sky) return;

        function createShootingStar() {
            const star = document.createElement("div");
            star.classList.add("shooting-star");

            // ランダム位置
            const startTop = Math.random() * (window.innerHeight / 3);
            const startLeft = Math.random() * (window.innerWidth * 0.4);
            star.style.top = `${startTop}px`;
            star.style.left = `${startLeft}px`;
            star.style.animationDelay = `${Math.random() * 2}s`;

            if (sky == null) {
                return;
            }
            sky.appendChild(star);
            setTimeout(() => star.remove(), 2000);
        }

        const interval = setInterval(createShootingStar, 1200);
        return () => clearInterval(interval);
    }, []);

    return <div id="sky" className={`display night`}></div>;
}
