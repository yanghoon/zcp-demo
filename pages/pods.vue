<template>
  <div>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--1-col">
        <h4>Pods</h4>
      </div>
      <div class="mdl-cell mdl-cell--11-col h4">
        <button class="mdl-button mdl-js-button mdl-button--colored">
          <i class="material-icons">add</i>
          Create
        </button>

        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" @click="update_pods()">
          <i class="material-icons">refresh</i>
        </button>

        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" @click="showDialog(true)">
          <i class="material-icons">settings</i>
        </button>
      </div>
    </div>

    <div class="mdl-cell mdl-cell--12-col">
      <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp center table">
        <thead>
          <tr>
            <th class="mdl-data-table__cell--non-numeric">Namespace</th>
            <th class="mdl-data-table__cell--non-numeric">Pod</th>
            <th class="mdl-data-table__cell--non-numeric">Status</th>
            <th class="mdl-data-table__cell--non-numeric">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pod in pods.items" :key="pod.metadata.name">
            <td class="mdl-data-table__cell--non-numeric">{{pod.metadata.namespace}}</td>
            <td class="mdl-data-table__cell--non-numeric">{{pod.metadata.name}}</td>
            <td class="mdl-data-table__cell--non-numeric">{{pod.status.phase}}</td>
            <!-- <td><a v-bind:href="https://pog-dev-monitoring.cloudzcp.io"></a></td> -->
            <td>
              <a v-bind:href="link_usage(pod)" target="_blank">
                <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored">
                  <i class="material-icons">assessment</i>
                </button>
              </a>
              <a v-bind:href="link_exec(pod)" target="_blank">
                <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored">
                  <i class="material-icons">desktop_windows</i>
                </button>
              </a>
              <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" disabled>
                <i class="material-icons">delete</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <dialog class="mdl-dialog center dialog" ref="dialog">
      <h4 class="mdl-dialog__title">Settings</h4>
      <div class="mdl-dialog__content">
        <form action="#">
          <div class="mdl-textfield mdl-js-textfield is-dirty">
            <input class="mdl-textfield__input" type="text" v-model="site">
            <label class="mdl-textfield__label" for="sample1">Site</label>
          </div>
          <div class="mdl-textfield mdl-js-textfield is-dirty">
            <input class="mdl-textfield__input" type="text" v-model="namespace">
            <label class="mdl-textfield__label" for="sample1">Site</label>
          </div>
        </form>
      </div>
      <div class="mdl-dialog__actions">
        <button type="button" class="mdl-button close" @click="showDialog(false)">Close</button>
      </div>
    </dialog>
  </div>
</template>

<script>
// import AppLogo from '~/components/AppLogo.vue'
import axios from 'axios'

export default {
  // components: {}
  data () {
    return {
      site: 'pog-dev',
      namespace: 'zcp-system',
      pods: {},
      refresh: 5
    }
  },
  created () {
    this.update_pods()
  },
  mounted () {
    if (!this.$refs.dialog.showModal) {
      dialogPolyfill.registerDialog(this.$refs.dialog);
    }
  },
  methods: {
    update_pods () {
      this.pods = []
      axios.get(`/api/k8s/pods?ns=${this.namespace}`)
        .then((res)=>this.pods = res.data)
    },
    link_usage (pod) {
      let {namespace, name} = pod.metadata
      return `https://${this.site}-monitoring.cloudzcp.io/d/GlXkUBGiz/kubernetes-pod-overview?var-namespace=${namespace}&var-pod=${name}`
    },
    link_exec (pod) {
      let {namespace, name} = pod.metadata
      return `https://${this.site}-console.cloudzcp.io/index.html#/resources/workloads/pod?ns=${namespace}&keyword=${name}`
    },
    showDialog (show) {
      if (show) {
        this.$refs.dialog.showModal();
      } else {
        this.$refs.dialog.close();
        this.update_pods()
      }
    }
  }
}
</script>

<style>
.center {
  margin: 0 auto;
}
.table {
  width: 100%;
}
.dialog {
  min-width: 60%;
}
.h4 {
  margin: 32px 0 15px;
}
</style>

