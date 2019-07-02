<template>
  <div class="scenario">
    <h6>ROLLING UPDATE</h6>
    <div class="content">
      롤링 업데이트는 파드 인스턴스를 점진적으로 새로운 것으로 업데이트하여 디플로이먼트 업데이트가 서비스 중단 없이 이루어질 수 있도록 해준다.
      <br/>
      사용자들은 애플리케이션이 항상 가용한 상태일 것이라 여기고 개발자들은 하루에 여러번씩 새로운 버전을 배포하도록 요구 받고있다. 쿠버네티스에서는 이것을 롤링 업데이트를 통해 이루고 있다.
      롤링 업데이트는 파드 인스턴스를 점진적으로 새로운 것으로 업데이트하여 디플로이먼트 업데이트가 서비스 중단 없이 이루어질 수 있도록 해준다. 새로운 파드는 가용한 자원을 보유한 노드로 스케줄될 것이다.
      이전 모듈에서 여러 개의 인스턴스를 동작시키도록 애플리케이션을 스케일했다. 이것은 애플리케이션의 가용성에 영향을 미치지 않으면서 업데이트를 수행하는 것에 대한 요구이다. 기본적으로, 업데이트가 이루어지는 동안 이용 불가한 파드의 최대 개수와 생성 가능한 새로운 파드의 최대 개수는 하나다. 두 옵션은 (파드에 대한) 개수 또는 백분율로 구성될 수 있다.
      쿠버네티스에서, 업데이트는 버전으로 관리되고 어떠한 디플로이먼트 업데이트라도 이전의 (안정적인) 버전으로 원복이 가능하다.
      <br/>
      <a href="https://kubernetes.io/ko/docs/tutorials/kubernetes-basics/update/update-intro/">Rolling Update - Kubernetes Docs</a>
    </div>

    <h6>AUTO SCALE-OUT/IN</h6>
      <div class="content">
        Horizontal Pod Autoscaler는 CPU 사용량 (또는 사용자 정의 메트릭, 아니면 다른 애플리케이션 지원 메트릭)을 관찰하여 레플리케이션 컨트롤러, 디플로이먼트 또는 레플리카 셋의 파드 개수를 자동으로 스케일한다.
        Horizontal Pod Autoscaler는 크기를 조정할 수 없는 오브젝트(예: 데몬 셋)에는 적용되지 않는다. Horizontal Pod Autoscaler는 쿠버네티스 API 리소스 및 컨트롤러로 구현된다.
        리소스는 컨트롤러의 동작을 결정한다. 컨트롤러는 관찰된 평균 CPU 사용률이 사용자가 지정한 대상과 일치하도록 레플리케이션 컨트롤러 또는 디플로이먼트에서 레플리카 개수를 주기적으로 조정한다.
        <br/>
        원하는 레플리카 수 = ceil[현재 레플리카 수 * ( 현재 메트릭 값 / 원하는 메트릭 값 )]
        <br/>
        <a href="https://kubernetes.io/ko/docs/tasks/run-application/horizontal-pod-autoscale/">Horizontal Pod Autoscaler - Kubernetes Docs</a>
    </div>

    <h6>MONITORING RESOURCE USAGE</h6>
    <div class="content">
      쿠버네티스 클러스터의 안정적인 운영과 효율적인 리소스 사용을 위해, 모니터링 시스템 구축이 필요합니다. 아래의 여러 메트릭 수집기과 시계열 데이터베이스, 시각화 도구를 조합하여,
      클러스터를 효율적으로 모니터링 할 수 있습니다. 이러한 모니터링 시스템은 여러 컨테이너에 의해 공유되는 리소스에 대한 추이와 분배에 도움을 줍니다.
      <br/>
      <br/>
      - Kubelet
      <br/>
      Kubernetes 마스터와 노드 사이의 다리 역할을합니다. 시스템에서 실행되는 포드 및 컨테이너를 관리합니다.
      Kubelet은 각 포드를 구성 컨테이너로 변환하고 컨테이너 런타임 인터페이스를 통해 컨테이너 런타임에서 개별 컨테이너 사용 통계를 가져옵니다.
      <br/>
      - cAdvisor
      <br/>
      오픈 소스 컨테이너 리소스 사용 및 성능 분석 에이전트입니다. 컨테이너 전용으로 설계되었으며 Docker 컨테이너를 기본적으로 지원합니다. cAdvisor는 시스템의 모든 컨테이너를 자동으로 검색하고 CPU, 메모리, 파일 시스템 및 네트워크 사용 통계를 수집합니다.
      <br/>
      - Prometheus
      <br/>
      kubernetes, 노드 및 prometheus 자체를 기본적으로 모니터링 할 수 있습니다. Prometheus는 강력한 쿼리 언어와 데이터 쿼리 및 시각화를위한 내장 된 대시 보드를 제공합니다. 또한 Prometheus는 Grafana 의 지원 데이터 소스입니다.
      <br/>
      <a href="https://kubernetes.io/docs/tasks/debug-application-cluster/resource-usage-monitoring/#">Tools for Monitoring Resources - Kubernetest Docs</a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: 'body'
    }
  },
}
</script>

<style>
.scenario {
  color: #757575 !important;
  padding: 20px;
}

h6 {
  font-weight: 700;
}

.content {
  font-size: 13px;
}
</style>

