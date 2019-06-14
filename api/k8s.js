/*
 * References
 * - https://nuxtjs.org/api/configuration-servermiddleware
 */
// const k8s = require('@kubernetes/client-node')
import * as k8s from '@kubernetes/client-node'
import yaml from 'yaml'
import { ApiKeyAuth } from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const Core = kc.makeApiClient(k8s.Core_v1Api);
const App = kc.makeApiClient(k8s.Apps_v1Api);

export default function (req, res, next) {
  let {$query} = req
  let ns = $query.ns || "default"

  if (req.method == 'POST') {
    Core.listNamespacedPod(ns)
      .then(({body}) => {
        // TODO: count rsdutio instance count
        let seq = body.items.filter((pod)=>pod.metadata.name.startsWith('rstudio-')).length
        let user = `user${seq + 1}`
        let name = `rstudio-${user}`
        let spec =
`apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${name}
  namespace: ${ns}
  labels:
    app: ${name}
    context: ${user}
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ${name}
      context: ${user}
  template:
    metadata:
      labels:
        app: ${name}
        context: ${user}
        showcase: 'true'
    spec:
      containers:
      - name: rstudio
        image: vup-registry.cloudzcp.io/ski/rstudio:latest
        imagePullPolicy: IfNotPresent
        command: ["/bin/bash", "-c", "useradd cloudzcp-admin && echo 'cloudzcp-admin:admin' | chpasswd && exec /usr/lib/rstudio-server/bin/rserver --server-daemonize 0"]
        env:
        - name: PASSWORD
          value: ${user}!
        ports:
        - name: rstudio
          containerPort: 8787
        resources:
          requests:
            cpu: "${$query.core}"
            memory: ${$query.mem}Gi
          limits:
            cpu: "${$query.core}"
            memory: ${$query.mem}Gi
      serviceAccount: zcp-system-admin`

        let deploy = yaml.parse(spec)
        console.log(deploy)
        App.createNamespacedDeployment(ns, deploy)
          .then(({body}) => {
            console.log(body)
            res.statusCode = body.code || 201
            res.write(JSON.stringify(Object.assign({}, body, {seq})))
            res.end()
          })
      })
  } else if (req.method == 'DELETE') {
    App.deleteNamespacedDeployment($query.deploy, ns)
      .then(({body}) => {
        console.log(body)
        res.write(JSON.stringify(body))
        res.end()
      })
  } else {
    Core.listNamespacedPod($query.ns || 'default')
      .then(({body}) => {
        console.log(`${req.url}: ${body.items.length} item(s).`);
        res.write(JSON.stringify(body))
        res.end()
      })
  }
}