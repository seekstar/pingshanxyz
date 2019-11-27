<template>
  <div style="background: #fff;width: 100%;padding-bottom: 15px;margin-bottom:32px;">
    <!-- <span class="demonstration">最近事件实时显示：</span> -->
  
    <el-table
      v-loading="listLoading"
      :data="list"
      :stripe="true"
      height="600"
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
    listLoading:{
      type:Boolean,
      required: true
    }
  },
  data() {
    return {
      msg: ['最近十条','最近一百条', '最近五百条']
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
    }
  }
}
</script>
