<template>
  <div class="min-h-screen-offset container max-w-lg pt-6 pb-16">
    <ContactForm
      :title="content.title"
      :description="content.description"
      :showJobTitle="useAppConfig().settings.bookSpaceForm.showJobTitle"
      :showBrandName="useAppConfig().settings.bookSpaceForm.showBrandName"
      :showProducts="useAppConfig().settings.bookSpaceForm.showProducts"
      :showMessage="false"
      submitLabel="Submit"
      :subject="`Exhibitor Registration - ${useAppConfig().app.shortName}`"
      :productOptions="[
        'Artist Alley',
        'Toys',
        'Games',
        'Fashion',
        'Cosplayer',
        'Animation Studio',
        'TV/Movie',
        'Food and Beverage',
        'Other',
      ]"
    />
  </div>
</template>

<script setup>
usePageMeta("bookSpace");
const content = useContentStore().components.bookSpace;
</script>
