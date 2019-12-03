<template>
  <div style="background: #fff;width: 100%;padding-top: 15px;margin-bottom:32px;">
    <!-- <span class="demonstration">最近事件实时显示：</span> -->
  <div class="filter-container" style="text-align:center">
     <span> 我的部门: </span>
    <el-tag>{{department}}</el-tag>
    <span> 问题性质: </span>
      <el-select v-model="property" placeholder="问题性质" class="filter-item"
        @change="handleFilter">
        <el-option label="全部" value="全部"></el-option>
        <el-option label="求决" value="求决"></el-option>
        <el-option label="投诉" value="投诉"></el-option>
        <el-option label="咨询" value="咨询"></el-option>
        <el-option label="建议" value="建议"></el-option>
        <el-option label="感谢" value="感谢"></el-option>
        <el-option label="其他" value="其他"></el-option>
      </el-select>
      <span> 问题状态: </span>
      <el-select v-model="status" placeholder="问题性质" class="filter-item"
        @change="handleFilter">
        <el-option label="处置中" value="处置中"></el-option>
        <el-option label="按期办结" value="按期办结"></el-option>
        <el-option label="超期办结" value="超期办结"></el-option>
      </el-select>
      <span> 排序方式: </span>
      <el-select
        v-model="sort"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        导出
      </el-button>

      </div>
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
        label="问题来源"
        min-width="50"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.source }}
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
            :disabled="status!='处置中'"
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
            :disabled="status!='处置中'"
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
     <el-tooltip placement="top" content="返回顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>
  </div>
</template>

<script>
//import { transactionList } from '@/api/remote-search'
import BackToTop from '@/components/BackToTop'
import { getMyData,getDataVersion } from '@/api/getdata'
import { putMyData } from '@/api/putdata'
import Pagination from '@/components/Pagination' 
import waves from '@/directive/waves' // waves directive
export default {
  components: { Pagination,BackToTop },
  directives: { waves },
  filters: {
    timeFilter(str) {
      return str.substring(0, 10) + ' ' + str.substring(11, 19)
    }
  },
  data() {
    return {myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      },
      list:[],
      department:'',
      version:0,
      total:0,
      property:"全部",
      status:"处置中",
      page:1,
      limit:20,
      sort:'DESC',
      listLoading:true,
      sortOptions: [{ label: '时间倒序', key: 'DESC' }, { label: '时间正序', key: 'ASC' }],
      downloadLoading:false
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
  {handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['序号', '统计时间', '所属街道和社区', '问题性质', '问题类型','问题大类','问题小类','问题来源','处置部门']
        const filterVal = ['id', 'time', 'position', 'attr', 'type','big','small','source','department']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {return v[j]}))
    },
  sortChange(data) {
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
      getMyData(this.page,this.limit,this.sort,this.property,this.status).then(resp => {
          this.total=resp.data.total
          this.list=[]
          if(resp.data.items.length>0)
            this.department=resp.data.items[0]['处置部门']
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
              status: resp.data.items[i]['处置状态'],
              source: resp.data.items[i]['问题来源']
            })
          }
          this.listLoading = false
        })
    },
    setData(){
        getDataVersion().then(resp=>{
          if(this.version != resp.data){
            this.version = resp.data
            getMyData(this.page,this.limit,this.sort,this.property,this.status).then(resp => {
         this.total=resp.data.total
          this.list=[]  
          this.department=resp.data.items[0]['处置部门']
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
              status: resp.data.items[i]['处置状态'],
              source: resp.data.items[i]['问题来源']
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
