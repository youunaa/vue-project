<template>
  <div>
    <h2>WebSocket Test</h2>
    <div id="output">
      유저이름:
      <input type="text" v-model="userName">
      내용:
      <input type="text" v-model="message" @keyup="sendMessage">

      <div>
        <md-progress-spinner md-mode="determinate" :md-value="amount"></md-progress-spinner>
        <md-progress-spinner class="md-accent" md-mode="determinate" :md-value="amount"></md-progress-spinner>
        <div>
          <input type="range" v-model.number="amount"> {{ amount }}%
        </div>
      </div>

      <Progress :radius="50" :strokeWidth="10" value="86.12">
        <template v-slot:footer>
          <b>Bolder & Bigger One</b>
        </template>
      </Progress>

      <Progress
        :transitionDuration="5000"
        :radius="50"
        :strokeWidth="10"
        value="86.12"
      >
        <template v-slot:footer>
          <b>Slow One</b>
        </template>
      </Progress>

      <Progress
        :transitionDuration="5000"
        :radius="55"
        :strokeWidth="10"
        value="86.12567"
      >
        <template v-slot:footer>
          <b>More Precise</b>
        </template>
      </Progress>

      <Progress :transitionDuration="5000" :radius="55" :strokeWidth="10" value="86.12567">
        <div class="content">86/100</div>
        <template v-slot:footer>
          <b>More Precise</b>
        </template>
      </Progress>

    </div>
  </div>
</template>

<script>
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
import Progress from "easy-circular-progress";

export default {
  name: 'test-main',
  components: {
    Progress
  },
  data() {
    return {
      amount:20,
      userName: "",
      message: "",
      recvList: [],
      metricList: []
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

          // 서버의 메시지 전송 endpoint를 구독합니다.
          // 이런형태를 pub sub 구조라고 합니다.
          this.stompClient.subscribe("/send", res => {
            console.log('구독으로 받은 메시지 입니다.', res.body);

            // 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
            this.recvList.push(JSON.parse(res.body));
            console.log('test...' , res.body)
          });
        },
        error => {
          // 소켓 연결 실패
          console.log('소켓 연결 실패', error);
          this.connected = false;
        }
      );
    },

    sendMessage(e) {
      if (e.keyCode === 13 && this.userName !== '' && this.message !== '') {
        this.send();
        this.message = ''
      }
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
<style>
.md-progress-spinner {
  margin: 24px;
}
</style>
