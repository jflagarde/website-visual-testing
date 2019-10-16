import puppeteer from "puppeteer";
//import puppeteer from "puppeteer-firefox";

import { optionsConfig } from "../config/options.config";
import { sitesConfig } from "../config/sites.config";

describe.each(sitesConfig)('Verify that each site content works properly', (siteConfig) => {

    describe.each(siteConfig.pages)('Site: ' + siteConfig.name, (pageConfig) => {

        describe('Page: ' + pageConfig.name, () => {

            let incognitoContext: puppeteer.BrowserContext;
            let pageInIncognitoContext: puppeteer.Page;

            beforeEach(async () => {

                // Create a new incognito browser context
                incognitoContext = await browser.createIncognitoBrowserContext();

                // Create a new page inside context.
                pageInIncognitoContext = await incognitoContext.newPage();

                // Go to the page
                return await pageInIncognitoContext.goto(pageConfig.url);

            }, optionsConfig.timeout ? optionsConfig.timeout : undefined);

            // Execute custom tests
            if (pageConfig.customTestsConfig) {

                describe.each(pageConfig.customTestsConfig)('Complete the custom tests', (customTestConfig) => {

                    const { CustomTest } = require('./custom-tests/' + customTestConfig.path);
                    let customTest = new CustomTest();

                    if (customTest) {

                        it(customTest.name, async () => {

                            return await customTest.test(pageInIncognitoContext, customTestConfig.expectedValue, customTestConfig.args);

                        }, optionsConfig.timeout ? optionsConfig.timeout : undefined);

                    }

                });
            }

            afterEach(async () => {

                // Dispose context once it's no longer needed.
                return incognitoContext.close();

            }, optionsConfig.timeout ? optionsConfig.timeout : undefined);

        });

    });

});