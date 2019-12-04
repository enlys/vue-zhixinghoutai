<template>
  <div class="userlist">
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
            <div class="name">用户名</div>
            <div class="name" style="text-align: center;">邮箱</div>
            <div class="caozuo" style="text-align: center;">权限</div>
            <div class="caozuo" style="text-align: center;">状态</div>

            <div class="caozuo" style="text-align: center;">操作</div>
          </div>
          <div class="list" v-for="item in list" :key="item._id">
            <div class="name">{{item.username}}</div>
            <div class="caozuo">{{item.email}}</div>
            <div class="caozuo">
              <div v-if="item.role==2">
                <el-button type="success" size="mini">管理员</el-button>
              </div>
              <div v-else>
                <el-button type="success" size="mini">用户</el-button>
              </div>
            </div>
            <div class="caozuo">
              <div v-if="item.enable">
                <el-button type="success" size="mini">正常</el-button>
              </div>
              <div v-else>
                <el-button type="danger" size="mini">禁用</el-button>
              </div>
            </div>

            <div class="caozuo">
              <div v-if="item.role==1">
                <el-button type="success" size="mini" @click="shen(item._id)">提权</el-button>
              </div>
              <div v-if="item.enable">
                <el-button type="danger" size="mini" @click="enable(item._id)">禁用</el-button>
              </div>

              <el-button type="danger" size="mini" @click="deletebyid(item._id)">删除</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-input placeholder="请输入用户名" v-model="username" clearable></el-input>
      <div style="margin: 10px 0;"></div>
      <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
      <div style="margin: 10px 0;"></div>
      <el-input placeholder="请输入邮箱地址" v-model="email"></el-input>

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
      username: "",
      password: "",
      email: "",
      list: []
    };
  },
  mounted() {
    this.getlist();
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    submit() {
      if (this.username != "" && this.password != "" && this.email != "") {
        this.axios
          .post(
            "/api/users/adduser",
            this.qs.stringify({
              username: this.username,
              password: this.password,
              email: this.email
            }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }
          )
          .then(res => {
            console.log(res);
            let cc = res.data;
            if (cc.code == 0) {
              this.$message({
                message: "添加成功！",
                type: "success"
              });
            } else {
              this.$message({
                message: "添加失败！",
                type: "warning"
              });
            }
            this.dialogVisible = false;
            this.getlist();
          })
          .catch(error => {
            this.$message("添加失败！");
          });
      } else {
        this.$message("信息输入不完整！");
      }
    },
    getlist() {
      this.axios
        .get(
          "/api/users/list",

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
    deletebyid(id) {
      this.axios
        .post(
          "/api/users/delete",
          this.qs.stringify({
            id: id
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
    shen(id) {
      this.axios
        .post(
          "/api/users/administration",
          this.qs.stringify({
            id: id
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
              message: "提权成功！",
              type: "success"
            });
            this.getlist();
          } else {
            this.$message({
              message: "提权失败！",
              type: "warning"
            });
          }
        })
        .catch(error => {
          this.$message("提权失败！");
        });
    },
    enable(id) {
      this.axios
        .post(
          "/api/users/enable",
          this.qs.stringify({
            id: id
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
              message: "操作成功！",
              type: "success"
            });
            this.getlist();
          } else {
            this.$message({
              message: "操作失败！",
              type: "warning"
            });
          }
        })
        .catch(error => {
          this.$message("操作失败！");
        });
    }
  }
};
</script>

<style  lang='scss' scoped>
.userlist {
  width: 100%;
  overflow-x: hidden;
  padding: 20px;
  box-sizing: border-box;
  color: #59595a;
  text-align: left;
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
      text-align: center;
      .name {
        width: 20%;
      }
      .caozuo {
        width: 20%;
        display: flex;
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