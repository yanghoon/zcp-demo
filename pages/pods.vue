<template>
<table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
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
      pods: {}
    }
  },
  created () {
    axios.get(`/api/k8s/pods?ns=${this.namespace}`)
      .then((res)=>this.pods = res.data)
  },
  methods: {
    link_usage (pod) {
      let {namespace, name} = pod.metadata
      return `https://${this.site}-monitoring.cloudzcp.io/d/GlXkUBGiz/kubernetes-pod-overview?var-namespace=${namespace}&var-pod=${name}`
    },
    link_exec (pod) {
      let {namespace, name} = pod.metadata
      return `https://${this.site}-console.cloudzcp.io/index.html#/resources/workloads/pod?ns=${namespace}&keyword=${name}`
    }
  }
}
</script>

<style>
.mdl-data-table {
  margin: 0 auto;
}
</style>

