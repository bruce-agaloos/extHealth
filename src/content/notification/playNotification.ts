const playNotification = () => {
    return new Promise<void>((resolve, reject) => {
        const audio = new Audio('notif1.mp3');
        audio.play().then(() => {
            resolve();
        }).catch((error) => {
            reject(error);
        });
    });
};

export default playNotification;