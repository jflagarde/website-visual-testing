import puppeteer from "puppeteer";
//import puppeteer from "puppeteer-firefox";
import devices from 'puppeteer/DeviceDescriptors'
import mkdirp from 'mkdirp';

import { optionsConfig } from "../config/options.config";
import { sitesConfig } from "../config/sites.config";
import { devicesConfig } from "../config/devices.config";

let emulatedDevices: Array<puppeteer.devices.Device> = devicesConfig.customDevices;
if (devicesConfig.predefinedDeviceNames) {

    const predefinedDevices = devicesConfig.predefinedDeviceNames.map((deviceName) => devices[deviceName])
    emulatedDevices = emulatedDevices.concat(predefinedDevices);

}

describe.each(sitesConfig)('Screenshot every page for all sites on all devices', (siteConfig) => {

    beforeAll(() => {

        // Create the folder structure
        mkdirp('./__output__/screenshots/' + siteConfig.name + '/abovethefold', (err) => {

            if (err) console.error(err);

        });
        mkdirp('./__output__/screenshots/' + siteConfig.name + '/fullpage', (err) => {

            if (err) console.error(err);

        });

    });

    describe.each(siteConfig.pages)('Site: ' + siteConfig.name, (pageConfig) => {

        describe.each(emulatedDevices)('Page: ' + pageConfig.name, (device) => {

            describe('Device: ' + device.name, () => {

                let incognitoContext: puppeteer.BrowserContext;
                let pageInIncognitoContext: puppeteer.Page;

                //TODO: Make that a function
                const cleanedDeviceName = device.name.trim().toLowerCase().replace(/[^a-z0-9|^-]/g, "");

                beforeEach(async () => {

                    // Create a new incognito browser context
                    incognitoContext = await browser.createIncognitoBrowserContext();

                    // Create a new page inside context.
                    pageInIncognitoContext = await incognitoContext.newPage();

                    // Emulate the device
                    await pageInIncognitoContext.emulate(device);

                    // Go to the page
                    return await pageInIncognitoContext.goto(pageConfig.url);

                }, optionsConfig.timeout ? optionsConfig.timeout : undefined);

                test('Create the abovethefold screenshot', async () => {

                    // Create the above the fold screenshot
                    await pageInIncognitoContext.screenshot({

                        path: './__output__/screenshots/' + siteConfig.name + '/abovethefold/' + siteConfig.name + '-' + pageConfig.name + '-' + 'abovethefold' + '-' + cleanedDeviceName + '.png'

                    });

                }, optionsConfig.timeout ? optionsConfig.timeout : undefined);

                test('Create the fullpage screenshot', async () => {

                    // Create the fullpage screenshot
                    await pageInIncognitoContext.screenshot({

                        fullPage: true,
                        path: './__output__/screenshots/' + siteConfig.name + '/fullpage/' + siteConfig.name + '-' + pageConfig.name + '-' + 'fullpage' + '-' + cleanedDeviceName + '.png'

                    });

                }, optionsConfig.timeout ? optionsConfig.timeout : undefined);

                //TODO: Take screenshot of elementsToScreenshot

                afterEach(async () => {

                    // Dispose context once it's no longer needed.
                    return incognitoContext.close();

                }, optionsConfig.timeout ? optionsConfig.timeout : undefined);

            });

        });

    });

});