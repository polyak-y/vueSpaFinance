<template>
  <div>
    <highcharts class="chart" :options="chartOptions"></highcharts>   
  </div>
</template>

<script>
import {} from 'highcharts';

export default {
  props: ['dataChart'],
  data() {
    return {
      chartOptions: {
        chart: {          
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
          }
        },
        colors: ['#EA80FC', '#42A5F5', '#26C6DA', '#81C784', '#FFA726'],
        title: {
          text: 'График расходов'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.allSum}</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true
            },
            showInLegend: true
          }
        },
        series: [{
          name: 'Расход',
          colorByPoint: true,
          data: this.dataChart
        }]
      }
    }
  } 
}
</script>

<style lang="scss">
  .highcharts-credits {
    display: none;
  }

  .highcharts-background {
    fill: rgba(255, 255, 255, .7);
    stroke: #c7c7c7;
  }
  
</style>