<template>
  <div style="background: #fff;width: 100%;padding-top: 15px;margin-bottom:32px;">
    <!-- <span class="demonstration">最近事件实时显示：</span> -->
  <span style="background:#fff;padding:16px 24px 0px;margin-bottom:32px;"> 问题性质: </span>
      <el-select v-model="state1" placeholder="问题性质" class="filter-item"
        @change="handleFilter">
        <el-option label="全部" value="全部"></el-option>
        <el-option label="处置中" value="处置中"></el-option>
        <el-option label="超期办结" value="超期办结"></el-option>
        <el-option label="按期办结" value="按期办结"></el-option>
      </el-select>
    <el-table
      v-loading="listLoading"
      :data="list"
     
      :row-class-name="tableRowClassName"
      height="573">
      
      
    >
      <el-table-column
        label="统计时间"
        min-width="150"
      >
        <template slot-scope="scope">
          {{ scope.row.time | timeFilter }}
        </template>
      </el-table-column>
      <el-table-column
        label="所属街道和社区"
        min-width="150"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.position }}
        </template>
      </el-table-column>
      <el-table-column
        label="问题性质"
        min-width="80"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.attr }}
        </template>
      </el-table-column>
      <el-table-column
        label="问题类型"
        min-width="100"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column
        label="处理部门"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.department }}
        </template>
      </el-table-column>
      <el-table-column
        label="处理状态"
        width="100"
        align="center"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter1">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="total, prev, pager, next, jumper"
      :page-size="10"
      :pager-count="11"
      :total="count"
      style="text-align:center"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>


export default {
  filters: {
    statusFilter1(status) {
      if(status=='按期办结')
        return 'success'
      if(status=='超期办结')
        return 'warning'
      return 'danger'
    },
    timeFilter(str) {
      return str.substring(0, 10) + ' ' + str.substring(11, 19)
    }
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    page: {
      type: Number,
      required: true
    },
    count:{
      type:Number,
      required: true
    },
    state:{
      type:String,
      required: true
    },
    listLoading:{
      type:Boolean,
      required: true
    }
  },
  data() {
    return {
      state1:"全部"
    }
  },


  // created() {
  //   this.interval = setInterval(() => {
  //     this.setData();
  //   }, 5000)
  // },
  methods: {
    handleCurrentChange(val) {
      //this.page=val
      this.$emit('getData', Number(val));
    },handleFilter(val){
      this.$emit('getData1', String(val));
    },
    tableRowClassName({row, rowIndex}) {
      if(row.type.indexOf("危险")>=0)
          return 'warning-row';
      return ' '
    }
  }
}
</script>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>