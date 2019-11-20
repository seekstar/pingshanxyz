<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

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
      default: '500px'
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
        this.chart.setOption({series:[{data:val.properties}]})
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
            text: data.title
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          //data: data.properties.name
          show: true,
          type: 'scroll',
          orient: 'vertical',
          right: 0,
		      top: 20,
		      bottom: 20,
          data: data.properties.name
        },
        series: [
          {
            //name: '问题性质数目',
            type: 'pie',
            //roseType: 'radius',
            //radius: [15, 95],
            center: ['50%', '50%'],
            data: data.properties,
            animationEasing: 'cubicInOut',
            animationDuration: 2600,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{b}: ({d}%)'
                },
                labelLine: {
                  show: true
                }
              }
            }
          }
        ]
      })
    }
  }
}
</script>
