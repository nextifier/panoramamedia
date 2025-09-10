<template>
  <div class="@container flex flex-col gap-y-2 select-none">
    <nuxt-link
      :to="`/news/${post.slug}`"
      class="border-border relative flex aspect-16/10 items-center justify-center overflow-hidden rounded-lg border"
      @click="active = post.slug"
    >
      <div v-if="post.feature_image" class="relative size-full">
        <!-- NuxtImg dengan transisi fade-in -->
        <NuxtImg
          :src="post.feature_image"
          :alt="post.feature_image_alt ?? post.title"
          class="size-full object-cover transition-all"
          :class="['nuxt-img-transition', { 'nuxt-img-loaded': isImageLoaded }]"
          :style="imageStyle"
          loading="lazy"
          sizes="100vw sm:600px"
          width="479"
          height="269"
          format="webp"
          placeholder
          @load="onImageLoad"
        />

        <!-- Placeholder skeleton yang akan fade-out -->
        <div
          v-if="post.feature_image && !isImageLoaded"
          class="bg-muted absolute inset-0 animate-pulse transition-opacity duration-500"
          :class="{ 'opacity-0': isImageLoaded }"
        />
      </div>

      <Logo v-else class="text-primary w-[50%] opacity-50" />

      <div
        class="pointer-events-none absolute inset-x-0 bottom-0 flex h-20 w-full items-end justify-between px-3 pb-2.5 text-xs font-semibold tracking-tight select-none"
        :class="{
          'bg-linear-to-t from-black/60 to-transparent text-white':
            post.feature_image,
          '': !post.feature_image,
        }"
      >
        <span v-if="post.primary_tag" class="capitalize">
          {{ post.primary_tag.name }}
        </span>
        <span v-else></span>

        <span v-if="post.reading_time">
          <span class="font-normal"
            >{{ post.reading_time }} min<span v-if="post.reading_time > 1"
              >s</span
            >
            read
          </span>
        </span>
        <span v-else></span>
      </div>
    </nuxt-link>

    <div class="flex w-full flex-col items-start px-1">
      <nuxt-link
        :to="`/news/${post.slug}`"
        class="text-primary text-lg !leading-snug font-semibold tracking-[-0.04em] transition duration-300 lg:line-clamp-4 @sm:text-xl @lg:text-2xl"
        v-tippy="post.title"
        @click.native="active = post.slug"
        >{{ post.title }}</nuxt-link
      >

      <p
        v-if="
          useAppConfig()?.settings?.blog?.showPostCardExcerpt &&
          post.custom_excerpt
        "
        class="mt-2 text-sm tracking-tight"
      >
        {{ post.custom_excerpt }}
      </p>

      <div class="mt-2 flex w-full items-center justify-between gap-x-3">
        <div
          v-if="
            useAppConfig()?.settings?.blog?.showPostCardAuthor &&
            post.authors?.length
          "
          class="flex items-center gap-x-1.5 text-left"
        >
          <div class="flex shrink-0 -space-x-4">
            <nuxt-link
              v-for="(author, index) in post.authors"
              :key="index"
              :to="author.website ?? ''"
              target="_blank"
              class="relative rounded-full"
              :style="`z-index: ${post.authors.length - index}`"
            >
              <div
                class="border-border bg-muted flex size-9 items-center justify-center overflow-hidden rounded-full border"
              >
                <NuxtImg
                  v-if="author.profile_image"
                  :src="author.profile_image"
                  class="author-img-transition size-full object-cover"
                  width="36"
                  height="36"
                  sizes="36px"
                  loading="lazy"
                  format="webp"
                  @load="onAuthorImageLoad(index)"
                />
              </div>
            </nuxt-link>
          </div>

          <div class="flex flex-col gap-y-1">
            <div
              class="text-primary line-clamp-1 text-sm font-semibold tracking-tight"
            >
              <nuxt-link
                v-for="(author, index) in post.authors"
                :key="index"
                :to="author.website ?? ''"
                target="_blank"
                class="hover:underline"
              >
                {{ author.name
                }}<span v-if="index != Object.keys(post.authors).length - 1"
                  >,
                </span>
              </nuxt-link>
            </div>
          </div>
        </div>

        <span
          v-if="post.published_at"
          v-tippy="$dayjs(post.published_at).format('MMMM D, YYYY [at] h:mm A')"
          class="text-muted-foreground text-xs tracking-tight"
        >
          {{ $dayjs(post.published_at).fromNow() }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  post: Object,
});

const { $dayjs } = useNuxtApp();

const active = useState("active-post-slug", () => null);

const isImageLoaded = ref(false);
const authorImagesLoaded = ref({});

const onImageLoad = () => {
  isImageLoaded.value = true;
};

const onAuthorImageLoad = (index) => {
  authorImagesLoaded.value[index] = true;
};

// Reset state saat post berubah
watch(
  () => props.post?.slug,
  () => {
    isImageLoaded.value = false;
    authorImagesLoaded.value = {};
  },
);

const imageStyle = computed(() => {
  if (active.value === props.post.slug) {
    return { "view-transition-name": `post-feature-img-${props.post.slug}` };
  }
  return {};
});
</script>

<style scoped>
/* Transisi untuk gambar utama */
.nuxt-img-transition {
  opacity: 0;
  filter: blur(10px);
  transition:
    opacity 0.6s ease-out,
    filter 0.6s ease-out;
}

.nuxt-img-transition.nuxt-img-loaded {
  opacity: 1;
  filter: blur(0);
}

/* Transisi untuk gambar author */
.author-img-transition {
  animation: fadeInUp 0.4s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Optional: Shimmer effect untuk placeholder */
@keyframes shimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}

.shimmer-placeholder {
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: shimmer;
  animation-timing-function: linear;
  background: linear-gradient(to right, #f0f0f0 8%, #f8f8f8 18%, #f0f0f0 33%);
  background-size: 936px 104px;
}
</style>
