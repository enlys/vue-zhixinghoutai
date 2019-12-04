<template>
  <div class="videolist">
    <el-row>
      <el-col :span="4">
        <div class="tian">
          <el-button type="primary" icon="el-icon-edit" @click="write">添加</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="width:100%;">
        <div class="content">
          <div class="list">
            <div class="name">序号</div>
            <div class="brief" style="text-align: center;">标题</div>
            <div class="name">分类</div>
            <div class="caozuo" style="text-align: center;">操作</div>
          </div>
          <div class="list" v-for="item in list" :key="item._id">
            <div class="name">{{item._id}}</div>
            <div class="brief">{{item.title}}</div>
            <div class="name">{{item.category}}</div>
            <div class="caozuo">
                <el-button type="success" size="mini" @click="chan(item._id)">详情</el-button>
              <el-button type="danger" size="mini" @click="deletebyid(item._id)">删除</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="footerart">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageNum"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      pageNum: 1,
      pageSize: 20,
      totalCount: 0
    };
  },
  mounted() {
    this.getlist(1);
  },
  methods: {
    write() {
      this.$router.push({ name: "addvideo" });
    },
    getlist(pageNum) {
      this.axios
        .post(
          "/api/video/list",
          this.qs.stringify({
            pageNum: pageNum,
            pageSize: this.pageSize
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          // console.log(res.data);
          let ss = res.data;
          if (ss.code == 0) {
            this.list = ss.data;
            this.totalCount = ss.totalCount;
          } else {
            this.$message("获取失败！");
          }
        })
        .catch(error => {
          this.$message("获取失败！");
        });
    },
    deletebyid(id) {
      this.axios
          .post(
            "/api/video/delete",
            this.qs.stringify({
              id:id
            }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }
          )
          .then(res => {
            let cc = res.data;
            // console.log(cc);
            if (cc.code == 0) {
              this.$message({
                message: "删除成功！",
                type: "success"
              });


               if(this.pageNum>Math.ceil((this.pageNum-1)/20)){
                 this.pageNum--;

               }
              this.getlist(this.pageNum);
              
            } else {
              this.$message({
                message: "删除失败！",
                type: "warning"
              });
            }

           
          })
          .catch(error => {
            this.$message("删除失败！");
          });
    },
     handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum=val;
      this.getlist(val);
    },
    chan(id){
       this.$router.push({
          name: "itemvideo",
          params: {
            id: id
          }
       })
    }

  }
};
</script>

<style lang='scss' scoped>
.videolist {
  width: 100%;
  overflow-x: hidden;
  padding: 20px;
  box-sizing: border-box;
  color: #59595a;
  .tian {
    font-size: 18px;
    line-height: 24px;
    padding: 5px;
    margin-bottom: 10px;
    text-align: left;
  }
  .content {
    width: 100%;
    padding: 5px;
    background: #ffffff;
    border-radius: 4px;
    min-height: 600px;
    .list {
      width: 100%;
      font-size: 16px;

      line-height: 18px;
      margin-bottom: 5px;
      border-bottom: 1px solid #d7d8d9;
      display: flex;
      .name {
        width: 20%;
      }
      .caozuo {
        width: 20%;
      }
      .brief {
        width: 40%;
        white-space: normal;
        word-break: break-all;
        text-align: left;
      }
    }
    .list:hover {
      background: #eeeeee;
    }
  }
  .footerart {
    position: absolute;
    bottom: 15px;
    margin: 10px auto;
    left: 30%;
  }
}

.el-button--mini,
.el-button--mini.is-round {
  padding: 4px 5px;
}
</style>