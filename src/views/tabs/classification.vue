<template>
  <div class="classification">
    <el-row>
      <el-col :span="4">
        <div class="tian">
          <el-button type="primary" icon="el-icon-edit" @click="dialogVisible = true">添加</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24" style="width:100%;">
        <div class="content">
          <div class="list">
            <div class="name">名称</div>
            <div class="brief" style="text-align: center;">简介</div>
            <div class="caozuo" style="text-align: center;">操作</div>
          </div>
            <div class="list" v-for="item in list" :key="item._id">
             <div class="name">{{item.name}}</div>
            <div class="brief">{{item.brief}}</div>
            <div class="caozuo">
                 <el-button type="danger"  size="mini" @click="deletebyid(item._id)">删除</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="添加分类" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-input placeholder="请输入名称" v-model="name" clearable></el-input>
      <div style="margin: 10px 0;"></div>
      <el-input type="textarea" autosize placeholder="请输入简介" v-model="brief"></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      name: "",
      brief: "",
      list: []
    };
  },
  mounted() {
    this.getlist();
  },
  methods: {
    getlist() {
      this.axios
        .get(
          "/api/category/list",

          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
        //    console.log(res.data);
          let ss = res.data;
          if (ss.code == 0) {
            this.list = ss.list;
          } else {
            this.$message("获取失败！");
          }
        })
        .catch(error => {
          this.$message("获取失败！");
        });
    },
    submit() {
      if (this.name != "" && this.brief != "") {
        this.axios
          .post(
            "/api/category/add",
            this.qs.stringify({
              name: this.name,
              brief: this.brief
            }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }
          )
          .then(res => {
            let cc = res.data;
            if (cc.code == 0) {
              this.$message({
                message: "添加成功！",
                type: "success"
              });
              this.getlist();
              this.name = "";
              this.brief = "";
            } else {
              this.$message({
                message: "添加失败！",
                type: "warning"
              });
            }

            this.dialogVisible = false;
          })
          .catch(error => {
            this.$message("添加失败！");
          });
      } else {
        this.$message({
          message: "请输入有效值！",
          type: "warning"
        });
      }
    },
    deletebyid(id){
        console.log(id);
         this.axios
          .post(
            "/api/category/delete",
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
            console.log(cc);
            if (cc.code == 0) {
              this.$message({
                message: "删除成功！",
                type: "success"
              });
              this.getlist();
              
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
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>




<style lang='scss' scoped>
.classification {
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
      min-height: 600px;
      background: #ffffff;
       border-radius: 4px;
    .list {
      width: 100%;
      font-size: 16px;
      
      line-height: 18px;
      margin-bottom: 5px;
      border-bottom: 1px solid #d7d8d9;
      display: flex;
      .name {
        width: 30%;
      }
      .caozuo{
           width: 20%;
      }
      .brief {
        width: 50%;
         white-space: normal;
      word-break: break-all;
      text-align: left;
      }
    }
    .list:hover {
      background: #eeeeee;
    }
  }
}

.el-button--mini,
.el-button--mini.is-round {
  padding: 4px 5px;
}
</style>