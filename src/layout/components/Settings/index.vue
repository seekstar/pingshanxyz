<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">设置</h3>

      <div class="drawer-item">
        <span>页面标签开关</span>
        <el-switch v-model="tagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>固定标头</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>政府标志</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>模拟测试</span>
        <el-switch v-model="test" class="drawer-switch" @change="testChange" />
      </div>
      <div class="drawer-item">
        <span>短信测试</span>
        <el-switch v-model="phone" class="drawer-switch" @change="testPhone" />
      </div>
      <div class="drawer-item">
        <span>清理测试</span>
        <el-button  class="drawer-switch" type="danger" icon="el-icon-delete" @click="testClean" size="mini" round />
      </div>

    </div>
  </div>
</template>

<script>
import {startTest,stopTest,cleanTest,getTest,startPhone,stopPhone,getPhone} from '@/api/test'
import getters from '../../../store/getters'
export default {
  data() {
    return {test:false,
    phone:false}
  },
  created:function(){
    getTest().then(resp=>{this.test=resp.data})
    getPhone().then(resp=>{this.phone=resp.data})
  },
  computed: {
    fixedHeader: {
      get() {
        return this.$store.state.settings.fixedHeader
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'fixedHeader',
          value: val
        })
      }
    },
    tagsView: {
      get() {
        return this.$store.state.settings.tagsView
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'tagsView',
          value: val
        })
      }
    },
    sidebarLogo: {
      get() {
        
        return this.$store.state.settings.sidebarLogo
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'sidebarLogo',
          value: val
        })
      }
  }
  },
  
  methods: {
    testChange(val){
      if(val)startTest()
      else stopTest()
    },
    testPhone(val){
      if(val)startPhone()
      else stopPhone()
    },
    testClean(){
     cleanTest()
    }
  }
}
  
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }
}
</style>
