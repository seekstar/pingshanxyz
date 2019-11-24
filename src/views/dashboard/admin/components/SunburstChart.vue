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
      chart: null,
      depth:1
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
      this.chart.on('click',val=>{
        if(val.treePathInfo.length>1) this.depth=val.treePathInfo.length
        else this.depth--
        //console.log(val.treePathInfo.length)
        })
    },

    setOptions(data) {
      if(this.depth==1){
        this.chart.setOption({
        toolbox:{
          feature:{
            saveAsImage:{}
          }
        },
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
}
</script>
