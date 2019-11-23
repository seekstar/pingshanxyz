<template>
  <el-form
    ref="form"
    :model="form"
    label-width="80px"
    style="background:#fff;padding:48px 48px 0;margin-bottom:32px;"
  >
    <el-form-item label="所属街道">
      <el-select v-model="form.street" placeholder="请选择活动区域" style="width: 50%;">
        <el-option label="碧岭街道" value="碧岭街道"></el-option>
        <el-option label="龙田街道" value="龙田街道"></el-option>
        <el-option label="马峦街道" value="马峦街道"></el-option>
        <el-option label="石井街道" value="石井街道"></el-option>
        <el-option label="坪山街道" value="坪山街道"></el-option>
        <el-option label="坑梓街道" value="坑梓街道"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="所属社区">
      <el-autocomplete
        class="inline-input"
        v-model="form.community"
        :fetch-suggestions="querySearchCommunity"
        placeholder="请输入内容"
        style="width: 50%;"
      ></el-autocomplete>
    </el-form-item>

    <el-form-item label="事件类型">
      <el-autocomplete
        class="inline-input"
        v-model="form.type"
        :fetch-suggestions="querySearchType"
        placeholder="请输入内容"
        style="width: 50%;"
      ></el-autocomplete>
    </el-form-item>

    <el-form-item label="事件大类">
      <el-autocomplete
        class="inline-input"
        v-model="form.big"
        :fetch-suggestions="querySearchBig"
        placeholder="请输入内容"
        style="width: 50%;"
      ></el-autocomplete>
    </el-form-item>

    <el-form-item label="事件小类">
      <el-autocomplete
        class="inline-input"
        v-model="form.small"
        :fetch-suggestions="querySearchSmall"
        placeholder="请输入内容"
        style="width: 50%;"
      ></el-autocomplete>
    </el-form-item>

    <el-form-item label="处理部门">
      <el-autocomplete
        class="inline-input"
        v-model="form.department"
        :fetch-suggestions="querySearchDepartment"
        placeholder="请输入内容"
        style="width: 50%;"
      ></el-autocomplete>
    </el-form-item>

    <el-form-item label="平台渠道">
      <el-select v-model="form.source" placeholder="请选择" style="width: 50%;">
        <el-option label="政府信箱" value="政府信箱"></el-option>
        <el-option label="美丽深圳" value="美丽深圳"></el-option>
        <el-option label="@坪山" value="@坪山"></el-option>
        <el-option label="政府信箱" value="政府信箱"></el-option>
        <el-option label="固话投诉" value="固话投诉"></el-option>
        <el-option label="12319" value="12319"></el-option>
        <el-option label="12345" value="12345"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="事件性质">
      <el-select v-model="form.property" placeholder="请选择" style="width: 50%;">
        <el-option label="求决" value="求决"></el-option>
        <el-option label="投诉" value="投诉"></el-option>
        <el-option label="咨询" value="咨询"></el-option>
        <el-option label="建议" value="建议"></el-option>
        <el-option label="感谢" value="感谢"></el-option>
        <el-option label="其他" value="其他"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button  type="primary" plain @click="onDelete">清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import UploadAvatar from "@/components/UploadAvatar";
import { getInfo, updateInfo } from "@/api/user";
import { MessageBox, Message } from "element-ui";
import { putData } from "@/api/putdata";

export default {
  components: { UploadAvatar },
  data() {
    return {
      form: {
        street: "",
        community: "",
        type: "",
        big: "",
        small: "",
        department: "",
        source: "",
        property: ""
      }
    };
  },
  methods: {
    querySearchCommunity(queryString, cb) {
      var community = allCommunity;
      var results = queryString
        ? community.filter(this.createFilter(queryString))
        : community;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearchType(queryString, cb) {
      var type = allType;
      var results = queryString
        ? type.filter(this.createFilter(queryString))
        : type;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearchBig(queryString, cb) {
      var big = allBig;
      var results = queryString
        ? big.filter(this.createFilter(queryString))
        : big;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearchSmall(queryString, cb) {
      var small = allSmall;
      var results = queryString
        ? small.filter(this.createFilter(queryString))
        : small;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearchDepartment(queryString, cb) {
      var department = allDepartment;
      var results = queryString
        ? department.filter(this.createFilter(queryString))
        : department;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return str => {
        return str.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    onSubmit() {
      if(this.form.street == ""){
        Message({
          message: "所属街道未填写！请填写所属街道！",
          type: "error",
          duration: 5 * 1000
        });
        return;
      }

      if(allCommunity.find(item => item.value === this.form.community) == undefined){
        Message({
          message: "所属社区填写错误！没有这个社区！",
          type: "error",
          duration: 5 * 1000
        });
        return;
      }

      if(allType.find(item => item.value === this.form.type) == undefined){
        Message({
          message: "事件类型填写错误！没有这个事件类型！",
          type: "error",
          duration: 5 * 1000
        });
        return;
      }

      if(allBig.find(item => item.value === this.form.big) == undefined){
        Message({
          message: "事件大类填写错误！没有这个事件大类！",
          type: "error",
          duration: 5 * 1000
        });
        return;
      }

      if(allSmall.find(item => item.value === this.form.small) == undefined){
        Message({
          message: "事件小类填写错误！没有这个事件小类！",
          type: "error",
          duration: 5 * 1000
        });
        return;
      }

      if(allDepartment.find(item => item.value === this.form.department) == undefined){
        Message({
          message: "处理部门填写错误！没有这个部门！",
          type: "error",
          duration: 5 * 1000
        });
        return;
      }

      if(this.form.source == ""){
        Message({
          message: "平台渠道未填写！请填写平台渠道！",
          type: "error",
          duration: 5 * 1000
        });
        return;
      }
    
      if(this.form.property == ""){
        Message({
          message: "事件性质未填写！请填写事件性质！",
          type: "error",
          duration: 5 * 1000
        });
        return;
      }

      putData(this.form).then(resp => {
        console.log(resp)
        Message({
          message: "事件登记成功！",
          type: "success",
          duration: 5 * 1000
        });
      })
    },
    onDelete(){
      this.form = {
        street: "",
        community: "",
        type: "",
        big: "",
        small: "",
        department: "",
        source: "",
        property: ""
      }
    }
  }
};

const allCommunity = [
  { value: "马峦社区" },
  { value: "金龟社区" },
  { value: "汤坑社区" },
  { value: "江岭社区" },
  { value: "坪环社区" },
  { value: "坪山社区" },
  { value: "沙坣社区" },
  { value: "六联社区" },
  { value: "田头社区" },
  { value: "碧岭社区" },
  { value: "沙湖社区" },
  { value: "田心社区" },
  { value: "六和社区" },
  { value: "竹坑社区" },
  { value: "老坑社区" },
  { value: "坑梓社区" },
  { value: "和平社区" },
  { value: "石井社区" },
  { value: "南布社区" },
  { value: "金沙社区" },
  { value: "龙田社区" },
  { value: "沙田社区" },
  { value: "秀新社区" }
];

const allType = [
  { value: "安全隐患" },
  { value: "文体旅游" },
  { value: "教育卫生" },
  { value: "组织人事" },
  { value: "党建群团" },
  { value: "党纪政纪" },
  { value: "民政服务" },
  { value: "统一战线" },
  { value: "社区管理" },
  { value: "治安维稳" },
  { value: "环保水务" },
  { value: "规土城建" },
  { value: "市容环卫" },
  { value: "市政设施" },
  { value: "专业事件采集" },
  { value: "交通运输" },
  { value: "劳动社保" },
  { value: "食药市监" }
];

const allBig = [
  { value: "行政效能" },
  { value: "宣传舆论" },
  { value: "医政监管" },
  { value: "人口计生" },
  { value: "教育体制" },
  { value: "教育行政管理" },
  { value: "文化" },
  { value: "人力资源" },
  { value: "社会组织" },
  { value: "福利慈善" },
  { value: "人口房屋" },
  { value: "市容城管" },
  { value: "物业服务管理监督" },
  { value: "社区公共管理" },
  { value: "住宅区（园区）或建筑物内安全、环卫问题" },
  { value: "交通管理" },
  { value: "民间纠纷" },
  { value: "经济违法行为举报" },
  { value: "经济纠纷" },
  { value: "普法教育" },
  { value: "警务督察" },
  { value: "刑案侦破" },
  { value: "户籍证件" },
  { value: "工业噪声" },
  { value: "建筑施工噪声" },
  { value: "商业经营噪声" },
  { value: "营业性文化娱乐噪声" },
  { value: "交通运输噪声" },
  { value: "社会生活噪声" },
  { value: "禽畜养殖污染" },
  { value: "工业、住宅废气扰民" },
  { value: "服务行业废气扰民" },
  { value: "水污染" },
  { value: "扬尘污染" },
  { value: "危险废物、化学品污染" },
  { value: "固体废物" },
  { value: "核安全" },
  { value: "环保标志管理" },
  { value: "生态破坏" },
  { value: "跨河桥、河堤、河道破损" },
  { value: "供、排水及水质问题" },
  { value: "土地资源管理" },
  { value: "征转地审批" },
  { value: "违法建筑与用地行为" },
  { value: "房屋征收" },
  { value: "城乡规划" },
  { value: "住房保障和房地产" },
  { value: "建筑市场" },
  { value: "建筑设计" },
  { value: "建筑安装" },
  { value: "垃圾问题" },
  { value: "渣土问题" },
  { value: "道路保洁" },
  { value: "公共设施保洁" },
  { value: "绿化养护" },
  { value: "废弃物堆放" },
  { value: "占道经营" },
  { value: "车辆乱停放" },
  { value: "安全生产" },
  { value: "宣传广告违法行为" },
  { value: "其他市容违法行为或影响市容事件" },
  { value: "环卫设施设置及维护" },
  { value: "交通设施" },
  { value: "道路设施" },
  { value: "公用部件" },
  { value: "市政、公共设施设置及维护" },
  { value: "城市公共资源管理" },
  { value: "道路规划建设" },
  { value: "更改房屋结构" },
  { value: "公共交通管理" },
  { value: "网约车管理" },
  { value: "建筑消防安全" },
  { value: "消防设施安全" },
  { value: "线路消防安全" },
  { value: "燃气安全" },
  { value: "危险化学品安全" },
  { value: "道路交通安全" },
  { value: "劳动就业" },
  { value: "劳动保护" },
  { value: "校园安全" },
  { value: "劳动社保" },
  { value: "食品安全" },
  { value: "药品（医疗器械）监管" },
  { value: "无证无照经营" },
  { value: "价格监管" },
  { value: "建设工程质量" },
  { value: "商标管理" },
  { value: "市场垄断" },
  { value: "互联网与通讯" },
  { value: "地质安全" },
  { value: "消费维权" },
  { value: "知识产权" },
  { value: "文化市场违法行为" },
  { value: "食药监问题" },
  { value: "卫生问题" },
  { value: "旅游市场管理" },
  { value: "综合事件采集" },
  { value: "体育" },
  { value: "医疗机构违规经营" },
  { value: "医疗机构违规收费" },
  { value: "面源污染隐患" },
  { value: "医患纠纷" },
  { value: "义工联" },
  { value: "工作纪律" },
  { value: "公共卫生" },
  { value: "违反计生政策" },
  { value: "出入境检验检疫" },
  { value: "社区建设" },
  { value: "招生中的违法行为" },
  { value: "工商经济联络" },
  { value: "双拥优抚" },
  { value: "教学违规" },
  { value: "复退安置" },
  { value: "社会救助" },
  { value: "小散乱污" },
  { value: "其他公共安全隐患" },
  { value: "教师队伍和待遇" },
  { value: "教育收费" },
  { value: "招录辞退" },
  { value: "编制职务" },
  { value: "军转安置" },
  { value: "党的建设" },
  { value: "社会治安" },
  { value: "经济管理" },
  { value: "表达情感" },
  { value: "野生资源管理" },
  { value: "宣传教育" },
  { value: "环保管理" },
  { value: "城市建设和市政管理" },
  { value: "集体土地上房屋拆迁与补偿" },
  { value: "国有土地上房屋征收与补偿" },
  { value: "科学技术" },
  { value: "信息化建设" },
  { value: "质监检验检疫" }
];

const allSmall = [
  { value: "认证认可标准化" },
  { value: "精神文明建设" },
  { value: "体育事业" },
  { value: "医疗技术和服务" },
  { value: "人口政策" },
  { value: "计划生育服务管理" },
  { value: "计生执法" },
  { value: "工资福利" },
  { value: "教育体制改革" },
  { value: "教育统筹管理" },
  { value: "教育资源配置" },
  { value: "教学管理" },
  { value: "教育经费管理" },
  { value: "学历学位学籍管理" },
  { value: "文化艺术" },
  { value: "公共文化" },
  { value: "其他" },
  { value: "招聘录用" },
  { value: "职务管理" },
  { value: "人才战略" },
  { value: "人力市场管理" },
  { value: "专业资格考试" },
  { value: "职业资格考试" },
  { value: "作风建设" },
  { value: "社团管理" },
  { value: "福利事业" },
  { value: "社区建设" },
  { value: "生活住房医疗" },
  { value: "参试退役人员待遇" },
  { value: "复员干部安置" },
  { value: "医疗救助" },
  { value: "救灾管理" },
  { value: "市容环卫" },
  { value: "城市管理" },
  { value: "综合执法" },
  { value: "违法建设" },
  { value: "乱摆卖" },
  { value: "道路和公路交通安全" },
  { value: "经济违法行为举报" },
  { value: "沿街晾挂" },
  { value: "广告牌匾" },
  { value: "垃圾收集点" },
  { value: "无证经营的职业介绍所" },
  { value: "经营者欠薪后逃逸、隐匿，或因欠薪被劳动者投诉" },
  { value: "未妥善处理劳动者工资或经济补偿金问题" },
  { value: "福利待遇纠纷" },
  { value: "未提供必要的劳动环境" },
  { value: "剥夺或损害员工工作时间和休息休假的权利" },
  { value: "为员工缴纳社保不规范" },
  { value: "机动车非法营运" },
  { value: "黑车拉客" },
  { value: "非机动车非法营运" },
  { value: "车行道内兜售商品" },
  { value: "交通拥堵" },
  { value: "交通事故" },
  { value: "机动车和驾驶员管理" },
  { value: "指示牌及红绿灯设置" },
  { value: "劳动者的劳动报酬纠纷" },
  { value: "劳动关系纠纷" },
  { value: "用人单位福利赔偿纠纷" },
  { value: "非法加工食品" },
  { value: "非法屠宰禽畜" },
  { value: "药品（医疗器械）监管" },
  { value: "无照经营网吧" },
  { value: "无照加工厂、无照小作坊、无照维修点、无照废品站、无照商店" },
  { value: "无照设立小门店、集贸市场、商场、超市" },
  { value: "无工业产品生产许可证经营行为" },
  { value: "违规收费、价格欺诈" },
  { value: "校园周边安全隐患" },
  { value: "校园内安全隐患" },
  { value: "商标管理" },
  { value: "市场垄断" },
  { value: "通信保障" },
  { value: "电信运营商监管" },
  { value: "擅自开工建设" },
  { value: "擅自进行改建工程" },
  { value: "房屋质量安全隐患" },
  { value: "施工安全隐患" },
  { value: "消费维权" },
  { value: "未经批准的营业性演出活动" },
  { value: "不文明或违法行为" },
  { value: "建筑工地存在安全隐患" },
  { value: "工程建设地质灾害" },
  { value: "危险山塘、水库" },
  { value: "暗渠化河道和地下排水管渠" },
  { value: "未取医师执业证违法执业" },
  { value: "有证药店非法行医" },
  { value: "医疗机构违规收费" },
  { value: "医疗事故争议" },
  { value: "患者权益" },
  { value: "无卫生许可证擅自营业" },
  { value: "动、植物防疫" },
  { value: "政策外多孩" },
  { value: "招生违法行为" },
  { value: "乱收费" },
  { value: "教育收费" },
  { value: "计划安置" },
  { value: "党的建设" },
  { value: "宣传教育" },
  { value: "服务质量" },
  { value: "工作效率" },
  { value: "工作作风" },
  { value: "服务态度" },
  { value: "滥用职权" },
  { value: "失职渎职" },
  { value: "涉嫌从事色情活动" },
  { value: "涉嫌聚众赌博" },
  { value: "居住人员隐患" },
  { value: "业主委员会与物业管理公司的纠纷" },
  { value: "小区水、电、气维修" },
  { value: "社区公共管理" },
  { value: "小区内摆放、堆放物品存在安全隐患或影响卫生、通行" },
  { value: "道路塌陷、盖板坍塌" },
  { value: "小区内垃圾清理" },
  { value: "宣传栏存在倾斜、倒塌、严重破损等安全隐患" },
  { value: "门窗长期关闭或贴纸的出租屋拒绝或妨碍消防检查" },
  { value: "申报登记信息明显与实际信息不符" },
  { value: "企业资质证照" },
  { value: "警示标识" },
  { value: "企业隐患自查自治" },
  { value: "粉尘涉爆隐患" },
  { value: "合同纠纷" },
  { value: "消费者权益纠纷" },
  { value: "房屋征收过程中产生的安置补偿等问题或纠纷" },
  { value: "股份合作公司纠纷" },
  { value: "工程欠款" },
  { value: "普法教育" },
  { value: "户籍证件" },
  { value: "擅自变动或者损坏房屋" },
  { value: "工业红线内噪声" },
  { value: "工业红线外噪声" },
  { value: "建筑运输噪声" },
  { value: "施工噪音" },
  { value: "商业经营红线内噪声" },
  { value: "商业经营红线外噪声" },
  { value: "噪音设施安装" },
  { value: "文化娱乐红线内噪声" },
  { value: "文化娱乐红线外噪声" },
  { value: "未许可经营噪声" },
  { value: "交通设施噪声" },
  { value: "机动车噪声" },
  { value: "敏感区域卸货" },
  { value: "公共场所噪声" },
  { value: "室内噪声" },
  { value: "假日住宅楼噪声" },
  { value: "空调噪声" },
  { value: "宠物扰民" },
  { value: "饲养宠物家禽扰民" },
  { value: "养殖废气" },
  { value: "工业废气" },
  { value: "住宅废气" },
  { value: "油烟污染" },
  { value: "服务行业经营废气" },
  { value: "机动车尾气超标" },
  { value: "垃圾处理场臭味扰民" },
  { value: "垃圾臭味扰民" },
  { value: "非指定场所焚烧垃圾产生气味及烟雾" },
  { value: "焚烧垃圾、树叶" },
  { value: "非公共区域违规排污" },
  { value: "道路污水" },
  { value: "生活污水集污沟渠裸露黑臭" },
  { value: "生活污水乱排放" },
  { value: "地下管道堵塞" },
  { value: "工业污水偷排直排" },
  { value: "河道污染" },
  { value: "房屋拆除、建设扬尘" },
  { value: "市政工程扬尘" },
  { value: "社会投资建设工地施工扬尘" },
  { value: "公共场所扬尘" },
  { value: "其他污染" },
  { value: "固体废物" },
  { value: "核安全" },
  { value: "环保标志管理" },
  { value: "跨河桥、河堤、河道破损" },
  { value: "人均租住建筑面积低于六平方米" },
  { value: "墙体安全隐患" },
  { value: "危房安全隐患" },
  { value: "下水道堵塞或破损" },
  { value: "供水设施故障" },
  { value: "自来水水质发黄等水质问题" },
  { value: "征转地审批" },
  { value: "违法在建建筑" },
  { value: "规划和土地违法行为" },
  { value: "违法已建建筑" },
  { value: "房屋征收" },
  { value: "消防设备配备不全" },
  { value: "消防通道堵塞" },
  { value: "房地产" },
  { value: "权属交易" },
  { value: "房屋安全鉴定" },
  { value: "棚户区改造" },
  { value: "建筑设计" },
  { value: "建筑安装" },
  { value: "电动车存消防安全隐患" },
  { value: "危险用电" },
  { value: "暴露垃圾" },
  { value: "门店外扫垃圾" },
  { value: "乱丢乱吐" },
  { value: "积存垃圾渣土" },
  { value: "道路遗撒" },
  { value: "道路保洁" },
  { value: "路灯杆、街边建筑等乱张贴" },
  { value: "树木养护" },
  { value: "公共绿地养护" },
  { value: "绿化带养护" },
  { value: "私自砍伐、迁移城市树木" },
  { value: "行道树倒压占路" },
  { value: "绿地保洁" },
  { value: "绿地设施维护" },
  { value: "住宅区域内废弃家具设备" },
  { value: "住宅区域内堆放施工废弃料" },
  { value: "废弃车辆" },
  { value: "动物尸体清理" },
  { value: "无照经营游商" },
  { value: "店外经营" },
  { value: "占道废品收购" },
  { value: "机动车乱停放" },
  { value: "非机动车乱停放" },
  { value: "街头张贴广告" },
  { value: "街头散发小广告" },
  { value: "未经批准设置广告牌" },
  { value: "广告招牌破损" },
  { value: "悬挂横幅标语、" },
  { value: "露天烧烤" },
  { value: "沿街门面装修" },
  { value: "乱堆物堆料" },
  { value: "未经批准燃放烟花爆竹" },
  { value: "非装饰性树挂" },
  { value: "蚊蝇孳生" },
  { value: "擅自饲养家禽家畜" },
  { value: "环卫设施不洁" },
  { value: "环卫设施隐患" },
  { value: "上水井盖" },
  { value: "下水井盖" },
  { value: "自来水管破裂" },
  { value: "电力井盖" },
  { value: "路灯(灯光)井盖" },
  { value: "通讯井盖" },
  { value: "燃气管道破裂" },
  { value: "公安井盖" },
  { value: "消防设施" },
  { value: "无主井盖" },
  { value: "通讯交接箱" },
  { value: "电力设施" },
  { value: "电力设施故障" },
  { value: "防撞柱" },
  { value: "景观灯" },
  { value: "报刊亭" },
  { value: "健身设施" },
  { value: "高压线铁塔" },
  { value: "监控电子眼" },
  { value: "治安岗亭" },
  { value: "有线电视箱" },
  { value: "市政公园设施隐患" },
  { value: "侵占绿地" },
  { value: "道路破损" },
  { value: "道路桥梁设施隐患" },
  { value: "无证掘路" },
  { value: "垃圾填埋场管理" },
  { value: "违法收运餐厨垃圾" },
  { value: "道路积水" },
  { value: "架空线缆损坏" },
  { value: "道路规划建设" },
  { value: "公共交通管理" },
  { value: "网约车管理" },
  { value: "居住场所内存放危险性物品" },
  { value: "食药监问题" },
  { value: "卫生问题" },
  { value: "综合事件采集" },
  { value: "燃气经营与服务" },
  { value: "道路路面塌陷、凹陷" },
  { value: "易燃易爆危险品" },
  { value: "临时线路隐患" },
  { value: "消防设施无法正常使用" },
  { value: "路肩墙、路堤墙、路垫墙、山坡墙隐患" },
  { value: "非建筑类边坡安全隐患" },
  { value: "违规使用直排式热水器、强排式热水器" },
  { value: "邻里纠纷" },
  { value: "超时施工" },
  { value: "野生动、植物病虫害" },
  { value: "工业垃圾堆放" },
  { value: "城中村改造" },
  { value: "公共场所渣土倾倒" },
  { value: "国有土地渣土倾倒" },
  { value: "其他区域废弃家具" },
  { value: "其他区域堆放施工废弃料" },
  { value: "社区公园设施隐患" },
  { value: "义工联" },
  { value: "违反工作纪律" },
  { value: "公共区域摆放、堆放物品存在安全隐患或影响卫生、通行" },
  { value: "公共区域大量存放泥土，影响通行和卫生" },
  { value: "公共区域垃圾清理" },
  { value: "出入境检验检疫" },
  { value: "居民自治、民主协商" },
  { value: "工商经济联络" },
  { value: "参战退役人员身份认定" },
  { value: "救灾募捐" },
  { value: "其他市容环境问题" },
  { value: "其它宣传广告问题" },
  { value: "施工占道" },
  { value: "其他施工管理问题" },
  { value: "小散乱污企业" },
  { value: "其它无证经营" },
  { value: "乱设架空管线" },
  { value: "污水井盖" },
  { value: "雨水井盖" },
  { value: "雨水箅子" },
  { value: "立杆" },
  { value: "路灯" },
  { value: "道路隔音屏" },
  { value: "停车场" },
  { value: "交通信号灯" },
  { value: "交通信号设施" },
  { value: "道路信息显示屏" },
  { value: "交通岗亭" },
  { value: "公交站亭" },
  { value: "过街天桥" },
  { value: "高架立交桥" },
  { value: "交通标志牌" },
  { value: "交通护栏" },
  { value: "存车支架" },
  { value: "路名牌" },
  { value: "公共厕所" },
  { value: "化粪池" },
  { value: "垃圾站(楼)" },
  { value: "垃圾箱" },
  { value: "灯箱霓虹灯" },
  { value: "行道树" },
  { value: "绿地" },
  { value: "绿地护栏" },
  { value: "河湖堤坝" },
  { value: "地铁站指示牌" },
  { value: "电梯" },
  { value: "环卫工具房" },
  { value: "毒鼠屋" },
  { value: "交通电子告示牌" },
  { value: "路灯(灯光)配电箱" },
  { value: "饰灯" },
  { value: "私搭乱建" },
  { value: "其它园林绿化管理问题" },
  { value: "警务执法" },
  { value: "案件侦破" },
  { value: "户籍管理" },
  { value: "流动人口管理" },
  { value: "能源开发供应" },
  { value: "新能源产品研发与推广" },
  { value: "致敬致谢" },
  { value: "其他" },
  { value: "其他野生资源管理" },
  { value: "生态示范和模范城区创建" },
  { value: "环境监测" },
  { value: "环境执法" },
  { value: "土地规划" },
  { value: "规划方案" },
  { value: "工程招投标" },
  { value: "企业资质和执业资格" },
  { value: "城市公共设施" },
  { value: "房屋拆迁" },
  { value: "安置补偿" },
  { value: "审批手续" },
  { value: "城镇危房改造" },
  { value: "最低工资标准" },
  { value: "住房公积金" },
  { value: "就业和再就业职业培训" },
  { value: "劳动安全" },
  { value: "职工医疗保险" },
  { value: "职工工伤保险" },
  { value: "职工生育保险" },
  { value: "知识产权申报" },
  { value: "发展规划" },
  { value: "信息产业发展规划" }
];

const allDepartment = [
  { value: "交通轨道办" },
  { value: "人力资源局" },
  { value: "住房和建设局" },
  { value: "值班应急与智慧管理指挥分中心（马峦街道办事处）" },
  { value: "值班应急与智慧管理指挥分中心（龙田街道办事处）" },
  { value: "公共服务办公室（马峦街道办事处）" },
  { value: "公共服务办（石井街道办事处）" },
  { value: "公共服务办（碧岭街道办事处）" },
  { value: "六和社区" },
  { value: "六联社区" },
  { value: "办公室（碧岭街道办事处）" },
  { value: "劳动办（坑梓街道办事处）" },
  { value: "劳动办（坪山街道办事处）" },
  { value: "劳动办（龙田街道办事处）" },
  { value: "劳动管理办公室（马峦街道办事处）" },
  { value: "区委宣传部（文体旅游局）" },
  { value: "区委政法委" },
  { value: "区委组织部" },
  { value: "区委（区政府）办公室" },
  { value: "区指挥中心处置" },
  { value: "区测试责任单位一" },
  { value: "南布社区" },
  { value: "卫生和计划生育局" },
  { value: "发展和改革局（统计局）" },
  { value: "和平社区" },
  { value: "土地整备中心（坪山街道办事处）" },
  { value: "土地整备中心（石井街道办事处）" },
  { value: "土地整备中心（碧岭办）" },
  { value: "土地整备中心（马峦）" },
  { value: "土地整备中心（龙田街道办事处）" },
  { value: "土地整备局" },
  { value: "坑梓社区" },
  { value: "坑梓自来水公司（坑梓辖区）" },
  { value: "坑梓街道分中心处置（坑梓街道办事处）" },
  { value: "坪山交通运输局" },
  { value: "坪山供电局" },
  { value: "坪山公安分局" },
  { value: "坪山区城中村综合整治办" },
  { value: "坪山社区" },
  { value: "坪山联通营业中心" },
  { value: "坪山自来水有限公司" },
  { value: "坪山街道电信营业中心" },
  { value: "坪山街道综合执法队" },
  { value: "坪环社区" },
  { value: "城市更新局" },
  { value: "城市管理办公室（马峦街道办事处）" },
  { value: "城市管理局" },
  { value: "城建办" },
  { value: "城建办" },
  { value: "城建办公室（坪山街道办事处）" },
  { value: "城建办公室（石井街道办事处）" },
  { value: "城建办公室（碧岭街道办事处）" },
  { value: "城建办公室（马峦街道办事处）" },
  { value: "城投公司" },
  { value: "城管办（坑梓街道办事处）" },
  { value: "城管办（碧岭街道办事处）" },
  { value: "大工业区水务有限公司" },
  { value: "天隆广播电视网络有限公司" },
  { value: "安全生产监督管理办公室（坪山街道办事处）" },
  { value: "安全生产监督管理局" },
  { value: "安监办（坑梓街道办事处）" },
  { value: "宣传统战办公室（龙田街道办事处）" },
  { value: "市交警支队坪山大队" },
  { value: "市市场和质量监管委坪山局" },
  { value: "市政服务中心（坑梓街道办事处）" },
  { value: "市政服务中心（坪山街道办事处）" },
  { value: "市政服务中心（马峦街道办事处）" },
  { value: "市政服务中心（龙田街道办事处）" },
  { value: "市规划国土委坪山管理局" },
  { value: "广东移动深圳公司" },
  { value: "建筑工务局" },
  { value: "政府投资项目前期工作管理办公室" },
  { value: "教育局" },
  { value: "机关事务中心" },
  { value: "机关事务服务中心（马峦街道办事处）" },
  { value: "机关事务管理局" },
  { value: "武装部（龙田街道办事处）" },
  { value: "民政局" },
  { value: "江岭社区" },
  { value: "汤坑社区" },
  { value: "沙坣社区" },
  { value: "沙湖社区" },
  { value: "沙田社区" },
  { value: "消安委办（坪山街道办事处）" },
  { value: "消安委办（石井街道办事处）" },
  { value: "消安委办（碧岭街道办事处）" },
  { value: "消防安全委员会办公室" },
  { value: "消防安全管理委员会办公室" },
  { value: "环境保护和水务局" },
  { value: "环境水政监察大队" },
  { value: "田头社区工作站（石井街道办事处）" },
  { value: "田心社区工作站（石井街道办事处）" },
  { value: "石井办事处市政服务中心" },
  { value: "石井办事处综合执法队" },
  { value: "石井社区工作站" },
  { value: "碧岭办事处市政服务中心" },
  { value: "碧岭社区" },
  { value: "社保坪山分局" },
  { value: "秀新社区" },
  { value: "科技创新服务署" },
  { value: "竹坑社区" },
  { value: "纪工委（坑梓街道办事处）" },
  { value: "纪工委（龙田街道办事处）" },
  { value: "纪律检查工作委员会（坪山街道办事处）" },
  { value: "组织部（坑梓街道办事处）" },
  { value: "组织部（龙田街道办事处）" },
  { value: "经济和科技促进局" },
  { value: "综治维稳办公室（碧岭街道办事处）" },
  { value: "综治维稳办公室（马峦街道办事处）" },
  { value: "综治维稳办（坑梓街道办事处）" },
  { value: "群团工作部" },
  { value: "老坑社区" },
  { value: "街区发展办公室（马峦街道办事处）" },
  { value: "规划土地监察大队" },
  { value: "财政局（国资办）" },
  { value: "金沙社区" },
  { value: "金龟社区工作站" },
  { value: "马峦办事处综合执法队" },
  { value: "龙田社区" },
  { value: "龙田街道综合执法队" }
];
</script>