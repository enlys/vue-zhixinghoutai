<template>
  <div class="home">
    <div class="nav">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple1" style="padding-top:1.5%;  box-sizing: border-box;">
            知&nbsp;&nbsp; 行&nbsp;&nbsp;后&nbsp;&nbsp;台
            <i class="el-icon-s-fold" @click="qiehuan" ></i>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple4">
          
            <i class="el-icon-close" @click="tuichu"  style="padding-top:1.5%;padding-left:15px;  box-sizing: border-box;"></i>
            <div style="padding-top:1.5%;  box-sizing: border-box;">{{"  "+user}}</div>
          
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="abstract">
      <div class="menu">
        <el-menu
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          background-color="#596164"
          text-color="#fff"
          active-text-color="#b8c7ce"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span slot="title" style="color:#fff;">系统首页</span>
            </template>
            <el-menu-item index="2-1">
              <router-link to="/system">系统状态</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-help"></i>
              <span slot="title" style="color:#fff;">课程管理</span>
            </template>
            <el-menu-item index="2-1" >
              <router-link to="/classification">分类列表</router-link>
            </el-menu-item>
             <el-menu-item index="2-2" >
              <router-link to="/article">文章管理</router-link>
            </el-menu-item>
             <el-menu-item index="2-3" >
              <router-link to="/videolist">视频管理</router-link>
            </el-menu-item>
            
          </el-submenu>
            <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-coin"></i>
              <span slot="title" style="color:#fff;">帖子管理</span>
            </template>
            <el-menu-item index="2-1" >
              <router-link to="/postlist">帖子列表</router-link>
            </el-menu-item>
           
          </el-submenu>
             <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-warning-outline"></i>
              <span slot="title" style="color:#fff;">用户管理</span>
            </template>
            <el-menu-item index="2-1" >
              <router-link to="/userlist">用户列表</router-link>
            </el-menu-item>
            
          </el-submenu>

         
        </el-menu>
      </div>
      <div class="zhupanel">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "home",
  components: {
    // HelloWorld
  },
  data() {
    return {
      user: "",
      isCollapse: false
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user")).username;
   


    /*
window.open('https://192.168.88.19/Report/ssssdadasd_201910141731088130.zip','_blank')*/

    /*  this.axios
        .post(
          "/api/html/scanleak/scantasklist/list",
          this.qs.stringify({
        lang:'zh_CN',
        limit:30
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
           
            }
          }
        )
        .then(res => {
         console.log(res.data);
        })
        .catch(error => {
          this.$message("获取失败！");
        });*/

    /* this.axios
        .post(
          "/api/html/autoreport/create/zh_CN",
          this.qs.stringify({
       taskId: 7,
reportTemplate: 2,
reportType: 2,
report_name: 'ssssdadasd',
report_desc: 'ssssdadasd',
report_title: '漏洞扫描系统',
task_id: 7,
report_type: 2,
report_template: 2,
iplist: '',
vullevel: '',
block: '',
weaklist: '',
report_title: '漏洞扫描系统',
lang: 'zh_CN'
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
           
            }
          }
        )
        .then(res => {
         console.log(res.data);
        })
        .catch(error => {
          this.$message("删除失败！");
        });*/
  },
  methods: {
    tuichu() {
      localStorage.setItem("user", JSON.stringify({ username: "" }));
      this.$router.push({ name: "login" });
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    qiehuan() {
      this.isCollapse = !this.isCollapse;
    },
   
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .nav {
    width: 100%;
    height: 5%;
    font-size: 18px;
   background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    color: #fff;
    .bg-purple {
      height: 10px;
      line-height: 100%;
      font-weight: bold;
    }
    .bg-purple1 {
      height: 100%;
      
      font-weight: bold;
       display: flex;
      align-items: center;
      padding-left: 30px;
    }
    .bg-purple4 {
      height: 100%;
       box-sizing: border-box;
    
      font-weight: bold;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      padding-right: 20px;
    }
  }
  .abstract {
    width: 100%;
    height: 95%;
    display: flex;

    .menu {
     
      height: 100%;
      background: #596164;
    }
    .zhupanel {
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
  
 
  //  background: #4F52BA;
}
.el-submenu__title i {
  color: #fff;
}
.el-menu-item i {
  color: #fff;
}

a {
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  width: 100%;
  height: 100%;
  display: block;
  &.router-link-exact-active {
   color: #b8c7ce;
  }
}


.el-menu-item {
    font-size: 14px;
    color: #303133;
    text-align: center;
    padding: 0 20px;
    cursor: pointer;
    -webkit-transition: border-color .3s,background-color .3s,color .3s;
    transition: border-color .3s,background-color .3s,color .3s;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}







.zhupanel::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
  scrollbar-arrow-color: red;
}
.zhupanel::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 1em;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
  scrollbar-arrow-color: red;
}
.zhupanel::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 1em;
  background: rgba(0, 0, 0, 0.1);
}
</style>

