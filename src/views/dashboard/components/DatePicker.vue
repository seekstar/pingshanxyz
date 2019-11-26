<template>
  <div class="block">
    <span class="demonstration">选择日期区间：</span>
    <el-date-picker
      v-model="dateData"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions2"
      :default-time="['00:00:00', '23:59:59']"
      @change="dateChange(dateData)">
      <!-- size="small"> -->
    </el-date-picker>
  </div>
</template>

<script>
function getNowDate(){
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

function thisWeek(){
  //设置起始时间为本周刚开始的时刻
  var start = getNowDate();
  start.setDate(start.getDate() - 1);
  while(start.getDay() != 1)
    start.setDate(start.getDate() - 1);
  start.setHours(0);
  start.setMinutes(0);
  start.setSeconds(0);

  //设置结束时间为下周刚开始的时刻
  var end = new Date();
  end.setTime(start.getTime());
  end.setDate(end.getDate() + 7);
  return [start, end];
}

function thisMonth(){
  //设置起始时间为这个月刚开始的时刻
  var start = getNowDate();
  start.setDate(1);
  start.setHours(0);
  start.setMinutes(0);
  start.setSeconds(0);

  //设置结束时间为下个月刚开始的时刻
  var end = new Date();
  end.setTime(start.getTime());
  end.setMonth(end.getMonth() + 1);

  return [start, end];
}

function thisQuarter(){
  //设置起始时间为这个季度刚开始的时刻
  var start = getNowDate();
  start.setMonth(start.getMonth() - start.getMonth()%3);
  start.setDate(1);
  start.setHours(0);
  start.setMinutes(0);
  start.setSeconds(0);

  //设置结束时间为下个季度刚开始的时刻
  var end = new Date();
  end.setTime(start.getTime());
  end.setMonth(end.getMonth()+3);

  return [start, end];
}

function thisYear(){
  //设置起始时间为今年刚开始的时刻
  var start = getNowDate();
  start.setMonth(0);
  start.setDate(1);
  start.setHours(0);
  start.setMinutes(0);
  start.setSeconds(0);

  //设置结束时间为明年刚开始的时刻
  var end = new Date();
  end.setTime(start.getTime());
  end.setFullYear(end.getFullYear()+1);

  return [start, end];
}

export default {
  props: {
    dateData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      pickerOptions2: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', thisDay());
          }
        },{
          text: '本周',
          onClick(picker) {
            picker.$emit('pick', thisWeek());
          }
        }, {
          text: '本月',
          onClick(picker) {
            picker.$emit('pick', thisMonth());
          }
        }, {
          text: '本季度',
          onClick(picker) {
            picker.$emit('pick', thisQuarter());
          }
        }, {
          text: '本年度',
          onClick(picker) {
            picker.$emit('pick', thisYear());
          }
        }]
      }
    };
  },
  methods:{
    dateChange(date) {
      //console.log(date)
      this.$emit('dateChange', date)
    }
  }
};
</script>