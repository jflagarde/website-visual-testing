import puppeteer from "puppeteer";

module.exports.CustomTest = class {

    public name = 'Has matching title';

    constructor() {
    }
    public test = async (pageInContext: puppeteer.Page = page, expectedTitle: string) => {

        const actualPageTitle = await pageInContext.title();
        return expect(actualPageTitle).toBe(expectedTitle);

    }

}