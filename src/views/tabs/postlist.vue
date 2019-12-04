<template>
  <div class="postlist">
     <el-row>
      <el-col :span="4">
        <div class="tian">
          <el-button type="primary" icon="el-icon-edit" >帖子列表</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="width:100%;">
        <div class="content">
         
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style  lang='scss' scoped>
.postlist {
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
</style>