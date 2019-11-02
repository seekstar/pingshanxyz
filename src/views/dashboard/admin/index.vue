<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <date-picker-quarter />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <el-row >
            <date-picker @dateChange="dateChange1" />
          </el-row>
          <el-row >
            <pie-chart :chart-data="PieChartData" />
          </el-row>
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <el-row >
            <el-date-picker
              v-model="Month"
              type="month"
              placeholder="选择月"
              :picker-options="pickerOptionsMonth"
              :format="displayTypeMonth"
              @change="monthChange(Month)">
            </el-date-picker>
          </el-row>
          <el-row >
            <bar-chart :chart-data="BarChartData" />
          </el-row>
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <sunburst-chart :chart-data="SunburstChartData" />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import LineChart from './components/LineChart'
import SunburstChart from './components/SunburstChart'
import DatePicker from './components/DatePicker'
import DatePickerQuarter from './components/DatePickerQuarter'
import DropDown from './components/DropDown'

function getNowDate(){
  //将当前时间初始化为2018-10-30 + 当前时间
  var now = new Date();
  now.setFullYear(2018);
  now.setMonth(9);
  now.setDate(30);
  return now;
}

const ChartData = {
  types_street: {
    street: ['龙田街道', '坪山街道', '碧岭街道', 'Thu', 'Fri', 'Sat', 'Sun'],
    d1: [79, 52, 200, 334, 390, 330, 220],
    d2: [80, 52, 200, 334, 390, 330, 220],
    d3: [30, 52, 200, 334, 390, 330, 220]
  },
  properties: {
    properties: [
        {
          name: '投诉',
          value: 320
        },{
          name: '感谢',
          value: 240
        },{
          name: '建议',
          value: 149
        },{
          name: "咨询",
          value: 100
        },{
          name: "其他",
          value: 120
        }
      ]
  },
  status_type: {
      tree: [{
          name: '处置中',
          children: [{
              value: 3,
              name: '市容环卫'
          }, {
              value: 5,
              name: '环保水务'
          }]
      }, {
          name: '超期结办',
          children: [{
              name: '市容环卫',
              value: 4
          }, {
              name: '环保水务',
              value: 2
          }]
      }, {
          name: '按期结办',
          children: [{
              name: '市容环卫',
              value: 2
          }, {
              name: '环保水务',
              value: 3
          }]
      }]
  },

  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard,
    LineChart,
    SunburstChart,
    DatePicker,
    DatePickerQuarter,
    DropDown
  },
  data() {
    return {
      BarChartData: ChartData.types_street,
      PieChartData: ChartData.properties,
      SunburstChartData: ChartData.status_type,
      lineChartData: ChartData.newVisitis,
      lineChartDataTable: [ChartData.newVisitis, ChartData.messages, ChartData.purchases, ChartData.shoppings],
      fuckdata: 'asd',
      Month: getNowDate(),
      displayTypeMonth: "yyyy年MM月",
      pickerOptionsMonth:{
        shortcuts: [{
          text: '今天',
          onClick(picker){
            const now = new Date();
            picker.$emit('pick', now);
          }
        }]
      }
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = this.lineChartDataTable[type]
    },
    dateChange1(date){
      console.log(date)
    },
    monthChange(date){
      if(date.getDate() == 1 && date.getHours() == 0 && date.getMinutes() == 0 && date.getSeconds() == 0)
        this.displayTypeMonth = "yyyy年MM月";
      else
        this.displayTypeMonth = "yyyy年MM月dd日";
      console.log(date)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
