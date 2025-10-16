"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AutoRefresher() {
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
            console.log("ページ全体を再フェッチ中...");
            router.refresh(); // ← page.tsx が再度実行される！
        }, 60 * 1000); // 1分ごと

        return () => clearInterval(interval);
    }, [router]);

    return null; // UIには何も出さない
}
