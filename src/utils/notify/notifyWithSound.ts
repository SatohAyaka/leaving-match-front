// src/utils/notify/notifyWithSound.ts

export async function notifyWithSound(message: string, soundPath: string = "/sounds/notify.mp3") {
    try {
        // --- 通知許可チェック ---
        if (typeof window === "undefined") return; // SSR回避

        if (Notification.permission === "granted") {
            new Notification(message, {
                body: "結果が更新されました。"
            });
        } else if (Notification.permission !== "denied") {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
                new Notification(message, {
                    body: "結果が更新されました。"
                });
            }
        }

        // --- 音声を再生 ---
        const audio = new Audio(soundPath);
        audio.play().catch((err) => {
            console.warn("音声再生がブロックされました:", err);
        });

    } catch (err) {
        console.error("通知処理に失敗しました:", err);
    }
}
