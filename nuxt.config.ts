import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devtools: {
    enabled: true,
    componentInspector: false,
  },

  runtimeConfig: {
    pmOneApiKey:
      process.env.NUXT_PM_ONE_API_KEY ||
      "pk_JOtzJkN8cYc6DjxAVDsGX1VCmBcU1lRZrk8LnXiK",

    public: {
      siteUrl:
        process.env.NODE_ENV === "production"
          ? "https://panoramamedia.co.id"
          : "http://localhost:3000",
      apiUrl:
        process.env.NODE_ENV === "production"
          ? "https://api.pmone.id"
          : "http://localhost:8000",
      blogUsernames:
        "megabuild.blog,flei.blog,morefood.blog,icc.blog,inacon.blog,ioe.blog,pe.blog,cafe.blog",
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      ignore: ["/news", "/news/**"],
    },
  },

  routeRules: {
    "/blog/**": { redirect: "/news/**" },
  },

  app: {
    head: {
      title: "Panorama Media",
      meta: [{ name: "google", content: "notranslate" }],
      htmlAttrs: {
        lang: "en",
        translate: "no",
      },
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/icons/apple-touch-icon.png",
        },
      ],
      script: [],
    },
  },

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "shadcn-nuxt",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/seo",
    "nuxt-gtag",
    "@formkit/auto-animate/nuxt",
  ],

  fonts: {
    provider: "local",
    families: [
      {
        name: "MinusOne",
        src: "/fonts/MinusOne-VF.woff2",
        weight: "100 1000",
        display: "swap",
      },
    ],
  },

  icon: {
    mode: "svg",
    clientBundle: {
      scan: true,
    },
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./app/components/ui",
  },

  colorMode: {
    preference: "light", //system, light, dark
    fallback: "light",
    classSuffix: "",
    hid: "color-mode-script",
    globalName: "__COLOR_MODE__",
    storageKey: "color-mode",
  },

  image: {
    provider: process.env.NODE_ENV === "production" ? "ipxStatic" : "ipx",
    // provider: process.env.NODE_ENV === "production" ? "cloudflare" : "ipx",
    // cloudflare: {
    //   baseURL: "https://morefoodexpo.com",
    // },
    quality: 85,
    format: ["webp"],
    // domains: ["blog.levenium.com"],
  },

  site: {
    name: "Panorama Media",
    url:
      process.env.NODE_ENV === "production"
        ? "https://panoramamedia.co.id"
        : "http://localhost:3000",
  },

  robots: {
    disallow: ["/terms", "/privacy", "/winner"],
  },

  sitemap: {
    sources: ["/api/sitemap-urls"],
    autoLastmod: true,
    discoverImages: false,
    excludeAppSources: [],
  },

  schemaOrg: {
    enabled: false,
  },

  linkChecker: {
    enabled: false,
  },

  gtag: {
    loadingStrategy: "defer",
    tags: [
      {
        id: "G-4ZNWF3G5DM",
      },
    ],
  },

  compatibilityDate: "2025-05-01",

  experimental: {
    viewTransition: true,
  },
});
