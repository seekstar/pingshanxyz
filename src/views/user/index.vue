<template>
  <el-form ref="form" :model="form" label-width="80px" style="background:#fff;padding:48px 48px 0;margin-bottom:32px;">
    <el-form-item label="用户名" style="width: 50%;">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" style="width: 50%;">
      <el-input v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item label="角色" style="width: 50%;">
    <el-checkbox-group v-model="form.roles">
    <el-checkbox label="管理员" name="roles"></el-checkbox>
    <el-checkbox label="登记员" name="roles"></el-checkbox>
    <el-checkbox label="处理员" name="roles"></el-checkbox>
  </el-checkbox-group>
    </el-form-item>
    <el-form-item label="手机" style="width: 50%;">
      <el-input v-model="form.phone"></el-input>
    </el-form-item>
        <el-form-item label="个人简介" style="width: 50%;">
      <el-input v-model="form.introduction"></el-input>
    </el-form-item>
    <el-form-item label="所属部门"  v-if=show>
      <el-autocomplete
        class="inline-input"
        v-model="form.department"
        :fetch-suggestions="querySearchDepartment"
        placeholder="请输入内容"
        @select="handleSelect"
        style="width: 50%;"
      ></el-autocomplete>
    </el-form-item>



    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import UploadAvatar from '@/components/UploadAvatar'
import { addUser } from "@/api/user"
import { MessageBox, Message } from 'element-ui'

const allDepartment = [
  { 'value': "交通轨道办" },
  { 'value': "人力资源局" },
  { 'value': "住房和建设局" },
  { 'value': "值班应急与智慧管理指挥分中心（马峦街道办事处）" },
  { 'value': "值班应急与智慧管理指挥分中心（龙田街道办事处）" },
  { 'value': "公共服务办公室（马峦街道办事处）" },
  { 'value': "公共服务办（石井街道办事处）" },
  { 'value': "公共服务办（碧岭街道办事处）" },
  { 'value': "六和社区" },
  { 'value': "六联社区" },
  { 'value': "办公室（碧岭街道办事处）" },
  { 'value': "劳动办（坑梓街道办事处）" },
  { 'value': "劳动办（坪山街道办事处）" },
  { 'value': "劳动办（龙田街道办事处）" },
  { 'value': "劳动管理办公室（马峦街道办事处）" },
  { 'value': "区委宣传部（文体旅游局）" },
  { 'value': "区委政法委" },
  { 'value': "区委组织部" },
  { 'value': "区委（区政府）办公室" },
  { 'value': "区指挥中心处置" },
  { 'value': "区测试责任单位一" },
  { 'value': "南布社区" },
  { 'value': "卫生和计划生育局" },
  { 'value': "发展和改革局（统计局）" },
  { 'value': "和平社区" },
  { 'value': "土地整备中心（坪山街道办事处）" },
  { 'value': "土地整备中心（石井街道办事处）" },
  { 'value': "土地整备中心（碧岭办）" },
  { 'value': "土地整备中心（马峦）" },
  { 'value': "土地整备中心（龙田街道办事处）" },
  { 'value': "土地整备局" },
  { 'value': "坑梓社区" },
  { 'value': "坑梓自来水公司（坑梓辖区）" },
  { 'value': "坑梓街道分中心处置（坑梓街道办事处）" },
  { 'value': "坪山交通运输局" },
  { 'value': "坪山供电局" },
  { 'value': "坪山公安分局" },
  { 'value': "坪山区城中村综合整治办" },
  { 'value': "坪山社区" },
  { 'value': "坪山联通营业中心" },
  { 'value': "坪山自来水有限公司" },
  { 'value': "坪山街道电信营业中心" },
  { 'value': "坪山街道综合执法队" },
  { 'value': "坪环社区" },
  { 'value': "城市更新局" },
  { 'value': "城市管理办公室（马峦街道办事处）" },
  { 'value': "城市管理局" },
  { 'value': "城建办" },
  { 'value': "城建办" },
  { 'value': "城建办公室（坪山街道办事处）" },
  { 'value': "城建办公室（石井街道办事处）" },
  { 'value': "城建办公室（碧岭街道办事处）" },
  { 'value': "城建办公室（马峦街道办事处）" },
  { 'value': "城投公司" },
  { 'value': "城管办（坑梓街道办事处）" },
  { 'value': "城管办（碧岭街道办事处）" },
  { 'value': "大工业区水务有限公司" },
  { 'value': "天隆广播电视网络有限公司" },
  { 'value': "安全生产监督管理办公室（坪山街道办事处）" },
  { 'value': "安全生产监督管理局" },
  { 'value': "安监办（坑梓街道办事处）" },
  { 'value': "宣传统战办公室（龙田街道办事处）" },
  { 'value': "市交警支队坪山大队" },
  { 'value': "市市场和质量监管委坪山局" },
  { 'value': "市政服务中心（坑梓街道办事处）" },
  { 'value': "市政服务中心（坪山街道办事处）" },
  { 'value': "市政服务中心（马峦街道办事处）" },
  { 'value': "市政服务中心（龙田街道办事处）" },
  { 'value': "市规划国土委坪山管理局" },
  { 'value': "广东移动深圳公司" },
  { 'value': "建筑工务局" },
  { 'value': "政府投资项目前期工作管理办公室" },
  { 'value': "教育局" },
  { 'value': "机关事务中心" },
  { 'value': "机关事务服务中心（马峦街道办事处）" },
  { 'value': "机关事务管理局" },
  { 'value': "武装部（龙田街道办事处）" },
  { 'value': "民政局" },
  { 'value': "江岭社区" },
  { 'value': "汤坑社区" },
  { 'value': "沙坣社区" },
  { 'value': "沙湖社区" },
  { 'value': "沙田社区" },
  { 'value': "消安委办（坪山街道办事处）" },
  { 'value': "消安委办（石井街道办事处）" },
  { 'value': "消安委办（碧岭街道办事处）" },
  { 'value': "消防安全委员会办公室" },
  { 'value': "消防安全管理委员会办公室" },
  { 'value': "环境保护和水务局" },
  { 'value': "环境水政监察大队" },
  { 'value': "田头社区工作站（石井街道办事处）" },
  { 'value': "田心社区工作站（石井街道办事处）" },
  { 'value': "石井办事处市政服务中心" },
  { 'value': "石井办事处综合执法队" },
  { 'value': "石井社区工作站" },
  { 'value': "碧岭办事处市政服务中心" },
  { 'value': "碧岭社区" },
  { 'value': "社保坪山分局" },
  { 'value': "秀新社区" },
  { 'value': "科技创新服务署" },
  { 'value': "竹坑社区" },
  { 'value': "纪工委（坑梓街道办事处）" },
  { 'value': "纪工委（龙田街道办事处）" },
  { 'value': "纪律检查工作委员会（坪山街道办事处）" },
  { 'value': "组织部（坑梓街道办事处）" },
  { 'value': "组织部（龙田街道办事处）" },
  { 'value': "经济和科技促进局" },
  { 'value': "综治维稳办公室（碧岭街道办事处）" },
  { 'value': "综治维稳办公室（马峦街道办事处）" },
  { 'value': "综治维稳办（坑梓街道办事处）" },
  { 'value': "群团工作部" },
  { 'value': "老坑社区" },
  { 'value': "街区发展办公室（马峦街道办事处）" },
  { 'value': "规划土地监察大队" },
  { 'value': "财政局（国资办）" },
  { 'value': "金沙社区" },
  { 'value': "金龟社区工作站" },
  { 'value': "马峦办事处综合执法队" },
  { 'value': "龙田社区" },
  { 'value': "龙田街道综合执法队" },
]


export default {
  components: { UploadAvatar },
  data() {
    return {
      form: {
        avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
        username: "",
        password:"",
        roles: ['处理员'],
        phone: "",
        department: "",
        introduction: "",
      }
    }
  },
  computed:{
    show(){
      return !(this.form.roles.indexOf('管理员')==-1&&this.form.roles.indexOf('处理员')==-1)
    }
  },
  methods: {
    querySearchCommunity(queryString, cb) {
      var community = allCommunity;
      var results = queryString ? community.filter(this.createFilter(queryString)) : community;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearchDepartment(queryString, cb) {
      var department = allDepartment;
      var results = queryString ? department.filter(this.createFilter(queryString)) : department;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (str) => {
        return (str.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    onSubmit() {
     if(!(/^1[3456789]\d{9}$/.test(this.form.phone))){
        Message({
          message: "电话号码格式填写错误！",
          type: "error",
          duration: 5 * 1000
        });
        return;
      }
      if(this.show){
    
      if(allDepartment.find(item => item.value === this.form.department) == undefined){
        Message({
          message: "所属部门填写错误！没有这个部门！",
          type: "error",
          duration: 5 * 1000
        });
        return;
      }
      }
      
      addUser(this.form).then(resp => {
        Message({
          message: '添加用户成功',
          type: 'success',
          duration: 5 * 1000
        })
      })
    },
    handleSelect(){

    }
  }
}
</script>