// src/utils/notify/initNotification.ts
export const initNotification = () => {
    if (!("Notification" in window)) return;

    Notification.requestPermission().then((permission) => {
        console.log("通知権限:", permission);
    });
};
