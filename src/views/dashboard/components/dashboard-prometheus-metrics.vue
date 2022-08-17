<template>
  <div class="card card-chart">
    <div class="card-header">
      <h3 class="card-title">
        <i class="tim-icons icon-send text-success"></i>
        Prometheus Metrics
      </h3>
      <h4 class="card-category">process_open_fds</h4>
    </div>
    <div class="card-body">
      <div class="chart-area">
        <canvas id="chartLineGreen"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import Progress from 'easy-circular-progress';
import axios from "axios";

export default {
  data() {
    return {
      Chart,
      chart_labels: [],
      chart_data: [],
      gradientChartOptionsConfigurationWithTooltipGreen: {
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
              suggestedMin: 50,
              // suggestedMax: 125,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }],
          xAxes: [{
            barPercentage: 10,
            gridLines: {
              drawBorder: false,
              color: 'rgba(0,242,195,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }]
        }
      }
    };
  },
  mounted() {
    this.reqPrometheus();
  },
  components: {
    Progress
  },
  methods: {
    reqPrometheus() {
      axios.get('http://34.125.109.178:9090/api/v1/query_range?query=process_open_fds&start=1660646731.242&end=1660650331.242&step=14&_=1660650330889')
        .then(response => {
          response.data.data.result[0].values.forEach((cell, index) => {
            this.chart_labels.push(cell[1])
            this.chart_data.push(cell[10])
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

      var ctx = document.getElementById("chartLineGreen").getContext("2d");

      var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
      gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
      gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors

      var data = {
        labels: chart_labels,
        datasets: [{
          label: "My First dataset",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#00d6b4',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#00d6b4',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#00d6b4',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 1,
          data: chart_data,
        }]
      };

      var myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: this.gradientChartOptionsConfigurationWithTooltipGreen
      });
    }
  },
};
</script>
