<template>
  <div>
    <el-dialog
      class="dialog-style"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <div style="color: #f54545; font-size: 20px; font-weight:bold;">{{ "邮件标题：" + emailTitle }}</div>
      <div style="color: gray;">发送时间：{{sendTime | timeFilter}}</div>
      <hr>
      <div v-html="html" class="dialog-content-style"></div>
    </el-dialog>
    <el-row>
      <el-col :span="4">
        <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @select="handleSelect">
        <el-menu-item index="1">
            <i class="el-icon-edit" />
            <span slot="title">写信</span>
        </el-menu-item>
        <el-menu-item index="2">
            <svg-icon icon-class="documents" />
            <span slot="title">收件箱</span>
        </el-menu-item>
        <el-menu-item index="3">
            <svg-icon icon-class="sent_email" />
            <span slot="title">已发送</span>
        </el-menu-item>
        </el-menu>
      </el-col>
      <!-- 上内边距，右内边距，下内边距，左内边距 -->
      <el-col :span="20" style="padding: 0px 50px 0px 50px;" v-show="this.nowId === '1'">
        <!-- 上外边距，右外边距，下外边距，左外边距 -->
        <MDinput style="margin: 50px 0px 40px 0px;" v-model="form.receiver" :maxlength="100" name="name" required>收件人</MDinput>
        <MDinput style="margin: 40px 0px 40px 0px;" v-model="form.title" :maxlength="100" name="name" required>邮件标题</MDinput>
        <Tinymce style="margin: 40px 0px 20px 0px;" v-model="form.mail" :height="600"/>
        <el-button style="margin: 20px 0px 50px 0px;" type="primary" @click="submit">
          <svg-icon icon-class="guide" />
          发送
        </el-button>
      </el-col>
      <!-- 上内边距，右内边距，下内边距，左内边距 -->
      <el-col :span="20" style="padding: 0px 20px 50px 0px;" v-show="this.nowId === '2'">
        <el-table
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          @cell-click="handleClick">
          <el-table-column
            label="序号"
            min-width="40"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column
            label="发送时间"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.time | timeFilter }}
            </template>
          </el-table-column>
          <el-table-column
            label="发件人"
            min-width="50"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.sender }}
            </template>
          </el-table-column>
          <el-table-column
            label="邮件标题"
            min-width="200"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.title }}
            </template>
          </el-table-column>
          <el-table-column
            label="是否已读"
            min-width="50"
            align="center"
          >
            <template slot-scope="{row}">
              <el-tag :type="row.isread ? 'success' : 'danger'">
                {{ row.isread ? "已读" : "未读" }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          layout="total, prev, pager, next, jumper"
          :page-size="20"
          :pager-count="11"
          :total="total"
          style="text-align:center"
          @current-change="handleCurrentChange"
        />
      </el-col>
      <!-- 上内边距，右内边距，下内边距，左内边距 -->
      <el-col :span="20" style="padding: 0px 20px 50px 0px;" v-show="this.nowId === '3'">
        <el-table
          v-loading="listLoading2"
          :data="list2"
          border
          fit
          highlight-current-row
          @cell-click="handleClick2">
          <el-table-column
            label="序号"
            min-width="40"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column
            label="发送时间"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.time | timeFilter }}
            </template>
          </el-table-column>
          <el-table-column
            label="收件人"
            min-width="50"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.receiver }}
            </template>
          </el-table-column>
          <el-table-column
            label="邮件标题"
            min-width="200"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.title }}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          layout="total, prev, pager, next, jumper"
          :page-size="20"
          :pager-count="11"
          :total="total2"
          style="text-align:center"
          @current-change="handleCurrentChange2"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Tinymce from "./components/Tinymce";
import MDinput from "./components/MDinput";
import { MessageBox, Message } from "element-ui";
import { sendEmail, changeIsread } from "@/api/putdata";
import { getEmails,getEmailHistory } from "@/api/getdata";

export default {
  filters: {
    timeFilter(date){
      return date.substring(0, 10) + ' ' + date.substring(11, 19)
    }
  },
  name: "editEmail",
  components: {
    Tinymce,
    MDinput
  },
  data() {
    return {
      /* 导航栏 */
      nowId: "1", 
      /* 站内信编辑表格 */
      form: {
        receiver: "",
        title: "",
        mail: ""
      },
      /* 查看Email内容 */
      dialogTitle: "",
      emailTitle: "",
      sendTime: "",
      html: "",
      dialogVisible: false,
      /* 收件箱相关数据 */
      list: [{
        id: "1",
        time: "2019",
        sender: "ymx",
        receiver: "ymx",
        title: "NMSL",
        isread: true,
        mail: '<table style="border-collapse: collapse; width: 100%;" border="1"><tbody><tr><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td></tr><tr><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td></tr><tr><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td></tr><tr><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td></tr><tr><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td></tr><tr><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td></tr><tr><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td></tr><tr><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td></tr><tr><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td></tr></tbody></table><p><img src="https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/plugins/emoticons/img/smiley-frown.gif" alt="frown" /></p><p><strong><span style="background-color: #00ff00;">as<span style="text-decoration: underline;">dsadadsas</span></span></strong></p><p><span style="text-decoration: underline;"><strong><span style="background-color: #00ff00;">wefqwef<sup>222222</sup></span></strong></span></p><p><span style="text-decoration: underline;"><strong><span style="background-color: #00ff00;">asdfsa</span></strong></span></p><p>&nbsp;</p><ol><li><span style="text-decoration: underline;">sadf</span></li><li><span style="text-decoration: underline;">sadf</span></li><li><span style="text-decoration: underline;">sadf</span></li><li><span style="text-decoration: underline;">asdf</span></li></ol><ul><li><span style="text-decoration: underline;">aaa</span></li><li><span style="text-decoration: underline;">bbb</span></li><li>ccc</li></ul><p>03:54:55</p><p>&nbsp;</p><p><img src="https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=16445316a764034f1bc0ca54ceaa1254/dbb44aed2e738bd4eea32ffaad8b87d6267ff97f.jpg" alt="超大图片" width="2480" height="1299" /></p><p>&nbsp;</p><p>&nbsp;</p>'
      }],
      listLoading: true,
      total: 20,
      nowpage: 1,
      /* 发件箱相关数据 */
      list2: [{
        id: "1",
        time: "2019",
        sender: "ymx",
        receiver: "ymx",
        title: "NMSL",
        isread: true,
        mail: '<table style="border-collapse: collapse; width: 100%;" border="1"><tbody><tr><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td></tr><tr><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td></tr><tr><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td></tr><tr><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td></tr><tr><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td></tr><tr><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td></tr><tr><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td></tr><tr><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td></tr><tr><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td><td style="width: 33.3333%;">&nbsp;</td></tr></tbody></table><p><img src="https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/plugins/emoticons/img/smiley-frown.gif" alt="frown" /></p><p><strong><span style="background-color: #00ff00;">as<span style="text-decoration: underline;">dsadadsas</span></span></strong></p><p><span style="text-decoration: underline;"><strong><span style="background-color: #00ff00;">wefqwef<sup>222222</sup></span></strong></span></p><p><span style="text-decoration: underline;"><strong><span style="background-color: #00ff00;">asdfsa</span></strong></span></p><p>&nbsp;</p><ol><li><span style="text-decoration: underline;">sadf</span></li><li><span style="text-decoration: underline;">sadf</span></li><li><span style="text-decoration: underline;">sadf</span></li><li><span style="text-decoration: underline;">asdf</span></li></ol><ul><li><span style="text-decoration: underline;">aaa</span></li><li><span style="text-decoration: underline;">bbb</span></li><li>ccc</li></ul><p>03:54:55</p><p>&nbsp;</p><p><img src="https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=16445316a764034f1bc0ca54ceaa1254/dbb44aed2e738bd4eea32ffaad8b87d6267ff97f.jpg" alt="超大图片" width="2480" height="1299" /></p><p>&nbsp;</p><p>&nbsp;</p>'
      }],
      listLoading2: true,
      total2: 20,
      nowpage2: 1,
      /* 恶心至极的定时器 */
      interval: null
    };
  },
  created(){
    //console.log("!!!!!!!!")
    getEmails(1, 20).then(resp => {
      this.list = resp.data.items;
      this.total = resp.data.total;
      this.listLoading = false;
      //console.log(resp.data)
    })
    getEmailHistory(1, 20).then(resp => {
      this.list2 = resp.data.items;
      this.total2 = resp.data.total;
      this.listLoading2 = false;
      //console.log(resp.data)
    })

    this.interval = setInterval(() => {
      getEmails(this.nowpage, 20).then(resp => {
        this.list = resp.data.items;
        this.total = resp.data.total;
      })
      getEmailHistory(this.nowpage2, 20).then(resp => {
        this.list2 = resp.data.items;
        this.total2 = resp.data.total;
      })
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval);
    this.interval = null;
  },
  methods: {
    submit(){
      //console.log(this.form.mail)
      if(this.form.receiver.trim() == ""){
        Message({
          message: "收件人不能为空！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if(this.form.title.trim() == ""){
        Message({
          message: "邮件标题不能为空！",
          type: "error",
          duration: 1000
        });
        return;
      }
      sendEmail(this.form).then(resp => {
        //console.log(this.form)
        Message({
          message: "发送成功！",
          type: "success",
          duration: 1000
        });
      }).catch(error => {
        //console.log(error)
        Message({
          message: "发送失败！请检查收件人姓名是否填写正确？",
          type: "error",
          duration: 1000
        });
      })
    },
    handleSelect(index, indexPath){
      this.nowId = index;
    },
    handleClick(row, column, cell, event){
      if(row.isread === false){
        changeIsread(row.id, true).then(resp => {
          for(var i=0;;++i)
            if(this.list[i].id == row.id){
              this.list[i].isread = true;
              //console.log("!!!!!!!!!")
              break;
            }
        })
      }
      this.dialogTitle = "来自"+row.sender+"的信件";
      this.emailTitle = (row.title.length == 0 ? "（标题为空）" : row.title);
      this.sendTime = row.time;
      this.html =  (row.mail.length == 0 ? "（信件内容为空）" : row.mail);
      this.dialogVisible = true;
      //console.log(row);
    },
    handleClick2(row, column, cell, event){
      this.dialogTitle = "发给"+row.receiver+"的信件";
      this.emailTitle = (row.title.length == 0 ? "（标题为空）" : row.title);
      this.sendTime = row.time;
      this.html =  (row.mail.length == 0 ? "（信件内容为空）" : row.mail);
      this.dialogVisible = true;
      //console.log(row);
    },
    handleCurrentChange(val){
      this.nowpage = val;
      this.listLoading = true; //加载中
      getEmails(val,20).then(resp => {
        this.list = resp.data.items;
        this.total = resp.data.total;
        this.listLoading = false; //加载完成
        //console.log(resp.data)
      })
    },
    handleCurrentChange2(val){
      this.nowpage2 = val;
      this.listLoading2 = true; //加载中
      getEmailHistory(val,20).then(resp => {
        this.list2 = resp.data.items;
        this.total2 = resp.data.total;
        this.listLoading2 = false; //加载完成
        //console.log(resp.data)
      })
    }
  }
};
</script>

<style>
/* 该CSS样式主要用来处理文字换行问题 */
.dialog-style {
  /* height: auto; */
  top: -10%; /* 调整页面上边距 */
  word-wrap:break-word; /* 只对英文起作用，以单词作为换行依据 */
  word-break:break-all; /* 只对英文起作用，以字母作为换行依据 */
  white-space:pre-wrap; /* 只对中文起作用，强制换行 */
  overflow: auto; /* 如果对话框太大，超越了屏幕，那么显示滚动条，一般情况下不会出现这种情况，因为我们设定了dialog-content-style限制了它的高度 */
  /* overflow: hidden; 这是什么傻逼玩意！！溢出屏幕的部分隐藏？？狗屁！ */
}

.dialog-content-style {
  height: 600px;
  overflow: auto;
}
</style>