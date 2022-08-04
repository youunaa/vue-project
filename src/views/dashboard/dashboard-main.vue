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
            <!-- noti -->
            <dashboard-noti />
            <!-- // noti -->
          </div>
          <div class="col-lg-4">
            <!-- Daily Sales -->
            <dashboard-daily />
            <!-- // Daily Sales -->
          </div>
          <div class="col-lg-4">
            <!-- Completed Tasks -->
            <dashboard-example />
            <!-- // Completed Tasks -->
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12">
            <!--  -->
            <dashboard-example2 />
            <!--  -->
          </div>
          <div class="col-lg-6 col-md-12">
            <!-- sample data -->
            <dashboard-example3 />
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
import dashboardExample from "@/views/dashboard/components/dashboard-example";
import dashboardExample2 from "@/views/dashboard/components/dashboard-example2";
import dashboardExample3 from "@/views/dashboard/components/dashboard-example3";

export default {
  components: {
    dashboardTotal,
    dashboardNoti,
    dashboardDaily,
    dashboardExample,
    dashboardExample2,
    dashboardExample3,
  },
};
</script>
