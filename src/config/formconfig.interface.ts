interface FormConfig {
    selector: string;
    fields: any;
    submit_button: {
        selector: string
    },
    success_message: {
        selector: string,
        message: string
    }
}

export { FormConfig };