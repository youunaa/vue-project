<template>
  <div class="card card-chart">
    <div class="card-header ">
      <div class="row">
        <div class="col-sm-6 text-left">
          <h3 class="card-title">
            <i class="tim-icons icon-send text-primary"></i> Prometheus Metircs
          </h3>
          <h4 class="card-category">process_cpu_seconds_total</h4>
        </div>
        <div class="col-sm-6">
          <div class="btn-group btn-group-toggle float-right" data-toggle="buttons">

            <label id="0" :class="type1Class"
                   @click="btnClick('1')"
            >
              <input type="radio" name="options" checked/>
              <span class="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                1 hours
              </span>
              <span class="d-block d-sm-none">
                <i class="tim-icons icon-single-02"></i>
              </span>
            </label>

<!--            <label :class="type2Class" id="1"-->
<!--                   @click="btnClick('2')"-->
<!--            >-->
<!--              <input type="radio" class="d-none d-sm-none" name="options"/>-->
<!--              <span class="d-none d-sm-block d-md-block d-lg-block d-xl-block">-->
<!--                5 minutes-->
<!--              </span>-->
<!--              <span class="d-block d-sm-none">-->
<!--                <i class="tim-icons icon-gift-2"></i>-->
<!--              </span>-->
<!--            </label>-->

<!--            <label :class="type3Class" id="2"-->
<!--                   @click="btnClick('3')"-->
<!--            >-->
<!--              <input type="radio" class="d-none" name="options"/>-->
<!--              <span class="d-none d-sm-block d-md-block d-lg-block d-xl-block">-->
<!--                100 hours-->
<!--              </span>-->
<!--              <span class="d-block d-sm-none">-->
<!--                <i class="tim-icons icon-tap-02"></i>-->
<!--              </span>-->
<!--            </label>-->

          </div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="chart-area">
        <canvas id="chartBig1"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import Progress from 'easy-circular-progress';
import $ from 'jquery'
import axios from "axios";

export default {
  data() {
    return {
      Chart,
      chart_labels: [],
      chart_data: [],
      btnClass: 'btn btn-sm btn-primary btn-simple',
      btnActiveClass: 'btn btn-sm btn-primary btn-simple active',
      type1Class: 'btn btn-sm btn-primary btn-simple active',
      type2Class: 'btn btn-sm btn-primary btn-simple',
      type3Class: 'btn btn-sm btn-primary btn-simple',
      url: 'http://34.125.40.125:9090/api/v1/query?query=process_cpu_seconds_total',
      duration: '1h',
      gradientChartOptionsConfigurationWithTooltipPurple: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: '#f5f5f5',
          titleFontColor: '#333',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              // suggestedMin: 60,
              // suggestedMax: 5, // y축 max
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }],
          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(225,78,202,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              autoSkipPadding:40,
              // padding: 20,
              fontColor: "#9a9a9a"
            }
          }]
        }
      }
    };
  },
  created() {
    this.reqPrometheus();
  },
  components: {
    Progress
  },
  methods: {
    btnClick(btnType) {
      if (btnType === '1') {
        this.type1Class = this.btnActiveClass;
        this.type2Class = this.btnClass;
        this.type3Class = this.btnClass;
      }
      if (btnType === '2') {
        this.type1Class = this.btnClass;
        this.type2Class = this.btnActiveClass;
        this.type3Class = this.btnClass;
      }
      if (btnType === '3') {
        this.type1Class = this.btnClass;
        this.type2Class = this.btnClass;
        this.type3Class = this.btnActiveClass;
      }
      // this.reqPrometheus()
    },
    reqPrometheus() {
      axios.get(this.url + '[' + this.duration + ']')
        .then(response => {
          response.data.data.result[0].values.forEach((cell, index) => {
            this.chart_labels.push(cell[1]);
            const date = new Date(cell[0] * 1000);
            this.chart_data.push(date.getHours() + ':' + date.getMinutes());
          });
          // chart 그리기
          this.drawChart();
        })
    },
    drawChart() {
      // x축
      var chart_labels = this.chart_data;
      // y축
      var chart_data = this.chart_labels;

      var ctx = document.getElementById("chartBig1").getContext('2d');

      var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, 'rgba(72,72,176,0.1)');
      gradientStroke.addColorStop(0.4, 'rgba(72,72,176,0.0)');
      gradientStroke.addColorStop(0, 'rgba(119,52,169,0)'); //purple colors

      var config = {
        type: 'line',
        data: {
          labels: chart_labels,
          datasets: [{
            label: "process_cpu_seconds_total",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: '#d346b1',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: '#d346b1',
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: '#d346b1',
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 1,
            data: chart_data,
          }]
        },
        options: this.gradientChartOptionsConfigurationWithTooltipPurple
      };

      var myChartData = new Chart(ctx, config);

      // $("#0").click(function () {
      //   var data = myChartData.config.data;
      //   data.datasets[0].data = chart_data;
      //   data.labels = chart_labels;
      //   myChartData.update();
      // });
      //
      // $("#1").click(function () {
      //
      // });
      //
      // $("#2").click(function () {
      //   var chart_data = [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130];
      //   var data = myChartData.config.data;
      //   data.datasets[0].data = chart_data;
      //   data.labels = chart_labels;
      //   myChartData.update();
      // });
    }
  },
};
</script>
