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
  buyBitcoin: {
    path: 'buy-bitcoin',
    call: (currentLang: string) => `/${currentLang}/buy-bitcoin`,
  },
  buyCheckout: {
    path: 'buy-checkout',
    call: (currentLang: string) => `/${currentLang}/buy-checkout`,
  },
  aboutBitcoin: {
    path: 'about-buy-bitcoin',
    call: (currentLang: string) => `/${currentLang}/about-buy-bitcoin`,
  },
  fee: {
    path: 'fee',
    call: (currentLang: string) => `/${currentLang}/fee`,
  },
  term: {
    path: 'terms',
    call: (currentLang: string) => `/${currentLang}/terms`,
  },
  tutorials: {
    path: 'tutoriais',
    call: (currentLang: string) => `/${currentLang}/tutoriais`,
  },
  videos: {
    path: 'videos',
    call: (currentLang: string) => `/${currentLang}/videos`,
  },
  about: {
    path: 'sobre-nos',
    call: (currentLang: string) => `/${currentLang}/sobre-nos`,
  },
  Support: {
    path: 'suporte',
    call: (currentLang: string) => `/${currentLang}/suporte`,
  },
  product: {
    call: (currentLang: string, id: string) => `/${currentLang}/produto/${id}`,
  },
  cart: {
    path: 'carrinho',
    call: (currentLang: string) => `/${currentLang}/carrinho`,
    checkout: {
      path: 'checkout',
      call: (currentLang: string) => `/${currentLang}/checkout`,
    },
    pixPayment: {
      path: 'pixPayment',
      call: (currentLang: string) => `/${currentLang}/pixPayment`,
    },
    BTCPayment: {
      path: 'BTCPayment',
      call: (currentLang: string) => `/${currentLang}/BTCPayment`,
    },
    product: {
      path: 'produto/:name',
      call: (currentLang: string, name: string, id: string = '1') =>
        `/${currentLang}/produto/${name}?id=${id}`,
    },
    products: {
      path: 'produtos',
      BITKIT: {
        call: (currentLang: string, id: string = '1') =>
          `/${currentLang}/produto/${id}`,
      },
      SEEDKIT: {
        call: (currentLang: string, id: string = '2') =>
          `/${currentLang}/produto/${id}`,
      },
    },
  },
  products: {
    call: (currentLang: string) => `/${currentLang}/produtos`,
  },
  policyPrivacy: {
    path: 'politica-de-privacidade',
    call: (currentLang: string) => `/${currentLang}/politica-de-privacidade`,
  },
  paymentStatus: {
    failure: {
      path: 'failure',
      call: (currentLang: string) => `/${currentLang}/failure`,
    },
    success: {
      path: 'success',
      call: (currentLang: string) => `/${currentLang}/success`,
    },
  },
};
