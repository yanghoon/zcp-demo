module.exports = {
  /*
   * Server Side Code
   * - https://github.com/nuxt/nuxt.js/issues/3271#issuecomment-396562409
   */
  serverMiddleware: [
    '~/api/common.js',
    { path: '/api/k8s', handler: '~/api/k8s.js' },
    { path: '/api/loads', handler: '~/api/loads.js' },
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: 'Demo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      // { rel: 'stylesheet', href: 'https://code.getmdl.io/1.3.0/material.indigo-blue.min.css' },
      // { rel: 'stylesheet', href: 'https://code.getmdl.io/1.3.0/material.pink-cyan.min.css' },
      { rel: 'stylesheet', href: 'https://rawgit.com/MEYVN-digital/mdl-selectfield/master/mdl-selectfield.min.css' },
      { rel: 'stylesheet', href: '/material.rally.min.css' },
      { rel: 'stylesheet', type: 'text/css',  href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700' },
    ],
    script: [
      { src: 'https://code.getmdl.io/1.3.0/material.min.js' },
      { src: 'https://rawgit.com/MEYVN-digital/mdl-selectfield/master/mdl-selectfield.min.js' }
    ]
  },
  // css: [
  //   'material-design-lite/material.min.css'
  // ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: [
      'axios',
      '@kubernetes/client-node'
    ],
    watch: ['api']  // https://github.com/nuxt/nuxt.js/issues/1819#issuecomment-335565769
  }
}

