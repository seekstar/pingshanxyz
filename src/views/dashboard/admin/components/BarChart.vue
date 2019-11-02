<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

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
    setOptions({ street, d1, d2, d3 } = {}) {
      this.chart.setOption({
        title: {
            text: '各街道民生事件情况'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '20%',
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: street,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        legend: {
          data: ['市容城管', '禽畜养殖', '市政/公共设施']
        },
        series: [{
          name: '市容城管',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: d1,
          animationDuration
        }, {
          name: '禽畜养殖',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: d2,
          animationDuration
        }, {
          name: '市政/公共设施',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: d3,
          animationDuration
        }]
      })
    }
  }
}
</script>
