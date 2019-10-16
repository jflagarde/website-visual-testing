import puppeteer from "puppeteer";

module.exports.CustomTest = class {

    public name = 'Has matching content';

    constructor() {
    }
    public test = async (pageInContext: puppeteer.Page = page, expectedContent: string) => {

        return expect(pageInContext).toMatch(expectedContent);

    }

}