// src/utils/notify/initNotification.ts

let audioCtx: AudioContext | null = null;

export const initNotification = () => {
    if (!("Notification" in window)) {

        Notification.requestPermission().then((permission) => {
            console.log("通知権限:", permission);
        });
    }

    const initAudioContext = () => {
        if (!audioCtx) {
            const AudioContextClass: typeof AudioContext =
                window.AudioContext ||
                (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            audioCtx = new AudioContextClass();
        }

        if (audioCtx.state === "suspended") {
            audioCtx.resume().then(() => {
                console.log("AudioContext resumed（音声再生が有効になりました）");
            });
        }
        // 一度 resume したらリスナーを削除
        window.removeEventListener("click", initAudioContext);
        window.removeEventListener("touchstart", initAudioContext);
    };
    // --- ユーザー操作で AudioContext を有効化 ---
    window.addEventListener("click", initAudioContext);
    window.addEventListener("touchstart", initAudioContext);
};
// AudioContext を外部でも参照できるように export
export const getAudioContext = () => {
    if (!audioCtx) {
        const AudioContextClass: typeof AudioContext =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtx = new AudioContextClass();
    }
    return audioCtx;
};