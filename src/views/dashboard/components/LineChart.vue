<template>
  <div
    :class="className"
    :style="{height:height,width:width}"
  />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const colors = ['red', 'blue', 'orange', 'black', 'green', 'purple'];
function gen_series(data) {
  var ret = [];
  for (var i in data) {
    ret.push({
          name: data[i].name,
          smooth: true,
          type: 'line',
          /*lineStyle: {
            color: colors[i],
            width: 2
          },*/
          data: data[i].data,
          animationDuration: 2000,
          animationEasing: 'cubicInOut'
        });
  }
  return ret
}
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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
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
        title: {
            text: data.title,
        },
        xAxis: {
          data: data.xnames,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 40,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        color: colors.slice(0, data.data.length),
        legend: {
          data: data.data.name,
        },
        series: gen_series(data.data)
      })
    }
  }
}
</script>
