<template>
  <div>
    <h2>WebSocket Test</h2>
    <div id="output"></div>
  </div>
</template>

<script>
export default {
  name: 'test-main'
  , data() {
    return {}
  },
  created() {
    this.$socket.emit('connect', 'data')
  },
  methods: {

  }
};
</script>

