import puppeteer from "puppeteer";
//import puppeteer from "puppeteer-firefox";
import devices from 'puppeteer/DeviceDescriptors'

import { optionsConfig } from "../config/options.config";
import { sitesConfig } from "../config/sites.config";
import { devicesConfig } from "../config/devices.config";

let emulatedDevices: Array<puppeteer.devices.Device> = devicesConfig.customDevices;
if (devicesConfig.predefinedDeviceNames) {

    const predefinedDevices = devicesConfig.predefinedDeviceNames.map((deviceName) => devices[deviceName])
    emulatedDevices = emulatedDevices.concat(predefinedDevices);

}

describe.each(sitesConfig)('Verify that each site visual works properly', (siteConfig) => {

    describe.each(siteConfig.pages)('Site: ' + siteConfig.name, (pageConfig) => {

        describe.each(emulatedDevices)('Page: ' + pageConfig.name, (device) => {

            describe('Device: ' + device.name, () => {

                let incognitoContext: puppeteer.BrowserContext;
                let pageInIncognitoContext: puppeteer.Page;

                const cleaned_device_name = device.name.trim().toLowerCase().replace(/[^a-z0-9|^-]/g, "");

                beforeEach(async () => {

                    // Create a new incognito browser context
                    incognitoContext = await browser.createIncognitoBrowserContext();

                    // Create a new page inside context.
                    pageInIncognitoContext = await incognitoContext.newPage();

                    // Emulate the device
                    await pageInIncognitoContext.emulate(device);

                    // Go to the page
                    await pageInIncognitoContext.goto(pageConfig.url);

                    // Remove the elements
                    if (pageConfig.elementsToRemove) {

                        const elementsToRemove: Array<string> = pageConfig.elementsToRemove;
                        elementsToRemove.map(async (elementString: string) => {

                            return await pageInIncognitoContext.$$eval(elementString, (elementHandles) => {

                                if (elementHandles) {

                                    return elementHandles.map((elementHandle) => {
                                        elementHandle.remove();
                                    });

                                }
                                else {

                                    return undefined;

                                }

                            });

                        });

                    }
                    return pageInIncognitoContext;

                }, optionsConfig.timeout ? optionsConfig.timeout : undefined);

                //TODO: Simplify and remove describe, replace by it.each()
                describe.each(pageConfig.elementsToScreenshot)('Verify that each element has a similar screenshot', (elementString: string) => {

                    let cleanedElementString: string;

                    beforeAll(async () => {

                        //TODO: fix tag combination example div.myclass should become div-myclass
                        //TODO: make that a function
                        cleanedElementString = elementString.trim().toLowerCase().replace(/[^a-z0-9|^-]/g, "");

                    });

                    it(elementString, async () => {

                        await pageInIncognitoContext.waitForSelector(elementString);
                        //TODO: Remove the wait for 2s - currently there to account for animations but slows down the tool a lot
                        await pageInIncognitoContext.waitFor(2000);
                        const elementHandle = await pageInIncognitoContext.$(elementString);

                        if (elementHandle) {

                            const boundingBox = await elementHandle.boundingBox();

                            if (boundingBox) {

                                const screenshot = await pageInIncognitoContext.screenshot({
                                    clip: boundingBox
                                });

                                expect(screenshot).toMatchImageSnapshot({
                                    customSnapshotsDir: './__output__/image_snapshots/' + siteConfig.name,
                                    customSnapshotIdentifier: siteConfig.name + '-' + pageConfig.name + '-' + cleanedElementString + '-' + device.name
                                });

                            }

                            await elementHandle.dispose();

                        }

                    }, optionsConfig.timeout ? optionsConfig.timeout : undefined);

                });

                afterEach(async () => {

                    // Dispose context once it's no longer needed.
                    return incognitoContext.close();

                }, optionsConfig.timeout ? optionsConfig.timeout : undefined);

            });

        });

    });

});