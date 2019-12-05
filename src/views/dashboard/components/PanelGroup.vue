<template>
  <el-col :gutter="40" class="panel-group">
    <el-row :xs="8" :sm="8" :lg="4" class="card-panel-row">
      <div class="card-panel" @click="handleSetLineChartData(0)">
        <div class="card-panel-description">
          <div class="card-panel-text">
            碧岭街道
          </div>
        </div>
      </div>
    </el-row>
    
    <el-row :xs="8" :sm="8" :lg="4" class="card-panel-row">
      <div class="card-panel" @click="handleSetLineChartData(1)">
        <div class="card-panel-description">
          <div class="card-panel-text">
            龙田街道
          </div>
        </div>
      </div>
    </el-row>

    <el-row :xs="8" :sm="8" :lg="4" class="card-panel-row">
      <div class="card-panel" @click="handleSetLineChartData(2)">
        <div class="card-panel-description">
          <div class="card-panel-text">
            马峦街道
          </div>
        </div>
      </div>
    </el-row>

    <el-row :xs="8" :sm="8" :lg="4" class="card-panel-row">
      <div class="card-panel" @click="handleSetLineChartData(3)">
        <div class="card-panel-description">
          <div class="card-panel-text">
            石井街道
          </div>
        </div>
      </div>
    </el-row>

    <el-row :xs="8" :sm="8" :lg="4" class="card-panel-row">
      <div class="card-panel" @click="handleSetLineChartData(4)">
        <div class="card-panel-description">
          <div class="card-panel-text">
            坪山街道
          </div>
        </div>
      </div>
    </el-row>

    <el-row :xs="8" :sm="8" :lg="4" class="card-panel-row">
      <div class="card-panel" @click="handleSetLineChartData(5)">
        <div class="card-panel-description">
          <div class="card-panel-text">
            坑梓街道
          </div>
        </div>
      </div>
    </el-row>
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
.panel-group {
  .card-panel {
    height: 50px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    .card-panel-description {
      float: right;
      //font-weight: bold;
      margin: 13px;
      margin-left: 0px;//???

      .card-panel-text {
        //line-height: 18px;
        //color: rgba(0, 0, 0, 0.45);
        color: rgb(14, 154, 235);
        font-size: 23px;
        //margin-bottom: 12px;
      }
    }
  }
}

/*@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }
}*/
</style>
