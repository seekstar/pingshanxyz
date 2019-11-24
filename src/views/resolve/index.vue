<template>
  <div style="background: #fff;width: 100%;padding-top: 15px;margin-bottom:32px;">
  <!-- <span class="demonstration">最近事件实时显示：</span> -->
  <el-table :data="list" :stripe="true" >
    <el-table-column label="序号" min-width="150" align="center">
      <template slot-scope="scope">
        {{ scope.row.id }}
      </template>
    </el-table-column>
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
    <el-table-column label="问题大类" min-width="100" align="center">
      <template slot-scope="scope">
        {{ scope.row.big }}
      </template>
    </el-table-column>
    <el-table-column label="问题小类" min-width="100" align="center">
      <template slot-scope="scope">
        {{ scope.row.small }}
      </template>
    </el-table-column>
    <el-table-column label="处理部门" width="150" align="center">
      <template slot-scope="scope">
        {{ scope.row.department }}
      </template>
    </el-table-column>
    <el-table-column  width="100" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleNormal(scope.$index, scope.row)">按期办结</el-button>
      </template>
    </el-table-column>
     <el-table-column width="100" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleAbnormal(scope.$index, scope.row)">超期办结</el-button>
      </template>
    </el-table-column>

  </el-table>
  </div>
</template>

<script>
//import { transactionList } from '@/api/remote-search'
import { getMyData,getDataVersion } from '@/api/getdata'
import { putMyData } from '@/api/putdata'
export default {
  filters: {
    timeFilter(str) {
      return str.substring(0, 10) + ' ' + str.substring(11, 19)
    }
  },
  data() {
    return {
      list:[],
      version:0
    }
  },
  created() {
    this.setData()
    this.interval = setInterval(() => {
      this.setData();
    }, 1000)
  },
  beforeDestroy(){
    clearInterval(this.interval)
  },
  methods: {
    handleNormal(index, row) {
        putMyData({
          key:row.id,
          status:"按期办结"
        }).then(
          this.list.shift()
        )

        
      },
      handleAbnormal(index, row) {
        putMyData({
          key:row.id,
          status:"超期办结"
        }).then(
          this.list.shift()
        )
      }
    ,
    setData(){
        getDataVersion().then(resp=>{
          if(this.version != resp.data){
            this.version = resp.data
            getMyData().then(resp => {
          this.list=[]  
          for(var i=0 ; i<resp.data.length ; ++i){
            this.list.push({
              id: resp.data[i]['主键'],
              time: resp.data[i]['统计时间'],
              position: resp.data[i]['所属街道'] + '  ' + resp.data[i]['所属社区'],
              attr: resp.data[i]['问题性质名称'],
              type: resp.data[i]['问题类型'],
              big: resp.data[i]['大类名称'],
              small: resp.data[i]['小类名称'],
              department: resp.data[i]['处置部门'],
              status: resp.data[i]['处置状态']
            })
          }
        })
          }
          }
        )
        
    }
    
  }
}
</script>
