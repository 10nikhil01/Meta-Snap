// next.config.js
import { withPWA } from "next-pwa";
import runtimeCaching from "next-pwa/cache.js";

const isProd = process.env.NODE_ENV === "production";

export default withPWA({
  pwa: {
    dest: "public",
    disable: !isProd,
    runtimeCaching,
  },
});
