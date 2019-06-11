/*
 * References
 * - https://nuxtjs.org/api/configuration-servermiddleware
 */
// const k8s = require('@kubernetes/client-node')
import * as k8s from '@kubernetes/client-node'

const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.Core_v1Api);

export default function (req, res, next) {
  let {$query} = req
  k8sApi.listNamespacedPod($query.ns || 'default')
    .then(({body}) => {
      console.log(`${req.url}: ${body.items.length} item(s).`);
      res.write(JSON.stringify(body))
      res.end()
    })
}