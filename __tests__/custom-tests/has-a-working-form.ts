import puppeteer from "puppeteer";

module.exports.CustomTest = class {

    public name = 'Has matching content';

    constructor() {
    }
    public test = async (pageInContext: puppeteer.Page = page, expectedSuccessMessage: string, args: any) => {

        args.formSelector
        // Should be fillable
        await expect(pageInContext).toFillForm(args.formSelector, args.formfields);

        // Should have a clickable form button
        await expect(pageInContext).toClick(args.submitSelector);

        // Should return a success message upon submission
        const elementorMessageSuccessElementHandle = await pageInContext.waitForSelector(args.formSuccessSelector);
        return await expect(elementorMessageSuccessElementHandle).toMatch(expectedSuccessMessage);

    }

}