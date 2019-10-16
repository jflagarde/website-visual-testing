import { SiteConfig, PageConfig, FormConfig } from "./config/siteconfig.interface";

declare module 'website-visual-testing' {
    export { SiteConfig, PageConfig, FormConfig };
};

/*
declare module 'puppeteer-full-page-screenshot' {
    export interface fullPageScreenshotOptions {
        delay?: number = 0,
        path?: string = 'screenshot.png'
    }
    export function fullPageScreenshot(page: puppeteer.Page, fullPageScreenshotOptions?: fullPageScreenshotOptions): Promise<Buffer>;
}
*/