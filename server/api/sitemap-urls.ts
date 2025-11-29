import { asSitemapUrl, defineSitemapEventHandler } from "#imports";

export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig();

  // Fetch posts from PM One API with API key (server-side only)
  const posts = await $fetch<ReturnType<typeof asSitemapUrl>>(
    `${config.public.pmOneApiUrl}/api/public/blog/posts`,
    {
      headers: {
        "X-API-Key": config.pmOneApiKey, // Private - not exposed to browser
        Accept: "application/json",
      },
      query: {
        per_page: 1000,
        sort: "-published_at", // Sort descending
        author: config.public.blogUsernames,
      },
    },
  ).then((res) => {
    return res.data.map((post) => {
      return {
        loc: `/news/${post.slug}`,
        lastmod: post.updated_at,
      };
    });
  });

  // const brands = await $fetch<ReturnType<typeof asSitemapUrl>>(
  //   `${useAppConfig().app.apiUrl}/api/exhibitors?filter[is_published]=1`,
  // ).then((res) => {
  //   return res.map((brand) => {
  //     return {
  //       loc: `/brands/${brand.slug}`,
  //       lastmod: brand.updated_at,
  //     };
  //   });
  // });

  return [
    ...posts,
    // ...brands
  ];
});
