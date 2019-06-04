# Setup Nuxt
Guides : https://ko.nuxtjs.org/guide/installation

## Mac
``bash
# Upgrade NodeJS
$ node -v
v8.11.4
$ sudo npm cache clean -f
$ sudo npm install -g n
$ sudo ~/.npm-global/bin/n stable
$ node -v
v10.16.0
```

```bash
# (not working)
# sudo npm install -g @vue/cli @vue/cli-init --unsafe-perm
$ sudo yarn global add @vue/cli @vue/cli-init
Password:
yarn global v1.9.4
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 📃  Building fresh packages...
success Installed "@vue/cli@3.8.2" with binaries:
      - vue
warning "@vue/cli-init@3.8.0" has no binaries
✨  Done in 4.23s.

$ ~/.npm-global/bin/vue -V
3.8.2
$ ~/.npm-global/bin/vue init nuxt-community/starter-template zcp-demo

? Target directory exists. Continue? Yes
? Project name zcp-demo
? Project description Nuxt.js project
? Author yanghoon5@gmail.com

   vue-cli · Generated "zcp-demo".

   To get started:
   
     cd zcp-demo
     npm install # Or yarn
     npm run dev
```