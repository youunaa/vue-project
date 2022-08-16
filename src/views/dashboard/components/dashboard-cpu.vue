<template>
  <div class="card card-chart">
    <div class="card-header">
      <h3 class="card-title">
        <i class="tim-icons icon-send text-success"></i> CPU Usage
      </h3>
    </div>
    <div class="card-body">
      <Progress :radius="50" :strokeWidth="10" value="86.12">
        <template v-slot:footer>
        </template>
      </Progress>
    </div>
  </div>
</template>

<script>
import Progress from 'easy-circular-progress';

export default {
  data() {
    return {};
  },
  components: {
    Progress
  },
  methods: {},
};
</script>
