<template>
  <div class="addvideo">
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
      <el-col :span="24" style="width:100%;height:100%;">
        <div class="tian">
          上传视频图标：
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
        <div class="tian">
         
          <el-input type="textarea" :rows="2" placeholder="请输入简介" v-model="brief"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="content">
          <div class="zhangjie">章节目录</div>
          <div class="list" v-for="(items,i) in content" :key="i">
            <h3>{{items.subheading}}</h3>
            <div style="display:flex;">
              <b>视频地址：</b>
              {{items.itemvideo}}
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="content">
          <div class="zhangjie">添加章节</div>
          <div class="addvideo">
            <el-input v-model="item.subheading" placeholder="章节标题" style="width:100%;"></el-input>
            <div class="tian">
              上传视频：
              <a href="javascript:;" class="upload">
                选择文件
                {{videoname}}
                <input
                  class="change"
                  type="file"
                  multiple="multiple"
                  @change="getvideo($event)"
                />
              </a>

              <el-button type="primary" icon="el-icon-edit" @click="submitvideo($event)">上传</el-button>
            </div>
          </div>
          <el-button type="primary" icon="el-icon-check" @click="push()">添加</el-button>
        </div>
      </el-col>
    </el-row>
     <el-button type="primary" icon="el-icon-edit" @click="submit">提交</el-button>
  </div>
</template>

<script>
import { cornsilk } from 'color-name';
export default {
  data() {
    return {
      list: [],
      category: "",
      file: "",
      filename: "",
      videoname: "",
      video: "",
      icon: null,
      title: "",
      brief:'',
      content: [],
      item: {
        subheading: "",
        itemvideo: ""
      }
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
    goback() {
      this.$router.push({ name: "videolist" });
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
    },
    getvideo(event) {
      this.video = event.target.files[0];
      this.videoname = this.video.name;
      
    },

    submitvideo(event) {
      event.preventDefault(); //取消默认行为
      //创建 formData 对象
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", this.video);

       let loadingsss = this.$loading({
        lock: true,
        text: "上传中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

      this.axios
        .post("/api/file/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          let up = res.data;
         
          if (up.filename) {
            this.item.itemvideo =
              "http://127.0.0.1:4000/uploads/" + up.filename;
            this.$message({
              message: "上传完成！",
              type: "success"
            });
            this.video = "";
            this.videoname = "";
            loadingsss.close();
          } else {
            this.$message("上传失败！");
          }
        })
        .catch(error => {
          this.$message("上传失败！");
        });
    },
    push() {
      if (this.item.subheading != "") {
       
        this.content.push(this.item);
       
        this.item = {
          subheading: "",
          itemvideo: ""
        };
      } else {
        this.$message("信息填写不完整！");
      }
    },
    submit(){
        console.log(this.category,this.brief,this.title);

        if(this.category!=''&&this.brief!=''&&this.title!=''){


          this.axios
          .post(
            "/api/video/add",
            this.qs.stringify({
              title: this.title,
              content: this.content,
              category: this.category,
              icon: this.icon,
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
            console.log(cc);
            if (cc.code == 0) {
              this.$message({
                message: "添加成功！",
                type: "success"
              });
               this.$router.push({
                 name:'videolist'
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




        }else{
          this.$message({
            message:"信息填写不完整！",
            type:"warning"
          })
          }
    }
  }
};
</script>

<style lang='scss' scoped>
.addvideo {
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
.content {
  width: 100%;
  padding: 5px;
  background: #ffffff;
  border-radius: 4px;
  margin: 10px auto;
  .zhangjie {
    border-bottom: 1px solid #d7d8d9;
    margin-bottom: 5px;
    padding: 5px;
    font-size: 24px;
    font-weight: bold;
  }
  .list {
    padding: 10px 20px;
    margin: 5px 0;
    background: #f9f9f9;
    border-radius: 3px;
    font-size: 18px;
    line-height: 21px;
  }
  .addvideo {
    font-size: 18px;
    line-height: 40px;
    padding: 5px;
    margin-bottom: 10px;
    text-align: left;
  }
}
</style>