<template>
  <div class="card card-chart">
    <div class="card-header">
      <h3 class="card-title">
        <i class="tim-icons icon-send text-success"></i>
        JVM(Java Virtual Machine) Metrics
      </h3>
      <h4 class="card-category">Returns the amount of free physical memory in bytes.</h4>
    </div>
    <div class="card-body">
      <Progress :radius="50" :strokeWidth="10" :value="value">
        <template v-slot:footer>
        </template>
      </Progress>
    </div>
  </div>
</template>

<script>
import Progress from 'easy-circular-progress';

export default {
  props: {
    value: [String, Number]
  },
  data() {
    return {};
  },
  components: {
    Progress
  },
  methods: {},
};
</script>
