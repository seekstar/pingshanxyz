<template>
  <div style="background: #fff;width: 100%;padding-top: 15px;margin-bottom:32px;">
    <!-- <span class="demonstration">最近事件实时显示：</span> -->
  
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        label="序号"
        min-width="50"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column
        label="统计时间"
        prop="time"
        sortable="custom"
        min-width="80"
      >
        <template slot-scope="scope">
          {{ scope.row.time | timeFilter }}
        </template>
      </el-table-column>
      <el-table-column
        label="所属街道和社区"
        min-width="80"
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
        label="问题大类"
        min-width="100"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.big }}
        </template>
      </el-table-column>
      <el-table-column
        label="问题小类"
        min-width="100"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.small }}
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
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleNormal(scope.$index, scope.row)"
          >
            按期办结
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleAbnormal(scope.$index, scope.row)"
          >
            超期办结
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="page"
      :limit.sync="limit"
      @pagination="getData"
    />
  </div>
</template>

<script>
//import { transactionList } from '@/api/remote-search'
import { getMyData,getDataVersion } from '@/api/getdata'
import { putMyData } from '@/api/putdata'
import Pagination from '@/components/Pagination' 
export default {
  components: { Pagination },
  filters: {
    timeFilter(str) {
      return str.substring(0, 10) + ' ' + str.substring(11, 19)
    }
  },
  data() {
    return {
      list:[],
      version:0,
      total:0,
      page:1,
      limit:20,
      sort:'DESC',
      listLoading:true,
      sortOptions: [{ label: '时间倒序', key: 'DESC' }, { label: '时间正序', key: 'ASC' }],
    }
  },
  created() {
    this.getData()
    this.interval = setInterval(() => {
      this.setData();
    }, 1000)
  },
  beforeDestroy(){
    clearInterval(this.interval)
  },
  methods: 
  {sortChange(data) {
      const { prop, order } = data
      if (prop === 'time') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.sort = 'ASC'
      } else {
        this.sort = 'DESC'
      }
      this.handleFilter()
    },
    handleFilter() {
      this.page = 1
      this.getData()
    },
    handleNormal(index, row) {
        this.listLoading = true
        putMyData({
          key:row.id,
          status:"按期办结"
        }).then(
          this.getData()
        )

        
      },
      handleAbnormal(index, row) {
        this.listLoading = true
        putMyData({
          key:row.id,
          status:"超期办结"
        }).then(
          this.getData()
        )
      }
    ,
    getData(){
      this.listLoading = true
      getMyData(this.page,this.limit,this.sort).then(resp => {
          this.total=resp.data.total
          this.list=[]  
          for(var i=0 ; i<resp.data.items.length ; ++i){
            this.list.push({
              id: resp.data.items[i]['主键'],
              time: resp.data.items[i]['统计时间'],
              position: resp.data.items[i]['所属街道'] + '  ' + resp.data.items[i]['所属社区'],
              attr: resp.data.items[i]['问题性质名称'],
              type: resp.data.items[i]['问题类型'],
              big: resp.data.items[i]['大类名称'],
              small: resp.data.items[i]['小类名称'],
              department: resp.data.items[i]['处置部门'],
              status: resp.data.items[i]['处置状态']
            })
          }
          this.listLoading = false
        })
    },
    setData(){
        getDataVersion().then(resp=>{
          if(this.version != resp.data){
            this.version = resp.data
            getMyData(this.page,this.limit,this.sort).then(resp => {
          this.list=[]  
          for(var i=0 ; i<resp.data.items.length ; ++i){
  
           this.list.push({
              id: resp.data.items[i]['主键'],
              time: resp.data.items[i]['统计时间'],
              position: resp.data.items[i]['所属街道'] + '  ' + resp.data.items[i]['所属社区'],
              attr: resp.data.items[i]['问题性质名称'],
              type: resp.data.items[i]['问题类型'],
              big: resp.data.items[i]['大类名称'],
              small: resp.data.items[i]['小类名称'],
              department: resp.data.items[i]['处置部门'],
              status: resp.data.items[i]['处置状态']
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
