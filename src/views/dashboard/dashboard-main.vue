<template>
  <div class="wrapper">
    <div class="main-panel">
      <div class="content">
        <div class="row">
          <div class="col-12">
            <dashboard-prometheus-cpu/>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4">
            <dashboard-jvm-cpu
              :value="cpuVal"
            />
          </div>
          <div class="col-lg-4">
            <dashboard-jvm-memory-size
              :value="memorySize"
            />
          </div>
          <div class="col-lg-4">
            <dashboard-jvm-memory-total
              :value="memoryTotal"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-8">
            <dashboard-prometheus-metrics/>
          </div>
          <div class="col-lg-4">
            <dashboard-jvm-metrics/>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <!-- sample data -->
<!--            <dashboard-log/>-->
            <!-- // sample data -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dashboardPrometheusCpu from "@/views/dashboard/components/dashboard-prometheus-cpu";
import dashboardJvmCpu from "@/views/dashboard/components/dashboard-jvm-cpu";
import dashboardJvmMemorySize from "@/views/dashboard/components/dashboard-jvm-memory-size";
import dashboardJvmMemoryTotal from "@/views/dashboard/components/dashboard-jvm-memory-total";
import dashboardJvmMetrics from "@/views/dashboard/components/dashboard-jvm-metrics";
import dashboardPrometheusMetrics from "@/views/dashboard/components/dashboard-prometheus-metrics";
import dashboardLog from "@/views/dashboard/components/dashboard-log";
import Stomp from 'webstomp-client';
import SockJS from 'sockjs-client';

export default {
  components: {
    dashboardPrometheusCpu,
    dashboardJvmMetrics,
    dashboardLog,
    dashboardPrometheusMetrics,
    dashboardJvmCpu,
    dashboardJvmMemorySize,
    dashboardJvmMemoryTotal
  },
  data() {
    return {
      cpuVal: 0,
      memorySize: 0,
      memoryTotal: 0,
    }
  },
  created() {
    // ?????? ??????
    this.connect();
    setInterval(this.send, 5000);
  },
  methods: {
    connect() {
      const serverURL = "http://34.125.40.125:8082";
      let socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);

      console.log(`?????? ????????? ???????????????. ?????? ??????: ${serverURL}`)

      this.stompClient.connect({}, frame => {
          // ?????? ?????? ??????
          this.connected = true;

          console.log('?????? ?????? ??????', frame);

          // ????????? ????????? ?????? endpoint??? ???????????????.(pub/sub ??????)
          this.stompClient.subscribe("/send", res => {
            const obj = JSON.parse(res.body);
            this.cpuVal = obj.cpuVal;
            this.memorySize = obj.memorySize;
            this.memoryTotal = obj.memoryTotal;
          });
        },
        error => {
          // ?????? ?????? ??????
          console.log('?????? ?????? ??????', error);
          this.connected = false;
        }
      );
    },

    send() {
      console.log("Send message:" + this.message);
      if (this.stompClient && this.stompClient.connected) {
        const msg = {
          userName: this.userName,
          content: this.message
        };
        this.stompClient.send("/receive", JSON.stringify(msg), {});
      }
    },
  }
};
</script>
