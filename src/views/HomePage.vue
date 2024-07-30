<template>
  <el-container style="height: 100vh;">
    <!-- 左侧菜单栏 -->
    <el-aside :width="menuWidth" class="aside" :style="{ display: menuVisible ? 'block' : 'none' }">
      <el-menu :default-active="activeIndex" class="menu" mode="vertical">
        <el-menu-item index="1">菜单一</el-menu-item>
        <el-menu-item index="2">菜单二</el-menu-item>
        <el-menu-item index="3">菜单三</el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 主体内容区 -->
    <el-container>
      <!-- 顶部菜单栏 -->
      <el-header class="header">
        <div class="header-content">
          <div class="logo">我的应用</div>
          <el-button class="menu-toggle" @click="toggleMenu">☰</el-button>
        </div>
        <el-menu class="top-menu" mode="horizontal" :default-active="activeIndex">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">功能二</el-menu-item>
          <el-menu-item index="3">功能三</el-menu-item>
        </el-menu>
        <div class="user-info">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <img src="https://via.placeholder.com/40" class="avatar" />
              <span>用户名</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 主体内容 -->
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue';

const activeIndex = ref('1');
const menuVisible = ref(true);
const menuWidth = '200px';

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};
</script>

<style scoped>
/* 整体布局 */
.el-container {
  height: 100vh;
}

/* 左侧菜单栏 */
.aside {
  background-color: #f4f4f4;
  border-right: 1px solid #ddd;
}

.menu {
  height: 100%;
}

.menu .el-menu-item {
  font-size: 16px;
}

/* 顶部菜单栏 */
.header {
  background-color: #409EFF;
  color: #fff;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ddd;
  height: 60px;
  position: relative;
}

.header-content {
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 100%;
}

.logo {
  font-size: 18px;
  font-weight: bold;
  flex: 1;
}

.top-menu {
  background-color: #409EFF;
  color: #fff;
  margin-top: 10px;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  border-radius: 50%;
  margin-right: 10px;
}

/* 主体内容 */
.main {
  padding: 20px;
}

/* 菜单切换按钮 */
.menu-toggle {
  font-size: 20px;
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 20px;
  display: none; /* 隐藏在桌面视图中 */
}

/* 在小屏幕中显示菜单切换按钮 */
@media (max-width: 768px) {
  .menu-toggle {
    display: inline-block;
  }

  .aside {
    display: block;
  }
}
</style>
