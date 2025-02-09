export const ROUTES = {
  lang: {
    call: () => '/:lang',
  },
  home: {
    call: () => '/',
  },
  checkout: {
    path: '',
    call: (currentLang: string) => `/${currentLang}`,
  },
  buyCheckout: {
    path: 'buy-checkout',
    call: (currentLang: string) => `/${currentLang}/buy-checkout`,
  },
  checkoutPix: {
    path: 'checkout-pix',
    call: (currentLang: string) => `/${currentLang}/checkout-pix`,
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
  Support: {
    path: 'suporte',
    call: (currentLang: string) => `/${currentLang}/suporte`,
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
  },

  paymentAlfredStatus: {
    failure: {
      path: 'failure-alfred',
      call: (currentLang: string) => `/${currentLang}/failure-alfred`,
    },
    success: {
      path: 'success-alfred',
      call: (currentLang: string) => `/${currentLang}/success-alfred`,
    },
  },
};
