<template>
    <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
require('echarts/extension/bmap/bmap');  ///   如果不引入 那么会 报错：api.coord is not a function"

var DEBUG = true;

var data = null;

function GetCenter(bdry) {
    var sum = [0, 0];
    for (var i in bdry) {
        sum[0] += bdry[i][0];
        sum[1] += bdry[i][1];
    }
    sum[0] /= bdry.length;
    sum[1] /= bdry.length;
    return sum;
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
      default: '500px'
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
        data = val;
        this.chart.setOption({series: [{data: data.data}]})
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
        const AK = "7afa0e2788a44f03e95e73cef87211ac";
        const BMap_URL = "https://api.map.baidu.com/api?v=2.0&ak="+ AK +"&s=1&callback=onBMapCallback";
        new Promise((resolve, reject) => {
            // 如果已加载直接返回
            if(typeof BMap !== "undefined") {
                resolve(BMap);
                return true;
            }
            // 百度地图异步加载回调处理
            window.onBMapCallback = function () {
                ////console.log("百度地图脚本初始化成功...");
                resolve(BMap);
            };

            // 插入script脚本
            let scriptNode = document.createElement("script");
            scriptNode.setAttribute("type", "text/javascript");
            scriptNode.setAttribute("src", BMap_URL);
            document.body.appendChild(scriptNode);
        }).then((BMap)=>{
            this.chart = echarts.init(this.$el, 'macarons')

            data = this.chartData;
            this.setOptions()
        })
    },
    setOptions() {
      console.log('refreshing PingShanMap')
      this.chart.setOption({
            backgroundColor: 'transparent',
            title: {
                text: '热点社区',
                //subtext: 'data from PM25.in',
                //sublink: 'http://www.pm25.in',
                //left: 'center',
                x: 'left',
                y: 'top',
                backgroundColor: 'white',
                textStyle: {
                    fontSize: 20,
                    fontWeight: 'bold',
                },
            },
            tooltip : {
                trigger: 'item',
                formatter: function(params) {
                    return params.name.slice(0, 2) + ' ' + params.value[2];
                }
            },
            bmap: {
                center: GetCenter(data.boundary),
                zoom: data.zoom,
                roam: true,
                mapStyle: {
                    styleJson: [
                            {
                                "featureType": "boundary",
                                "elementType": "geometry",
                                "stylers": {
                                    "color": "black"
                                }
                            },
                    ]
                }
            },
            series : [
                {
                    name: 'pm2.5',
                    type: 'scatter',
                    coordinateSystem: 'bmap',
                    data: data.data,
                    symbolSize: (val) => {
                      val = val[2];
                      if (val == 0) return 0;
                      if (DEBUG) {
                        var today = new Date();
                        console.log(today.toLocaleTimeString());
                        console.log(data.data)  //这句不能删，会出bug
                      }
                      var mx = 0;
                      for (var v of data.data) {
                        if (v.value[2] > mx) {
                          mx = v.value[2];
                          if (DEBUG) {
                            console.log(v.name);
                          }
                        }
                        //console.log(v.value[2]);
                      }
                      var res;
                      if (mx < 1) {
                        res = 0;
                      } else {
                        var rate = val / mx;
                        if (rate < 0.3) {
                          res = 0;
                        } else {
                          res = rate * 20;
                        }
                      }
                      if (DEBUG) {
                        console.log("mx = " + mx + ", val = " + val + ", res = " + res);
                      }
                      return res;
                      //return 10;
                    },
                    label: {
                        normal: {
                            formatter: function(params) {
                                return params.name.slice(0, 2);
                            },
                            position: 'right',
                            textStyle: {
                                fontSize: 20
                            },
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            //color: '#177cb0',
                            //color: 'Olive'
                            //color: 'orange'
                            //color: 'Fuchsia'
                            color: '#ff5151'
                        }
                    }
                },
                {
                    type: 'custom',
                    coordinateSystem: 'bmap',
                    renderItem: (params, api) => {
                            var points = [];
                            for (var i = 0; i < data.boundary.length; i++) {
                                points.push(api.coord(data.boundary[i]));
                            }

                            var color = api.visual('color');

                            return {
                                type: 'polygon',
                                shape: {
                                    points: echarts.graphic.clipPointsByRect(points, {
                                        x: params.coordSys.x,
                                        y: params.coordSys.y,
                                        width: params.coordSys.width,
                                        height: params.coordSys.height
                                    })
                                },
                                style: api.style({
                                    fill: color,
                                    stroke: echarts.color.lift(color)
                                })
                            };
                        },
                    itemStyle: {
                        normal: {
                            opacity: 0.5
                        }
                    },
                    animation: false,
                    silent: true,
                    data: [0],
                    z: -10
                }
            ]
      })
    }
  }
}
</script>
