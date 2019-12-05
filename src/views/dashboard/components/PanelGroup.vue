<template>
  <el-col :gutter="40" class="panel-group">
    <el-button style="padding: 15px 40px;" @click="handleSetLineChartData(0)">
      <div class="card-panel-text">
        碧岭街道
      </div>
    </el-button>

    <el-button style="padding: 15px 40px;" @click="handleSetLineChartData(1)">
      <div class="card-panel-text">
        龙田街道
      </div>
    </el-button>

    <el-button style="padding: 15px 40px;" @click="handleSetLineChartData(2)">
      <div class="card-panel-text">
        马峦街道
      </div>
    </el-button>

    <el-button style="padding: 15px 40px;" @click="handleSetLineChartData(3)">
      <div class="card-panel-text">
        石井街道
      </div>
    </el-button>

    <el-button style="padding: 15px 40px;" @click="handleSetLineChartData(4)">
      <div class="card-panel-text">
        坪山街道
      </div>
    </el-button>

    <el-button style="padding: 15px 40px;" @click="handleSetLineChartData(5)">
      <div class="card-panel-text">
        坑梓街道
      </div>
    </el-button>
    
  </el-col>
</template>

<script>

export default {
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>

.el-button {
  float: right;
  .card-panel-text {
    color: rgb(14, 154, 235);
    font-size: 23px;
  }
}
</style>
