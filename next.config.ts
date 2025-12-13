import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
};

module.exports = {
    reactStrictMode: true,
    env: {
        BASE_URL: process.env.BASE_URL,
        API_KEY: process.env.API_KEY,
        AUTH_DOMAIN: process.env.AUTH_DOMAIN,
        PROJECT_ID: process.env.PROJECT_ID,
        STORAGE_BUCKET: process.env.STORAGE_BUCKET,
        MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
        APP_ID: process.env.APP_ID,
        MEASUREMENT_ID: process.env.MEASUREMENT_ID,
        PUB_KEY_URL: process.env.PUB_KEY_URL,
        TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
        TURSON_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
        RESEND_KEY: process.env.RESEND_KEY,
    }
}

export default nextConfig;
