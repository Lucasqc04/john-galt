export const ROUTES = {
  lang: {
    call: () => '/:lang',
  },
  home: {
    call: () => '/',
  },
  blog: {
    path: 'blog/:id',
    call: (id: string) => `/blog/${id}`,
    callLang: (currentLang: string, id: string) => `/${currentLang}/blog/${id}`,
  },
  about: {
    path: 'sobre-nos',
    call: (currentLang: string) => `/${currentLang}/sobre-nos`,
  },
  product: {
    path: 'produto',
  },
  products: {
    path: 'produtos',
    BITKIK: {
      call: (currentLang: string) => `/${currentLang}/bitkit`,
    },
    SEEDKIT: {
      call: (currentLang: string) => `/${currentLang}/seedkit`,
    },
    BITMASTER: {
      call: (currentLang: string) => `/${currentLang}/bitkit`,
    },
  },
};
