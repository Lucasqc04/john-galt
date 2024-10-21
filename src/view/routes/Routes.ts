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
  cart: {
    path: 'carrinho',
    call: (currentLang: string) => `/${currentLang}/carrinho`,
  },
  product: {
    path: 'produto/:id',
    call: (currentLang: string, id: string = '1') =>
      `/${currentLang}/produto/${id}`,
  },
  products: {
    path: 'produtos',
    BITKIT: {
      call: (currentLang: string, id: string = '1') =>
        `/${currentLang}/produto/${id}`,
    },
    SEEDKIT: {
      call: (currentLang: string, id: string = '3') =>
        `/${currentLang}/produto/${id}`,
    },
  },
};
