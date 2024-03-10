export const ENVIRONMENT: string = process.env.ENVIRONMENT || "local";
export const IS_PRODUCTION: boolean = ENVIRONMENT !== "local";
export const APP_PORT: number = Number(process.env.APP_PORT) || 3000;