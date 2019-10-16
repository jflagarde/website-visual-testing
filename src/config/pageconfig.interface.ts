import { FormConfig } from "./formconfig.interface";

interface PageConfig {
    name: string;
    slug: string;
    title: string;
    url: string;
    elements_to_screenshot: Array<string>;
    elements_to_remove?: Array<string>;
    forms_to_test?: Array<FormConfig>;
    content_to_match?: Array<string>;
    custom_tests?: Array<any>;
}

export { PageConfig, FormConfig };