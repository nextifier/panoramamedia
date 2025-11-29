/**
 * Composable untuk memproses string HTML dari CMS.
 * Ia akan menemukan semua tag heading (h2-h6), memastikan mereka memiliki
 * ID yang unik, dan mengembalikannya sebagai computed property.
 *
 * PERBAIKAN SSR/CLIENT MISMATCH:
 * Menggunakan pendekatan regex yang konsisten untuk SSR dan client
 * untuk menghindari perbedaan output antara server dan client rendering.
 *
 * @param {import('vue').Ref<string>} htmlContent - Ref yang berisi string HTML mentah.
 */
export const useProcessedContent = (htmlContent) => {
  const createUniqueId = (text, index) => {
    const slug = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
    return `${slug}-${index}`;
  };

  /**
   * Process HTML using regex (works consistently in SSR and client)
   * This ensures the same output is produced regardless of environment
   */
  const processWithRegex = (rawHtml) => {
    if (!rawHtml) return "";

    let index = 0;
    // Regex untuk menemukan semua tag h2-h6
    // Using non-greedy match and handling multiline headings
    return rawHtml.replace(
      /<h([2-6])(\s[^>]*)?>([^]*?)<\/h\1>/gi,
      (match, level, attrs = "", innerText) => {
        // Extract clean text for ID generation
        const text = innerText.replace(/<[^>]+>/g, "").trim();
        const newId = createUniqueId(text, index++);

        // Remove existing ID attribute if present
        const cleanAttrs = attrs.replace(/\s*id="[^"]*"/i, "");

        // Return heading with new unique ID
        return `<h${level} id="${newId}"${cleanAttrs}>${innerText}</h${level}>`;
      },
    );
  };

  const processedHtml = computed(() => {
    // Always use regex for consistent SSR/client output
    return processWithRegex(htmlContent.value);
  });

  return { processedHtml };
};
