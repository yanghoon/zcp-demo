<template>
  <div>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--1-col">
        <h4>Pods</h4>
      </div>
      <div class="mdl-cell mdl-cell--11-col h4">

        <div class="mdl-selectfield mdl-js-selectfield">
          <select id="myselect" name="myselect" class="mdl-selectfield__select" v-model="selected">
            <option value=""></option>
            <option v-for="type in types" :key="type.limit" :value="type">{{type.core}} Core / {{type.mem}} GB</option>
          </select>
          <label class="mdl-selectfield__label" for="myselect">Container Spec.</label>
        </div>

        <button class="mdl-button mdl-js-button mdl-button--colored" @click="create_pod()">
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
            <th class="mdl-data-table__cell--non-numeric">Limits</th>
            <th class="mdl-data-table__cell--non-numeric">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pod, idx) in pods.items" :key="idx">
            <td class="mdl-data-table__cell--non-numeric">{{pod.metadata.namespace}}</td>
            <td class="mdl-data-table__cell--non-numeric">{{pod.metadata.name}}</td>
            <td class="mdl-data-table__cell--non-numeric">{{pod.status.phase}}</td>
            <td class="mdl-data-table__cell--non-numeric">
              {{pod.spec.containers[0].resources.limits && pod.spec.containers[0].resources.limits.memory || '-'}}
              {{pod.spec.containers[0].resources.limits && pod.spec.containers[0].resources.limits.core || '-'}}
            </td>
            <!-- <td><a v-bind:href="https://pog-dev-monitoring.cloudzcp.io"></a></td> -->
            <td>
              <a v-bind:href="link_usage(pod)" target="_blank">
                <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored">
                  <i class="material-icons">assessment</i>
                </button>
              </a>
              <a v-bind:href="link_exec(pod)" target="_blank">
                <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" :disabled="!pod.metadata.name.startsWith('rstudio')">
                  <i class="material-icons">desktop_windows</i>
                </button>
              </a>
              <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" :disabled="!pod.metadata.name.startsWith('rstudio')">
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
      site: 'vup',
      namespace: 'zcp-demo',
      pods: {},
      types: [
        {mem:2, core:'1'},
        {mem:3, core:'1'},
        {mem:4, core:'1'},
      ],
      selected: 0,
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
        .then((res)=>{
          res.data.items = res.data.items.sort((p1, p2)=>{
            let ret = 0
            if( p1.metadata.name.startsWith('rstudio') ) ret--
            if( p2.metadata.name.startsWith('rstudio') ) ret++
            return ret
          })
          this.pods = res.data
        })
    },
    create_pod () {
      let {core, mem} = this.selected
      axios.post(`/api/k8s/pods?name=rstudio&ns=${this.namespace}&mem=${mem}&core=${core}`)
        .then((res)=>{
          console.log(res.data)
          this.update_pods()
        })
    },
    link_usage (pod) {
      let {namespace, name} = pod.metadata
      // return `https://${this.site}-monitoring.cloudzcp.io/d/GlXkUBGiz/kubernetes-pod-overview?var-namespace=${namespace}&var-pod=${name}`
      return `https://${this.site}-monitoring.cloudzcp.io/d/ZdrGSnnWz/showcase-dashboard?orgId=1&refresh=5s&from=now-30m&to=now`
    },
    link_exec (pod) {
      let {namespace, name} = pod.metadata
      // return `https://${this.site}-console.cloudzcp.io/index.html#/resources/workloads/pod?ns=${namespace}&keyword=${name}`
      return `https://rstudio.cloudzcp.io/`
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
  margin: 15px 0 15px;
}
</style>

