import { PageConfig, FormConfig } from "./pageconfig.interface";

interface SiteConfig {
    name: string;
    slug: string;
    url: string;
    pages: Array<PageConfig>;
}
export { SiteConfig, PageConfig, FormConfig };