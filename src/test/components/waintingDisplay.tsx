"use client";

import "@/src/styles/style.css";
import { useEffect } from "react";
import "@/src/styles/shootingstar.css";


export default function WaitingDisplay() {
    console.log("=== WAITING ===");
    useEffect(() => {
        const sky = document.getElementById("sky");

        if (!sky) return;

        function isNightTime() {
            const now = new Date();
            const hoursJST = (now.getUTCHours() + 9) % 24;
            return hoursJST >= 22 || hoursJST < 7;
        }

        function updateNightMode() {
            if (!sky) return;
            if (isNightTime()) {
                sky.classList.add("night-mode");
            } else {
                sky.classList.remove("night-mode");
            }
        }

        updateNightMode();
        const nightCheck = setInterval(updateNightMode, 60000);

        if (!isNightTime()) {
            function createShootingStar() {
                if (!sky) return;
                const star = document.createElement("div");
                star.classList.add("shooting-star");

                const startTop = Math.random() * (window.innerHeight / 3);
                const startLeft = Math.random() * (window.innerWidth * 0.8);
                star.style.top = `${startTop}px`;
                star.style.left = `${startLeft}px`;
                star.style.animationDelay = `${Math.random() * 2}s`;

                sky.appendChild(star);
                setTimeout(() => star.remove(), 2000);
            }

            const starInterval = setInterval(createShootingStar, 1200);

            return () => {
                clearInterval(starInterval);
                clearInterval(nightCheck);
            };
        }

        return () => clearInterval(nightCheck);
    }, []);

    return <div id="sky" className={`display night`}></div>;
}
