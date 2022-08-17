<template>
  <div class="card card-chart">
    <div class="card-header">
      <h3 class="card-title">
        <i class="tim-icons icon-delivery-fast text-info"></i>
        Java System Metrics
      </h3>
      <h4 class="card-category">Average</h4>
    </div>
    <div class="card-body">
      <div class="chart-area">
        <canvas id="myChart" ref="lineChart" width="400" height="400"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  data() {
    return {
      Chart,
      gradientBarChartConfiguration : {
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
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 120,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }],
          xAxes: [{
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.1)',
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
    this.drawChart();
  },
  methods: {
    drawChart() {
      const ctx = this.$refs.lineChart.getContext("2d");

      var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
      gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
      gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors

      var myChart = new Chart(ctx, {
        type: 'bar',
        responsive: true,
        legend: {
          display: false
        },
        data: {
          labels: ['CPU', 'Memory Size', 'Memory Total'],
          datasets: [{
            label: "Countries",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: '#1f8ef1',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [53, 20, 10],
          }]
        },
        options: this.gradientBarChartConfiguration
      });
    },
  },
};
</script>
