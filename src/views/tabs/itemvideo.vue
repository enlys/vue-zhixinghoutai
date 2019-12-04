<template>
  <div class="itemvideo">
    <el-row>
      <el-col :span="4">
        <div class="tian">
          <el-button type="primary" icon="el-icon-back" @click="goback">返回</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="title">{{data.category}}:{{data.title}}</div>
        <div class="biref">简介：{{data.brief}}</div>
        <div class="biref" v-for="(item,i) in data.content" :key="item._id">
          <div class="biaoti">第{{i+1}}章：{{item.subheading}}</div>
          <a :href="item.itemvideo">
            <i class="el-icon-video-camera"></i>&nbsp;立即观看
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      data: {}
    };
  },
  mounted() {
    this.getitme();
  },
  methods: {
    goback() {
      this.$router.push({ name: "videolist" });
    },
    getitme() {
      this.axios
        .get(
          "/api/video/item",
          {
            params: {
              id: this.id
            }
          },

          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          console.log(res.data);
          let ss = res.data;
          if (ss.code == 0) {
            this.data = ss.data;
          } else {
            this.$message("获取失败！");
          }
        })
        .catch(error => {
          this.$message("获取失败！");
        });
    }
  }
};
</script>

<style lang='scss' scoped>
.itemvideo {
  width: 100%;
  overflow-x: hidden;
  padding: 20px;
  box-sizing: border-box;
  color: #59595a;
  text-align: left;
  .tian {
    font-size: 18px;
    line-height: 40px;
    padding: 5px;
    margin-bottom: 10px;
    text-align: left;
    display: flex;
  }
  .title {
    background: #ffffff;
    border-radius: 10px;
    line-height: 40px;
    font-size: 24px;
    font-weight: bold;
    padding: 0 10px;
    margin: 10px 0;
  }
  .biref {
    margin-bottom: 8px;
    padding: 24px 32px 32px;
    background: #fff;
    font-size: 18px;
    line-height: 28px;
    box-shadow: 0 8px 16px 0 rgba(7, 17, 27, 0.1);
    border-radius: 12px;
    .biaoti {
      font-size: 16px;
      font-weight: bold;
      line-height: 24px;
    }
    a {
      text-decoration: none;
      color: #333;
      font-size: 14px;
    }
  }
}
</style>