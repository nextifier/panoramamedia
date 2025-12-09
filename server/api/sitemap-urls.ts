import { defineSitemapEventHandler } from "#imports";

interface BlogPost {
  slug: string;
  updated_at: string;
}

interface BlogResponse {
  data: BlogPost[];
}

export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig();

  try {
    const response = await $fetch<BlogResponse>(
      `${config.public.apiUrl}/api/public/blog/posts`,
      {
        headers: {
          "X-API-Key": config.pmOneApiKey,
          Accept: "application/json",
        },
        query: {
          per_page: 1000,
          sort: "-published_at",
          author: config.public.blogUsernames,
        },
      },
    );

    const posts = response.data.map((post) => ({
      loc: `/news/${post.slug}`,
      lastmod: post.updated_at,
    }));

    // Static pages
    // const staticPages = [
    //   { loc: "/", changefreq: "daily", priority: 1.0 },
    //   { loc: "/about", changefreq: "monthly", priority: 0.8 },
    //   { loc: "/book-space", changefreq: "monthly", priority: 0.8 },
    //   { loc: "/contact", changefreq: "monthly", priority: 0.7 },
    //   { loc: "/events", changefreq: "weekly", priority: 0.9 },
    //   { loc: "/faq", changefreq: "monthly", priority: 0.6 },
    //   { loc: "/home", changefreq: "daily", priority: 0.9 },
    //   { loc: "/news", changefreq: "daily", priority: 0.9 },
    //   { loc: "/products", changefreq: "weekly", priority: 0.8 },
    // ];

    return [
      // ...staticPages,
      ...posts,
    ];
  } catch (error) {
    console.error("Failed to fetch posts for sitemap:", error);
    // Throw error instead of returning empty array
    // This allows sitemap module to still include static routes
    throw error;
  }
});
