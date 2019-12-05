<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import { Message } from 'element-ui';
import { getAbnormalData,getDataVersion } from "@/api/getdata";


export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  data(){
    return {
      allErrorLog: [],
      nowErrorLog: [],
      interval: null,
      interval2: null
    }
  },
  beforeMount(){
    this.interval = setInterval( () => {
      getDataVersion().then(resp => {
        if(this.version != resp.data){
          this.version = resp.data;
          this.setAbnormalData();//实时更新异常数据
        }
      })
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
    clearInterval(this.interval2)
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    setAbnormalData(){
      getAbnormalData().then(resp => {
        for(let item of resp.data){
          if(this.allErrorLog.indexOf(item) == -1){
            this.$store.dispatch('errorLog/addErrorLog', { err: { message: item } });
            this.allErrorLog.push(item);
            this.nowErrorLog.push(item);
            if(this.interval2 === null){
              /* 先执行一次 */
              Message({
                message: this.nowErrorLog[0],
                type: "error",
                duration: 5 * 1000
              });
              this.nowErrorLog = this.nowErrorLog.slice(1);

              /* 设置定时器，每个5000ms都是上次error消息的显示时间 */
              this.interval2 = setInterval( () => {
                if(this.nowErrorLog.length == 0){
                  clearInterval(this.interval2);
                  this.interval2 = null;
                  return;
                }else{
                  Message({
                    message: this.nowErrorLog[0],
                    type: "error",
                    duration: 5 * 1000
                  });
                  this.nowErrorLog = this.nowErrorLog.slice(1);
                }
              }, 5000)
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
