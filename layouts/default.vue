<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--no-drawer-button">
    <header class="mdl-layout__header">
      <!-- Title -->
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">Showcase</span>
        &nbsp;
        <i class="material-icons">movie</i>
      </div>
      <!-- Tabs -->
      <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
        <a href="#scenario" class="mdl-layout__tab is-active" @click="changeTab">Scenario</a>
        <a href="#pods" class="mdl-layout__tab" @click="changeTab">Kubernetes</a>
        <!-- 
        <a href="#scroll-tab-3" class="mdl-layout__tab">Tab 3</a>
        <a href="#scroll-tab-4" class="mdl-layout__tab">Tab 4</a>
        <a href="#scroll-tab-5" class="mdl-layout__tab">Tab 5</a>
        <a href="#scroll-tab-6" class="mdl-layout__tab">Tab 6</a>
        -->
      </div>
    </header>
    <main class="mdl-layout__content">
      <section class="mdl-layout__tab-panel" id="pods"> </section>
      <section class="mdl-layout__tab-panel" id="scenario"> </section>

      <div class="page-content">
        <!-- Your content goes here -->
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--middle mdl-cell--12-col">
            <nuxt/>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  methods: {
    changeTab (e) {
      // location.pathname = e.target.parentElement.getAttribute('href').replace('#', '/');
      let hash = e.target.parentElement.getAttribute('href') || '#scenario';
      this.$router.push({path: hash.replace('#', '/')})
    }
  }
}
</script>

<style>
.page-content{
  /* background-color: rgb(250, 250, 250); */
}
.mdl-layout-title i {

}
</style>

