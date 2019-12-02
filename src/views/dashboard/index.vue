<template>
  <div class="dashboard-editor-container">
    <el-tooltip
      content="坪山区人民政府官网"
      effect="dark"
      placement="bottom"
    >
      <github-corner class="github-corner" />
    </el-tooltip>

    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row> -->

    <!-- BarChart -->
    <el-row class="chart-wrapper">
      <el-col>
        <el-row style="background:#fff;padding:16px 48px 0px;margin-bottom:32px;">
          <span class="demonstration">选择日期：</span>
          <el-date-picker
            v-model="Month"
            type="month"
            placeholder="选择月"
            :picker-options="pickerOptionsMonth"
            :format="displayTypeMonth"
            @change="monthChange(Month)"
          />
        </el-row>
        <el-row style="background:#fff;padding:0px 48px 0px;margin-bottom:32px;">
          <bar-chart :chart-data="BarChartData" />
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <!-- PieChart -->
      <el-col
        :xs="24"
        :sm="24"
        :lg="12"
      >
        <div class="chart-wrapper">
          <el-row style="background:#fff;padding:0px 8px 0;margin-bottom:16px;">
            <date-picker
              @dateChange="dateChange1"
            />
          </el-row>
          <el-row>
            <pie-chart :chart-data="PieChartData" />
          </el-row>
        </div>
      </el-col>
      <!-- SunburstChart -->
      <el-col
        :xs="24"
        :sm="24"
        :lg="12"
      >
        <div class="chart-wrapper">
          <el-row style="background:#fff;padding:0px 8px 0;margin-bottom:16px;">
            <el-dropdown @command="handleCommand">
              <el-button type="primary">
                {{ dateType }}
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">
                  所有时间范围
                </el-dropdown-item>
                <el-dropdown-item command="2">
                  按月份选择日期
                </el-dropdown-item>
                <el-dropdown-item command="3">
                  按季度选择日期
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <el-date-picker
              v-if="show2"
              v-model="Month2"
              type="month"
              placeholder="选择月"
              format="yyyy年MM月"
              @change="dateChange2(Month2)"
            />

            <date-picker-quarter
              v-if="show3"
              :quarter="quarter"
              @dateChange="dateChange3"
            />
          </el-row>
          <el-row>
            <sunburst-chart :chart-data="SunburstChartData" />
          </el-row>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 12}"
        :xl="{span: 12}"
      >
        <transaction-table
          :list="list"
          :page="page"
          :count="count"
          :state="state"
          :list-loading="listLoading"
          @getData="getData"
          @getData1="getData1"
        />
      </el-col>

      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 12}"
        :xl="{span: 12}"
      >      
        <el-row style="background:#fff;padding:32px 48px 0px;margin-bottom:0px;">
          <span class="demonstration">选择日期：</span>
          <el-date-picker
            v-model="Month3"
            type="month"
            placeholder="选择月"
            :picker-options="pickerOptionsMonth"
            :format="displayTypeMonth3"
            @change="monthChange3(Month3)"
          />
        </el-row>
        <el-row style="background:#fff;padding:32px 50px 50px;margin-bottom:16px;">
          <ping-shan-map :chart-data="pingShanMapData" />
        </el-row>
      </el-col>

      <!-- <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 6}"
        :xl="{span: 6}"
        style="margin-bottom:30px;"
      >
        <todo-list />
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 6}"
        :xl="{span: 6}"
        style="margin-bottom:30px;"
      >
        <box-card />
      </el-col> -->
    </el-row>
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop'
import GithubCorner from "@/components/GithubCorner";
import PanelGroup from "./components/PanelGroup";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import TransactionTable from "./components/TransactionTable";
import LineChart from "./components/LineChart";
import SunburstChart from "./components/SunburstChart";
import DatePicker from "./components/DatePicker";
import DatePickerQuarter from "./components/DatePickerQuarter";
import PingShanMap from './components/PingShanMap';
import { Message } from 'element-ui';
import {
  getPieChartData,
  getBarChartData,
  getSunburstChartData,
  getDetailedData,
  getMapData,
  getDataVersion,
  //getDataCount,
  getTotalNumOfEachStatus
} from "@/api/getdata";

//require("./lib/date.format");
import "./components/lib/date.format";

function getNowDate() {
  //将当前时间初始化为2018-10-30 + 当前时间
  var now = new Date();
  now.setFullYear(2018);
  now.setMonth(9);
  now.setDate(30);
  return now;
}

function thisDay(){
  //设置起始时间为今天刚开始的时刻
  var start = getNowDate();
  start.setHours(0);
  start.setMinutes(0);
  start.setSeconds(0);

  //设置起始时间为明天刚开始的时刻
  var end = new Date();
  end.setTime(start.getTime());
  end.setDate(end.getDate() + 1);
  return [start, end];
}

const ChartData = {
  types_street: {
    title: "各街道民生事件情况",
    street: [
      "碧岭街道",
      "龙田街道",
      "马峦街道",
      "石井街道",
      "坪山街道",
      "坑梓街道",
      "-"
    ],
    type: [
      // {
      //   name: "安全隐患",
      //   data: [0, 0, 0, 0, 1, 0]
      // },
      // {
      //   name: "文体旅游",
      //   data: [0, 0, 0, 0, 1, 0]
      // },
      // {
      //   name: "教育卫生",
      //   data: [0, 1, 0, 0, 2, 0]
      // },
      // {
      //   name: "组织人事",
      //   data: [0, 0, 0, 0, 0, 0]
      // },
      // {
      //   name: "党建群团",
      //   data: [0, 0, 0, 0, 0, 0]
      // },
      // {
      //   name: "党纪政纪",
      //   data: [0, 0, 0, 0, 0, 0]
      // },
      // {
      //   name: "民政服务",
      //   data: [0, 0, 0, 0, 0, 0]
      // },
      // {
      //   name: "统一战线",
      //   data: [0, 1, 0, 0, 0, 0]
      // },
      // {
      //   name: "社区管理",
      //   data: [0, 2, 0, 0, 0, 0]
      // },
      // {
      //   name: "治安维稳",
      //   data: [0, 0, 0, 0, 0, 0]
      // },
      // {
      //   name: "环保水务",
      //   data: [4, 15, 4, 1, 9, 3]
      // },
      // {
      //   name: "规土城建",
      //   data: [0, 1, 0, 0, 1, 0]
      // },
      // {
      //   name: "市容环卫",
      //   data: [1, 4, 2, 0, 13, 8]
      // },
      // {
      //   name: "市政设施",
      //   data: [1, 7, 1, 0, 5, 3]
      // },
      // {
      //   name: "专业事件采集",
      //   data: [0, 0, 0, 0, 0, 0]
      // },
      // {
      //   name: "交通运输",
      //   data: [0, 12, 0, 0, 0, 1]
      // },
      // {
      //   name: "劳动社保",
      //   data: [0, 0, 0, 2, 1, 0]
      // },
      // {
      //   name: "食药市监",
      //   data: [1, 1, 0, 0, 0, 0]
      // }
    ]
  },
  properties: {
    title: "民生诉求分析",
    //types: ['求决', '投诉', '咨询', "建议", '感谢', '其他'],
    properties: [
      // {
      //   name: "求决",
      //   value: 30
      // },
      // {
      //   name: "投诉",
      //   value: 6328
      // },
      // {
      //   name: "咨询",
      //   value: 308
      // },
      // {
      //   name: "建议",
      //   value: 118
      // },
      // {
      //   name: "感谢",
      //   value: 10
      // },
      // {
      //   name: "其他",
      //   value: 1
      // }
    ]
  },
  pingShanMapData: {
    choose_env: 'light_env',
    zoom: 12,
    data: [
      {name: '马峦社区', value: [114.3382030000,22.6445380000,0]},
      {name: '金龟社区', value: [114.4064610000,22.6637440000,0]},
      {name: '汤坑社区', value: [114.3310790000,22.6788050000,0]},
      {name: '江岭社区', value: [114.3625960000,22.6920200000,0]},
      {name: '坪环社区', value: [114.3547400000,22.6880960000,0]},
      {name: '坪山社区', value: [114.3572650000,22.6962590000,0]},
      {name: '沙坣社区', value: [114.3774770000,22.6901530000,0]},
      {name: '六联社区', value: [114.3435272387,22.6896070615,0]},
      {name: '田头社区', value: [114.4108370000,22.6971970000,0]},
      {name: '碧岭社区', value: [114.2956630000,22.6734200000,0]},
      {name: '沙湖社区', value: [114.3265520000,22.6790900000,0]},
      {name: '田心社区', value: [114.4219430000,22.7003510000,0]},
      {name: '六和社区', value: [114.3499140000,22.7079190000,0]},
      {name: '竹坑社区', value: [114.3950740000,22.7157730000,0]},
      {name: '老坑社区', value: [114.3693120000,22.7348660000,0]},
      {name: '坑梓社区', value: [114.3900130000,22.7530310000,0]},
      {name: '和平社区', value: [114.3504321337,22.6947184506,0]},
      {name: '石井社区', value: [114.3909780000,22.6976250000,0]},
      {name: '南布社区', value: [114.3756070000,22.7053400000,0]},
      {name: '金沙社区', value: [114.4040810000,22.7586770000,0]},
      {name: '龙田社区', value: [114.3728410000,22.7533460000,0]},
      {name: '沙田社区', value: [114.4044440000,22.7617640000,0]},
      {name: '秀新社区', value: [114.3812230000,22.7468730000,0]}
    ],
    boundary: [
      [114.452581, 22.697309],
      [114.449315, 22.70566],
      [114.441145, 22.708549],
      [114.434593, 22.706961],
      [114.427974, 22.720416],
      [114.415309, 22.719353],
      [114.410035, 22.730609],
      [114.4145, 22.73194],
      [114.414108, 22.738832],
      [114.420398, 22.743692],
      [114.420425, 22.759468],
      [114.426993, 22.761319],
      [114.42387, 22.765075],
      [114.429311, 22.767592],
      [114.425304, 22.768237],
      [114.417843, 22.783315],
      [114.411224, 22.787075],
      [114.402523, 22.782462],
      [114.401237, 22.767654],
      [114.395177, 22.764818],
      [114.373537, 22.774268],
      [114.365708, 22.770751],
      [114.354784, 22.7748],
      [114.342961, 22.75367],
      [114.346203, 22.750799],
      [114.344027, 22.742426],
      [114.349294, 22.735691],
      [114.345716, 22.733135],
      [114.346395, 22.722007],
      [114.341056, 22.71544],
      [114.326377, 22.709227],
      [114.328365, 22.706899],
      [114.324883, 22.698965],
      [114.313775, 22.692297],
      [114.313014, 22.686914],
      [114.307203, 22.689324],
      [114.303557, 22.686363],
      [114.301809, 22.688871],
      [114.297474, 22.68505],
      [114.300662, 22.682961],
      [114.299034, 22.680614],
      [114.291647, 22.683936],
      [114.29045, 22.680076],
      [114.279297, 22.679057],
      [114.272958, 22.668606],
      [114.273557, 22.663199],
      [114.283316, 22.650317],
      [114.291755, 22.646275],
      [114.296384, 22.637391],
      [114.29276, 22.630224],
      [114.296165, 22.625118],
      [114.300362, 22.627073],
      [114.302969, 22.62457],
      [114.310666, 22.636283],
      [114.31939, 22.630229],
      [114.32578, 22.632016],
      [114.333758, 22.629011],
      [114.340651, 22.63219],
      [114.344965, 22.629413],
      [114.349715, 22.637332],
      [114.355434, 22.637582],
      [114.358174, 22.632589],
      [114.3706, 22.628479],
      [114.372844, 22.638683],
      [114.380465, 22.638772],
      [114.380148, 22.644426],
      [114.376612, 22.646506],
      [114.380819, 22.650615],
      [114.386735, 22.643849],
      [114.394515, 22.642634],
      [114.395405, 22.647916],
      [114.414207, 22.65461],
      [114.418223, 22.659911],
      [114.424238, 22.658831],
      [114.442264, 22.669697],
      [114.43804, 22.670297],
      [114.435021, 22.684469],
      [114.448562, 22.690427],
      [114.452581, 22.697309]
    ]
  },
  status_type: {
    title: "事件结办分析",
    tree: [
      // {
      //   name: "处置中",
      //   children: [
      //     {
      //       value: 3,
      //       name: "市容环卫"
      //     },
      //     {
      //       value: 5,
      //       name: "环保水务"
      //     }
      //   ]
      // },
      // {
      //   name: "超期结办",
      //   children: [
      //     {
      //       name: "市容环卫",
      //       value: 4
      //     },
      //     {
      //       name: "环保水务",
      //       value: 2
      //     },
      //     {
      //       name: "fuck",
      //       value: 4
      //     }
      //   ]
      // },
      // {
      //   name: "按期结办",
      //   children: [
      //     {
      //       name: "市容环卫",
      //       value: 2
      //     },
      //     {
      //       name: "环保水务",
      //       value: 3
      //     }
      //   ]
      // }
    ]
  },
};

export default {
  name: "DashboardAdmin",
  components: {
    GithubCorner,
    PanelGroup,
    PieChart,
    BarChart,
    TransactionTable,
    LineChart,
    SunburstChart,
    DatePicker,
    DatePickerQuarter,
    PingShanMap,
    BackToTop
  },
  data() {
    return {
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      },
      BarChartData: ChartData.types_street,
      PieChartData: ChartData.properties,
      SunburstChartData: ChartData.status_type,
      pingShanMapData: ChartData.pingShanMapData,
      count:0,
      state:"全部",
      lineChartXNames: [],
      lineChartDataTable: [
        //name: '碧岭街道',
        [
          {
            name: '求决',
            data: []
          },{
            name: '投诉',
            data: []
          },{
            name: '咨询',
            data: []
          },{
            name: '建议',
            data: []
          },{
            name: '感谢',
            data: []
          },{
            name: '其他',
            data: []
          }
        ],
        //name: '龙田街道',
        [
          {
            name: '求决',
            data: []
          },{
            name: '投诉',
            data: []
          },{
            name: '咨询',
            data: []
          },{
            name: '建议',
            data: []
          },{
            name: '感谢',
            data: []
          },{
            name: '其他',
            data: []
          }
        ],
        //name: '马峦街道',
        [
          {
            name: '求决',
            data: []
          },{
            name: '投诉',
            data: []
          },{
            name: '咨询',
            data: []
          },{
            name: '建议',
            data: []
          },{
            name: '感谢',
            data: []
          },{
            name: '其他',
            data: []
          }
        ],
        //name: '石井街道',
        [
          {
            name: '求决',
            data: []
          },{
            name: '投诉',
            data: []
          },{
            name: '咨询',
            data: []
          },{
            name: '建议',
            data: []
          },{
            name: '感谢',
            data: []
          },{
            name: '其他',
            data: []
          }
        ],
        //name: '坪山街道',
        [
          {
            name: '求决',
            data: []
          },{
            name: '投诉',
            data: []
          },{
            name: '咨询',
            data: []
          },{
            name: '建议',
            data: []
          },{
            name: '感谢',
            data: []
          },{
            name: '其他',
            data: []
          }
        ],
        //name: '坑梓街道',
        [
          {
            name: '求决',
            data: []
          },{
            name: '投诉',
            data: []
          },{
            name: '咨询',
            data: []
          },{
            name: '建议',
            data: []
          },{
            name: '感谢',
            data: []
          },{
            name: '其他',
            data: []
          }
        ]
      ],
      lastLineChartType: null,
      lineChartData: null,

      Month: getNowDate(),
      Month2: getNowDate(),
      Month3: getNowDate(),
      displayTypeMonth: "yyyy年MM月dd日",
      //displayTypeMonth2: "yyyy年MM月dd日",第二个月份选择器不用快捷选择
      displayTypeMonth3: "yyyy年MM月dd日",
      date1: thisDay(),
      quarter: getNowDate(),
      dateType: "所有时间范围",
      show2: false,
      show3: false,
      dataVersion: null,
      pickerOptionsMonth: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              const now = getNowDate();
              picker.$emit("pick", now);
            }
          }
        ]
      },
      list: [],
      page: 1,
      interval: null,
      listLoading:false
    };
  },
  created() {
    this.interval = setInterval( () => {
      getDataVersion().then(resp => {
        //console.log(resp.data)
        if(this.version != resp.data){
          this.version = resp.data;
          this.monthChange(this.Month);//实时更新BarChart
          this.dateChange1(this.date1);//实时更新PieChart

          //TODO: 每次更新数据的时候SunburstChart也会更新，导致不能观察数据
          if(this.dateType == "所有时间范围"){//实时更新SunburstChart
            this.setSunburstChartData(1, 1, 1);
          }else if(this.dateType == "按月份选择日期"){
            this.dateChange2(this.Month2);
          }else{
            this.dateChange3(this.quarter);
          }

          this.setData(this.page,this.state);//实时更新最近发生事件列表

          this.monthChange3(this.Month3);//实时更新地图数据
        }
      })
      //console.log("定时器正在运行！！")
      //console.log(this.interval)
    }, 1000)
    const day = 24*60*60*1000;
    var now = new Date();
    now = new Date(now.getTime() - 8 * day);
    for (var i = 0; i < 7; ++i) {
      now = new Date(now.getTime() + day);
      var formatted_date = now.format('yyyy-mm-dd');
      this.pushLineChartData({
        date: formatted_date,
        value: getTotalNumOfEachStatus(formatted_date)
      });
    }
    this.handleSetLineChartData(0);
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    setPieChartData(from, to) {
      getPieChartData(
        from,
        to
      ).then(resp => {
        //console.log(resp.data)
        if(JSON.stringify(this.PieChartData) != JSON.stringify({ title: "民生诉求分析", properties: resp.data }))
          this.PieChartData = { title: "民生诉求分析", properties: resp.data };
      });
    },
    setBarChartData(year, month) {
      getBarChartData(year, month).then(resp => {
        //console.log(resp.data);
        var tmp = {
          title: "各街道民生事件情况",
          street: [
            "碧岭街道",
            "龙田街道",
            "马峦街道",
            "石井街道",
            "坪山街道",
            "坑梓街道",
            "-"
          ],
          type: [
            { name: "安全隐患", data: [] },
            { name: "文体旅游", data: [] },
            { name: "教育卫生", data: [] },
            { name: "组织人事", data: [] },
            { name: "党建群团", data: [] },
            { name: "党纪政纪", data: [] },
            { name: "民政服务", data: [] },
            { name: "统一战线", data: [] },
            { name: "社区管理", data: [] },
            { name: "治安维稳", data: [] },
            { name: "环保水务", data: [] },
            { name: "规土城建", data: [] },
            { name: "市容环卫", data: [] },
            { name: "市政设施", data: [] },
            { name: "专业事件采集", data: [] },
            { name: "交通运输", data: [] },
            { name: "劳动社保", data: [] },
            { name: "食药市监", data: [] },
            { name: "-", data: [] }
          ]
        };
        for (var i = 0; i < tmp.type.length; ++i) {
          for (var j = 0; j < tmp.street.length; ++j) {
            var OK = false;
            for (var now of resp.data) {
              if (now.name == tmp.type[i].name && now.street == tmp.street[j]) {
                OK = true;
                tmp.type[i].data.push(now.value);
                break;
              }
            }
            if (OK == false) {
              tmp.type[i].data.push(0);
            }
          }
        }
        //console.log(tmp);
        //console.log(JSON.stringify(tmp))
        if(JSON.stringify(this.BarChartData) != JSON.stringify(tmp))
          this.BarChartData = tmp;
      });
    },
    setSunburstChartData(op, year, date) {
      getSunburstChartData(op, year, date).then(resp => {
        //console.log(resp.data);
        var sum = 0;
        for(let item of resp.data){
          sum += item.value;
        }
        var tmp = {
          title: "事件办结分析",
          tree: [
            {
              name: "处置中",
              children: []
            },
            {
              name: "按期办结",
              children: []
            },
            {
              name: "超期办结",
              children: []
            }
          ]
        };
        var trans = {"处置中": 0, "按期办结": 1, "超期办结": 2};
        for(let item of resp.data){
          if(item.value * 100 < sum){
            var OK = false;
            for(let i = 0; i < tmp.tree[trans[item.status]].children.length; ++i){
              if(tmp.tree[trans[item.status]].children[i].name == '其他'){
                OK = true;
                tmp.tree[trans[item.status]].children[i].value += item.value;
                break;
              }
            }
            if(OK == false){
              tmp.tree[trans[item.status]].children.push({'name': '其他', 'value': item.value});
            }
          }else{
            tmp.tree[trans[item.status]].children.push({'name': item.name, 'value': item.value});
          }
        }
        if(JSON.stringify(this.SunburstChartData) != JSON.stringify(tmp))
          this.SunburstChartData = tmp;
      });
    },
    handleSetLineChartData(type) {
      this.lastLineChartType = type;
      var new_data = {
        xnames: this.lineChartXNames,
        data: this.lineChartDataTable[type]
      };
      this.lineChartData = new_data;
    },
    dateChange1(date) {
      this.date1 = date
      //console.log(date);
      this.setPieChartData(date[0], date[1]);
    },
    dateChange2(date) {
      //console.log(date);
      this.setSunburstChartData(2, date.getFullYear(), date.getMonth() + 1);
    },
    dateChange3(date) {
      //console.log(date);
      this.setSunburstChartData(3, date.getFullYear(), date.getMonth() + 1);
    },
    handleCommand(command) {
      if (command == "1") {
        this.dateType = "所有时间范围";
        this.show2 = false;
        this.show3 = false;
        /* 更新图表数据 */
        this.setSunburstChartData(1, 1, 1);
      } else if (command == "2") {
        this.dateType = "按月份选择日期";
        this.show2 = true;
        this.show3 = false;
      } else {
        this.dateType = "按季度选择日期";
        this.show2 = false;
        this.show3 = true;
      }
    },
    monthChange(date) {
      //if (date.getDate() == 1 && date.getHours() == 0 && date.getMinutes() == 0 && date.getSeconds() == 0) {
      if (date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds() == 1) {
        //查询一个月的统计数据
        this.displayTypeMonth = "yyyy年MM月";
        this.setBarChartData(date.getFullYear(), date.getMonth() + 1);
      } else {
        //查询一天的统计数据
        this.displayTypeMonth = "yyyy年MM月dd日";
        this.setBarChartData(-1, -1);
      }
      //console.log(date);
    },
    setData(page,state){
      getDetailedData(page,10,state).then(resp => {
        this.count=resp.data.total
        this.list = [];
        for(let i=0 ; i<resp.data.items.length ; ++i){
          this.list.push({
            time: resp.data.items[i]['统计时间'],
            position: resp.data.items[i]['所属街道'] + '  ' + resp.data.items[i]['所属社区'],
            attr: resp.data.items[i]['问题性质名称'],
            type: resp.data.items[i]['小类名称'],
            department: resp.data.items[i]['处置部门'],
            status: resp.data.items[i]['处置状态']
          })
        }
      })
    },
    getData(page){
      this.page=page
      this.listLoading=true
      getDetailedData(page,10,this.state).then(resp => {
        this.count=resp.data.total
        this.list = [];
        for(let i=0 ; i<resp.data.items.length ; ++i){
          this.list.push({
            time: resp.data.items[i]['统计时间'],
            position: resp.data.items[i]['所属街道'] + '  ' + resp.data.items[i]['所属社区'],
            attr: resp.data.items[i]['问题性质名称'],
            type: resp.data.items[i]['小类名称'],
            department: resp.data.items[i]['处置部门'],
            status: resp.data.items[i]['处置状态']
          })
          
        }
        this.listLoading=false
      })
    },
    getData1(state){
      this.state=state
      this.listLoading=true
      getDetailedData(this.page,10,state).then(resp => {
        console.log(resp.data.total)
        this.count=resp.data.total
        this.list = [];
        for(let i=0 ; i<resp.data.items.length ; ++i){
          this.list.push({
            time: resp.data.items[i]['统计时间'],
            position: resp.data.items[i]['所属街道'] + '  ' + resp.data.items[i]['所属社区'],
            attr: resp.data.items[i]['问题性质名称'],
            type: resp.data.items[i]['小类名称'],
            department: resp.data.items[i]['处置部门'],
            status: resp.data.items[i]['处置状态']
          })
          
        }
        this.listLoading=false
      })
    },
    setMapData(year, month){
      getMapData(year, month).then(resp => {
        var tmp = JSON.parse(JSON.stringify(ChartData.pingShanMapData));
        for(let i = 0 ; i<tmp.data.length ; ++i)
          tmp.data[i].value[2] = 0;
        for(let item of resp.data){
          for(let i = 0 ; i<tmp.data.length ; ++i){
            if(tmp.data[i].name == item.name){
              tmp.data[i].value[2] = item.value;
            }
          }
        }
        if(JSON.stringify(this.pingShanMapData) !== JSON.stringify(tmp)){
          this.pingShanMapData = tmp;
        }
        //console.log(this.pingShanMapData)
      })
    },
    monthChange3(date){
      //if (date.getDate() == 1 && date.getHours() == 0 && date.getMinutes() == 0 && date.getSeconds() == 0) {
      if (date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds() == 1) {
        //查询一个月的统计数据
        this.displayTypeMonth3 = "yyyy年MM月";
        this.setMapData(date.getFullYear(), date.getMonth() + 1);
      } else {
        //查询一天的统计数据
        this.displayTypeMonth3 = "yyyy年MM月dd日";
        this.setMapData(-1, -1);
      }
      //console.log(date);
    },

    pushLineChartData(new_day) {
      this.lineChartXNames.push(new_day.date);
      for (var i = 0; i < new_day.value.length; ++i) {
        for (var j = 0; j < new_day.value[i].length; ++j) {
          this.lineChartDataTable[i][j].data.push(new_day.value[i][j]);
        }
      }
    },
    shiftLineChartData() {
      this.lineChartXNames.shift();
      for (var i = 0; i < this.lineChartDataTable.length; ++i) {
        for (var j = 0; j < this.lineChartDataTable[i].length; ++j) {
          this.lineChartDataTable[i][j].data.shift();
        }
      }
    },
    UpdateLineChartData(new_day) {
      this.pushLineChartData(new_day);
      this.shiftLineChartData();
      this.handleSetLineChartData(this.lastLineChartType);  //refresh
    }
  }
};
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

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>

<style>
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}

</style>