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
            text: data.title
        },
        /*legend: {
          data: ['处置中', '超期结办', '按期结办']
        },*/
        tooltip: {
            trigger: 'item'
        },
        series: {
            type: 'sunburst',
            data: data.tree,
            itemStyle: {
                emphasis: {
                    color: 'red'
                },
                highlight: {
                    color: 'orange'
                },
                downplay: {
                    color: '#ccc'
                }
            },
            levels: [
              {
                emphasis: {
                  itemStyle: {
                    color: 'blue'
                  },
                  label: {
                    name: 'return',
                    formatter: 'return'
                  }
                }
              },{

              },{
                label: {
                  //position: 'outside'
                }
              }
            ],
        }
      })
    }
  }
}
</script>
