// import { SiteConfig } from "../src/config/siteconfig.interface";

export const sitesConfig = [
    {
        name: "demo-puppeteer-kali",
        pages: [
            {
                name: "home",
                url: "https://wordpress-235162-1019977.cloudwaysapps.com/",
                elementsToScreenshot: [
                    'body',
                    '.elementor-element-57b04e36',
                    'section.elementor-element-1ad9c154'
                ],
                elementsToRemove: [
                    '.elementor-widget-google_maps',
                    'section.elementor-element-d8bc538'
                ],
                customTestsConfig: [
                    {
                        path: "has-matching-title",
                        expectedValue: "Demo Puppeteer – Just another WordPress site"
                    },
                    {
                        path: "has-matching-content",
                        expectedValue: "Find yourself in the Flow of Yoga"
                    },
                    {
                        path: "has-only-one-h1"
                    },
                    {
                        path: "loads-in-less-than",
                        expectedValue: 2.0,
                        args: {
                            loadEvent: "load"
                        }
                    },
                    {
                        path: "has-a-working-form",
                        expectedValue: "The form was sent successfully.",
                        args: {
                            formSelector: "form[name='New Form']",
                            formFields: {
                                "form_fields[name]": "My Name",
                                "form_fields[email]": "info@mydomain.com",
                                "form_fields[message]": "This is an automated test."
                            },
                            submitSelector: "form[name='New Form'] button.elementor-button",
                            successSelector: "form[name='New Form'] .elementor-message-success"
                        }
                    }
                ]
            },
            {
                name: "sample-page",
                url: "https://wordpress-235162-1019977.cloudwaysapps.com/sample-page/",
                elementsToScreenshot: ['body'],
                elementsToRemove: [],
                customTestsConfig: [
                    {
                        path: "has-matching-title",
                        expectedValue: "Sample Page – Demo Puppeteer"
                    },
                    {
                        path: "has-only-one-h1"
                    },
                    {
                        path: "loads-in-less-than",
                        expectedValue: 2.0,
                        args: {
                            loadEvent: "load"
                        }
                    }
                ]
            },
            {
                name: "blog",
                url: "https://wordpress-235162-1019977.cloudwaysapps.com/blog/",
                elementsToScreenshot: ['body'],
                elementsToRemove: [],
                customTestsConfig: [
                    {
                        path: "has-matching-title",
                        expectedValue: "Blog – Demo Puppeteer"
                    },
                    {
                        path: "has-only-one-h1"
                    },
                    {
                        path: "loads-in-less-than",
                        expectedValue: 2.0,
                        args: {
                            loadEvent: "load"
                        }
                    }
                ]
            },
            {
                name: "welcome-to-cloudways",
                url: "https://wordpress-235162-1019977.cloudwaysapps.com/uncategorized/welcome-to-cloudways/",
                elementsToScreenshot: ['body'],
                elementsToRemove: [],
                customTestsConfig: [
                    {
                        path: "has-matching-title",
                        expectedValue: "Some Useful Links for You to Get Started – Demo Puppeteer"
                    },
                    {
                        path: "has-only-one-h1"
                    },
                    {
                        path: "loads-in-less-than",
                        expectedValue: 2.0,
                        args: {
                            loadEvent: "load"
                        }
                    }
                ]
            },
        ]
    }
];