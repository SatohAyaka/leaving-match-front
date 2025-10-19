import { getAudioContext } from "./initNotification";

export async function playSound(soundPath: string = "/sounds/notify.mp3") {
    try {
        const audioCtx = getAudioContext();
        const response = await fetch(soundPath);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
        const source = audioCtx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioCtx.destination);
        source.start();
    } catch (err) {
        console.warn("音声再生失敗:", err);
    }
}
