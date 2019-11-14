<template>
  <div style="background: #fff;width: 100%;padding-top: 15px;margin-bottom:32px;">
  <!-- <span class="demonstration">最近事件实时显示：</span> -->
  <el-dropdown @command="handleCommand" style="padding:0px 16px 0px;margin-bottom:16px;">
    <el-button type="primary">
      {{ msg[msgId] }}<i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="0">{{ msg[0] }}</el-dropdown-item>
      <el-dropdown-item command="1">{{ msg[1] }}</el-dropdown-item>
      <el-dropdown-item command="2">{{ msg[2] }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  <el-table :data="list" :stripe="true" height="600">
    <el-table-column label="统计时间" min-width="150">
      <template slot-scope="scope">
        {{ scope.row.time | timeFilter }}
      </template>
    </el-table-column>
    <el-table-column label="所属街道和社区" min-width="150" align="center">
      <template slot-scope="scope">
        {{ scope.row.position }}
      </template>
    </el-table-column>
    <el-table-column label="问题性质" min-width="80" align="center">
      <template slot-scope="scope">
        {{ scope.row.attr }}
      </template>
    </el-table-column>
    <el-table-column label="问题类型" min-width="100" align="center">
      <template slot-scope="scope">
        {{ scope.row.type }}
      </template>
    </el-table-column>
    <el-table-column label="处理部门" width="150" align="center">
      <template slot-scope="scope">
        {{ scope.row.department }}
      </template>
    </el-table-column>
    <el-table-column label="处理状态" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter1">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
//import { transactionList } from '@/api/remote-search'
import { getDetailedData } from '@/api/getdata'

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
    msgId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      msg: ['最近三小时', '最近十二小时', '最近一天']
    }
  },
  // created() {
  //   this.interval = setInterval(() => {
  //     this.setData();
  //   }, 5000)
  // },
  methods: {
    handleCommand(command){
      this.$emit('setData', Number(command));
    },
    /*
    setData(){
        var to = new Date();
        to.setFullYear(2018);
        to.setMonth(9);
        to.setDate(30);

        var from = new Date();
        if(this.msgId == 0)from.setTime(to.getTime() - 1000 * 60 * 10);
        else if(this.msgId == 1)from.setTime(to.getTime() - 1000 * 60 * 60);
        else if(this.msgId == 2)from.setTime(to.getTime() - 1000 * 60 * 60 * 24);
        console.log(this.msgId)
        getDetailedData(from, to).then(resp => {
          //console.log(to)
          //console.log(resp.data);
          this.list = [];
          for(var i=0 ; i<resp.data.length ; ++i){
            this.list.push({
              time: resp.data[i]['统计时间'],
              position: resp.data[i]['所属街道'] + '  ' + resp.data[i]['所属社区'],
              attr: resp.data[i]['问题性质名称'],
              type: resp.data[i]['问题类型'],
              department: resp.data[i]['处置部门'],
              status: resp.data[i]['处置状态']
            })
          }
        })
    }
    */
  }
}
</script>
