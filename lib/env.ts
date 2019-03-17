export function isBrowser() {
    return !!process.browser;
}

export function isProduction() {
    return process.env.NODE_ENV === "production";
}

export function serverPort() {
    return parseInt(process.env.PORT || "3000", 10);
}
