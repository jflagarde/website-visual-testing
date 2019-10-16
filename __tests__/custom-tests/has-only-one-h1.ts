import puppeteer from "puppeteer";

module.exports.CustomTest = class {

    public name = 'Has only one h1';

    constructor() {
    }
    public test = async (pageInContext: puppeteer.Page = page, expectedNumber: number = 1) => {

        const h1ElementHandles = await pageInContext.$$('h1');
        return expect(h1ElementHandles.length).toBe(expectedNumber);

    }

}