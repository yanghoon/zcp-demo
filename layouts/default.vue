<template>
  <div class="demo-layout-waterfall mdl-layout mdl-js-layout mdl-layout--no-drawer-button">
    <header class="mdl-layout__header mdl-layout__header--waterfall">
      <!-- Top row, always visible -->
      <div class="mdl-layout__header-row">
        <!-- Title -->

        <span class="mdl-layout-title">
          Demo
        </span>

        <div class="mdl-layout-spacer"></div>

        <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable
                    mdl-textfield--floating-label mdl-textfield--align-right">
          <label class="mdl-button mdl-js-button mdl-button--icon" for="waterfall-exp">
            <i class="material-icons">search</i>
          </label>
          <div class="mdl-textfield__expandable-holder">
            <input class="mdl-textfield__input" type="text" name="sample" id="waterfall-exp">
          </div>
        </div>
      </div>
      <!-- Bottom row, not visible on scroll -->
      <div class="mdl-layout__header-row">
        <div class="mdl-layout-spacer"></div>
        <!-- Navigation -->
        <nav class="mdl-navigation">
          <a class="mdl-navigation__link" href="">
            <i class="material-icons">add</i>Create
          </a>
          <a class="mdl-navigation__link" href=""></a>
          <a class="mdl-navigation__link" href=""></a>
          <a class="mdl-navigation__link" href=""></a>
        </nav>
      </div>
    </header>
    <main class="mdl-layout__content">
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

<style>
</style>

