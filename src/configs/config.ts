export const ENVIRONMENT: string = process.env.ENVIRONMENT || "local";
export const IS_PRODUCTION: boolean = ENVIRONMENT !== "local";
export const DB_URI: string =
  process.env.DB_URI ||
  "mongodb://localhost:27017/target-academy";
export const APP_PORT: number = Number(process.env.APP_PORT) || 3000;