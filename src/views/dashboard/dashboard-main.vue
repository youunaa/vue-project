<template>
  <div class="wrapper">
    <div class="main-panel">
      <div class="content">
        <div class="row">
          <div class="col-12">
            <!-- total -->
            <dashboard-total />
            <!-- //total -->
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4">
            <dashboard-cpu
              :value="cpuVal"
            />
          </div>
          <div class="col-lg-4">
            <dashboard-memory-size
              :value="memorySize"
            />
          </div>
          <div class="col-lg-4">
            <dashboard-memory-total
              :value="memoryTotal"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <!-- noti -->
            <dashboard-noti />
            <!-- // noti -->
          </div>
          <div class="col-lg-6">
            <!-- Daily Sales -->
            <dashboard-daily />
            <!-- // Daily Sales -->
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <!-- sample data -->
            <dashboard-log />
            <!-- // sample data -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dashboardTotal from "@/views/dashboard/components/dashboard-total";
import dashboardNoti from "@/views/dashboard/components/dashboard-noti";
import dashboardDaily from "@/views/dashboard/components/dashboard-daily";
import dashboardCpu from "@/views/dashboard/components/dashboard-cpu";
import dashboardMemorySize from "@/views/dashboard/components/dashboard-memory-size";
import dashboardMemoryTotal from "@/views/dashboard/components/dashboard-memory-total";
import dashboardLog from "@/views/dashboard/components/dashboard-log";
import Stomp from 'webstomp-client';
import SockJS from 'sockjs-client';

export default {
  components: {
    dashboardTotal,
    dashboardNoti,
    dashboardDaily,
    dashboardLog,
    dashboardCpu,
    dashboardMemorySize,
    dashboardMemoryTotal
  },
  data() {
    return {
      cpuVal: 0,
      memorySize: 0,
      memoryTotal: 0,
    }
  },
  created() {
    // 소켓 연결
    this.connect();
    // setInterval(this.send, 5000);
  },
  methods: {
    connect() {
      const serverURL = "http://localhost:8080";
      let socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);

      console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`)

      this.stompClient.connect({}, frame => {
          // 소켓 연결 성공
          this.connected = true;

          console.log('소켓 연결 성공', frame);

          // 서버의 메시지 전송 endpoint를 구독합니다.(pub/sub 구조)
          this.stompClient.subscribe("/send", res => {
            const obj = JSON.parse(res.body);
            this.cpuVal = obj.cpuVal;
            this.memorySize = obj.memorySize;
            this.memoryTotal = obj.memoryTotal;
          });
        },
        error => {
          // 소켓 연결 실패
          console.log('소켓 연결 실패', error);
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
