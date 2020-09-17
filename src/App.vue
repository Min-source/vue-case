<template>
  <div id="app">
    <el-container>
      <!-- 头部 -->
      <el-header class="top">{{title}}</el-header>
      <el-container>
        <!-- 左侧栏 -->
        <el-aside class="left" style="width:200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="rgba(255,255,240,0.3)"
            text-color="#000"
            active-text-color="#8B4726"
            @select="selectHandler">
            <!-- <el-submenu index="1"> -->
              <!-- <template slot="title">
                <i class="el-icon-menu"></i>
                <span>顾客管理</span>
              </template>
              <el-menu-item-group> -->
                <!-- <template slot="title">分组一</template> -->
                <!-- <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group> -->
            <!-- </el-submenu> -->
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">顾客管理</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">栏目管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-menu"></i>
              <span slot="title">产品管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 内容区 -->
        <el-main class="content">
          <!-- 动态组件 -->
          <component v-bind:is="currentView"></component>
        </el-main>
      </el-container>
      <el-footer class="bottom">bottom</el-footer>
    </el-container>
  </div>
</template>

<script>
import Customer from './views/Customer'
import Category from './views/Category'
import Product from './views/Product'
export default {
  name: 'app',
  data(){
    return{
      title:"HELLO",
      currentView:"Customer",
      currentViewName:"顾客管理",
      loading: false
    }
  },
  components: {
    Customer,
    Category,
    Product
  },
  methods:{
    selectHandler(index){
      switch(index){
        case "1":
          this.currentView="Customer"
          this.currentViewName="顾客管理"
          break;
        case "2":
          this.currentView="Category"
          this.currentViewName="栏目管理"
          break;
        case "3":
          this.currentView="Product"
          this.currentViewName="产品管理"
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style>
#app {

}
</style>
