<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

function gen_series(data) {
  //console.log(data);
  var series = [];
  for (var it in data) {
    //console.log(it);
    series.push({
      name: data[it].name,
      type: 'bar',
      stack: 'vistors',
      barWidth: '60%',
      data: data[it].data,
      animationDuration
    })
  }
  //console.log(JSON.stringify(series));
  return series;
}

const animationDuration = 2000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions(data) {
      this.chart.setOption({
        toolbox:{
          feature:{
            saveAsImage:{}
          }
        },
        title: {
            text: data.title,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '10%',
          left: '0%',
          right: '10%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        yAxis: [{
          type: 'category',
          data: data.street,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            textStyle: {
              //fontWeight: 'bold',
              fontSize: 20
            }
          }
        }],
        legend: {
          show: true,
          type: 'scroll',
          orient: 'vertical',
          right: 0,
		      top: 20,
          data: data.type.name
        },
        series: gen_series(data.type)
      })
    }
  }
}
</script>
