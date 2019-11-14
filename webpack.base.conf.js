module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: { app: './src/main.js' },
    //百度地图配置20180518
    externals: {
      "BMap": "BMap"
    },
  }
  