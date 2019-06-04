# Kubernetes Showcase

> Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Dependencies
### Material Design Lite (https://getmdl.io/)
```javascript
  // (not working) yarn add material-design-lite --dev
  head: {
    title: 'Demo',
    ...
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'stylesheet', href: 'https://code.getmdl.io/1.3.0/material.indigo-pink.min.css' },
      { rel: 'stylesheet', type: 'text/css',  href: 'http://fonts.googleapis.com/css?family=Roboto:300,400,500,700' }
    ],
    script: [
      { src: 'https://code.getmdl.io/1.3.0/material.min.js' }
    ]
  },
```

### Axios - HTTP client (https://www.npmjs.com/package/axios)
```bash
$ yarn add axios --dev
```

### Kubernetes Client (https://github.com/kubernetes-client/javascript)
* Support to load ServiceAccount and KUBECONFIG
```bash
$ yarn add @kubernetes/client-node --dev
```
```javascript
  serverMiddleware: [
    '~/api/common.js',
    { path: '/api/k8s', handler: '~/api/k8s.js' },
  ],
```
