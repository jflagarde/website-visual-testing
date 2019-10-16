import puppeteer from "puppeteer";

module.exports.CustomTest = class {

    public name = 'Loads in less than';

    constructor() {
    }
    public test = async (pageInContext: puppeteer.Page = page, maxLoadTime: number, args?: any) => {
        const loadEvent: puppeteer.LoadEvent = args.loadEvent ? args.loadEvent : "load";
        const metricsBefore = await page.metrics();
        await pageInContext.reload({ waitUntil: loadEvent });
        const metricsAfter = await page.metrics();

        const loadTime = metricsAfter.Timestamp - metricsBefore.Timestamp;
        return expect(loadTime).toBeLessThanOrEqual(maxLoadTime);

    }

}