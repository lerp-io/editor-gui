export default async function waitForFontLoad(font,timeout,interval){
    timeout = timeout || 1000
    interval = interval || 10
    return new Promise((resolve, reject) => {
        // repeatedly poll check
        const poller = setInterval(async () => {
            try {
                await document.fonts.load(font);
            } catch (err) {
                reject(err);
            }
            if (document.fonts.check(font)) {
                clearInterval(poller);
                resolve(true);
            }
        }, interval);
        setTimeout(() => clearInterval(poller), timeout);
    });
}