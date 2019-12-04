<template>
  <div class="system">
    <el-row>
      <el-col :span="24">
        <div class="welcome">欢迎管理员：{{user}} 当前时间:{{msg}}</div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="tongji">
          <div class="tit">数据统计</div>
          <el-row :gutter="10">
            <el-col :span="6">
              <el-card shadow="hover">
                文章
                <br />
                 <div class="count">
                  66
                </div>
               
              </el-card>
            </el-col>
             <el-col :span="6">
              <el-card shadow="hover">
                视频
                <br />
                <div class="count">
                  66
                </div>
               
              </el-card>
            </el-col>
             <el-col :span="6">
              <el-card shadow="hover">
                帖子
                <br />
                 <div class="count">
                  66
                </div>
               
              </el-card>
            </el-col>
             <el-col :span="6">
              <el-card shadow="hover">
                用户
                <br />
                 <div class="count">
                  66
                </div>
               
              </el-card>
            </el-col>
            
          </el-row>

        </div>
      </el-col>
    </el-row>
      <el-row :gutter="20">
      <el-col :span="12">
        <div class="systemstatus" id="myrick" :style="{width: '100%', height: '500px'}"></div>
      </el-col>
      <el-col :span="12">
        <div class="systemstatus" id="myChart" :style="{width: '100%', height: '500px'}"></div>
      </el-col>
    </el-row>
     <el-row>
      <el-col :span="24">
        <div class="footer">© Enly whxy.com, 2019</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "home",
  components: {
    // HelloWorld
  },
  data() {
    return {
      user: "",
      msg: "",
      isCollapse: false
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user")).username;
    const timeget = setInterval(() => {
      this.getDate();
    }, 1000);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timeget);
    });
    this.drawLine();
    this.brawrisk();
  },
  methods: {
    getDate() {
      //获取当前时间
      var dt = new Date();
      //格式化为本地时间格式
      function extra(x) {
        //如果传入数字小于10，数字前补一位0。
        if (x < 10) {
          return "0" + x;
        } else {
          return x;
        }
      }

      var year = dt.getFullYear();
      var month = dt.getMonth() + 1; //(0-11,0代表1月)
      var date = dt.getDate(); //获取天

      var hour = dt.getHours(); //获取时
      var minute = dt.getMinutes(); //获取分
      var second = dt.getSeconds(); //获取秒
      //分秒时间是一位数字，在数字前补0。

      minute = extra(minute);
      second = extra(second);
      this.msg =
        year +
        "-" +
        month +
        "-" +
        date +
        "  " +
        hour +
        ":" +
        minute +
        ":" +
        second;
    },
     brawrisk(){
      let myChart = this.$echarts.init(document.getElementById("myrick"));
      // 绘制图表
      myChart.setOption({
        backgroundColor: "#fff",
        title: {
          text: "课程统计",
          x: "center",
          top: "10px",
          textStyle: {
            fontSize: 20,
            fontWeight: "bolder",
            color: "#59595a" // 主标题文字颜色
          }
        },
        color: ["#E6A23C","#F56C6C","#B0F85E","#409EFF"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["HTML", "JS", "Vue", "React","Node.js","Php"],
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: "rgb(172, 198, 217)"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",

            axisLine: {
              lineStyle: {
                color: "rgb(172, 198, 217)"
              }
            }
          }
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            barWidth: "20%",
            data: [
             15,60,32,18,25,6
            ],
            itemStyle: {
              normal: {
                // barBorderRadius: 10,
               /* color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#3977E6" },

                  { offset: 1, color: "#37BBF8" }
                ])*/
                   color: function(params) {
                        // build a color map as your need.
                        //定义一个颜色集合
                        let colorList = [ "#E6A23C","#F56C6C","#409EFF","#B0F85E","#67C23A","#b8c7ce"];
                        //对每个bar显示一种颜色
                        return colorList[params.dataIndex]
                    },
              },
              emphasis: {
                barBorderRadius: 10
              }
            }
          }
        ]
      });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例

      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        backgroundColor: "#fff",
        title: {
          text: "用户趋势",
          x: "center",
          top: "10px",
          textStyle: {
            fontSize: 20,
            fontWeight: "bolder",
            color: "#59595a" // 主标题文字颜色
          }
        },
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["注册量", "近一周", "近一月", "近半年"],
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: "rgb(172, 198, 217)"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",

            axisLine: {
              lineStyle: {
                color: "rgb(172, 198, 217)"
              }
            }
          }
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            barWidth: "20%",
            data: [
             10000,587,2311,3356
            ],
            itemStyle: {
              normal: {
                barBorderRadius: 10,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#3977E6" },

                  { offset: 1, color: "#37BBF8" }
                ])
              },
              emphasis: {
                barBorderRadius: 10
              }
            }
          }
        ]
      });
    }
  }
};
</script>



<style lang='scss' scoped>
.system {
  width: 100%;

  overflow-x: hidden;
  padding: 20px;
  box-sizing: border-box;
  color: #59595a;
  .welcome {
    text-align: left;
    font-size: 18px;
    line-height: 24px;
    height: 24px;
    padding: 10px;
    background: #ffffff;
    border-radius: 5px;
    margin-bottom: 10px;
  }
   .footer {
    text-align: left;
    font-size: 18px;
    line-height: 24px;
    height: 24px;
    padding: 10px;
    background: #ffffff;
    border-radius: 5px;
    margin-top: 10px;
  }
  .tongji {
    text-align: left;
    font-size: 18px;
    line-height: 24px;

    padding: 10px;
    background: #ffffff;
    border-radius: 5px;
    margin-bottom: 10px;
    .tit {
      border-bottom: 1px solid #d7d8d9;
      margin-bottom: 5px;
    }
    .count{
      font-size: 20px;
    line-height: 28px;
    font-weight: bold;
    color: #009688;
    }
  }
}
</style>


