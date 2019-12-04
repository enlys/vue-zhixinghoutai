<template>
  <div class="addarticle">
    <el-row>
      <el-col :span="4">
        <div class="tian">
          <el-button type="primary" icon="el-icon-back" @click="goback">返回</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="tian">
          选择类别：
          <el-select v-model="category" placeholder="请选择">
            <el-option v-for="item in list" :key="item._id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="tian">
          上传文章图标：
          <a href="javascript:;" class="upload">
            选择文件
            {{filename}}
            <input
              class="change"
              type="file"
              multiple="multiple"
              @change="getFile($event)"
            />
          </a>

          <el-button type="primary" icon="el-icon-edit" @click="submitflie($event)">提交</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="tian">
          <el-input v-model="title" placeholder="请输入文章标题"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <mavon-editor v-model="content" ref="md" @change="change" style="min-height: 600px" />
        <br />
        <el-button type="primary" icon="el-icon-edit" @click="submit">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  components: {
    mavonEditor
  },
  data() {
    return {
      content: "", // 输入的markdown
      html: "", // 及时转的html
      list: [],
      category: "",
      title: "",
      file: "",
      filename: "",
      icon: null
    };
  },
  mounted() {
    this.getlist();
  },
  methods: {
    // 所有操作都会被解析重新渲染
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
    goback() {
      this.$router.push({ name: "article" });
    },
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render;
    },
    // 提交
    submit() {
     
      if (
        this.title != "" &&
        this.content != "" &&
        this.category != "" &&
        this.icon != null
      ) {
        this.axios
          .post(
            "/api/article/add",
            this.qs.stringify({
              title: this.title,
              content: this.content,
              category: this.category,
              icon: this.icon,
              html: this.html
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
                message: "添加成功！",
                type: "success"
              });
               this.$router.push({
                 name:'article'
               })
            } else {
              this.$message({
                message: "添加失败！",
                type: "warning"
              });
            }

            
          })
          .catch(error => {
            this.$message("添加失败！");
          });
      } else {
        this.$message("输入不完整！");
      }
    },

    getFile(event) {
      this.file = event.target.files[0];
      this.filename = this.file.name;
    },
    submitflie(event) {
      event.preventDefault(); //取消默认行为
      //创建 formData 对象
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", this.file);

      this.axios
        .post("/api/file/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          let up = res.data;
          if (up.filename) {
            this.icon = "http://127.0.0.1:4000/uploads/" + up.filename;

            this.$message({
              message: "上传完成！",
              type: "success"
            });
          } else {
            this.$message("上传失败！");
          }
        })
        .catch(error => {
          this.$message("上传失败！");
        });

      /*
  http.uploadFile("http://127.0.0.1:4000/file/upload",formData).then(function (response) {
    console.log("res: ",response);
  })*/
    }
  }
};
</script>

<style lang='scss' scoped>
.addarticle {
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
}

.upload {
  padding: 4px 10px;
  height: 36px;
  line-height: 36px;
  font-size: 20px;
  position: relative;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  text-decoration: none;
  color: #59595a;
  margin: 0 2px;
}
.change {
  position: absolute;
  overflow: hidden;
  right: 0;
  top: 0;
  opacity: 0;
}
</style>