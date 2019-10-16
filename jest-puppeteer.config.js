//REF: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions
module.exports = {
    launch: {
        headless: true,
        slowMo: 0,
        defaultViewport: {
            width: 1920,
            height: 947,
            deviceScaleFactor: 1,
            isMobile: false,
            hasTouch: false,
            isLandscape: false
        },
        args: [
            '--disable-extensions',
            '--disable-lcd-text'
        ],
        timeout: 3000,
        dumpio: false,
        devtools: false,
    },
    browser: 'chromium',
    browserContext: 'incognito'
};