<template>
<!-- 顾客管理 -->
  <div id="customer">
    <h4 style="margin:0px">{{name}}</h4>
    <!-- 按钮 -->
    <el-button type="primary" @click="toAddHandler()" size="small" style="margin:5px">添加</el-button>
    <el-button type="danger" @click="selectDeleteHandler()" size="small">批量删除</el-button>
    <!-- 模态框 -->
    <el-dialog :title="formTitle" :visible.sync="centerDialogVisible" width="30%" center>
      <!-- {{addForm}} -->
      <el-form :model="addForm" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="addForm.realname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="telephone">
          <el-input v-model.number="addForm.telephone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">保存并提交</el-button>
      </span>
    </el-dialog>
    <!-- 查询表单 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="float:right">
      <el-form-item>
        <el-input v-model="formInline.username" placeholder="用户名" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="toQueryHandler()" size="small">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <!-- {{ids}} -->
    <el-table
      :data="tableData"
      height="375"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="telephone" label="联系方式"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="slot">
          <!-- {{slot.row}} -->
          <el-button @click="toDeleteHandler(slot.row.id)" type="text" size="small">删除</el-button>
          <el-button type="text" size="small" @click="toUpdateHandler(slot.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script scoped>
import $ from "jquery";
import qs from "qs";
export default {
  data() {
    return {
      name: "顾客管理",
      tableData: [],
      ids: [],
      loading: false,
      formTitle: "",
      centerDialogVisible: false,
      addForm: {},
      //   rules: {
      //     age: [{ validator: checkAge, trigger: "blur" }],
      //   },
      formInline: {
        username: "",
      },
    };
  },
  created() {
    this.reloadData();
  },
  methods: {
    //重载
    reloadData() {
      let that = this;
      that.loading = true;
      $.ajax({
        url: "http://121.40.187.6:6677/customer/findAll",
        method: "get",
        success: function (resp) {
          that.tableData = resp.data;
          that.loading = false;
        },
      });
      // let url="http://121.40.187.6:6677/customer/findAll"
      // $.get(url,(resp)=>{
      //     this.tableData = resp.data;
      //     // this.loading=true
      // })
    },
    //添加
    toAddHandler() {
      this.formTitle = "添加顾客";
      this.addForm = {};
      this.centerDialogVisible = true;
    },
    //删除
    toDeleteHandler(id) {
      //   alert(id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let url = "http://121.40.187.6:6677/customer/deleteById";
          $.get(url, { id }, (resp) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.reloadData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //修改
    toUpdateHandler(row) {
      this.formTitle = "修改顾客";
      this.centerDialogVisible = true;
      //   alert(JSON.stringify(row));
      this.addForm = row;
    },
    //当复选按钮发生变化
    handleSelectionChange(val) {
      this.ids = val.map((item) => item.id);
    },
    //批量删除
    selectDeleteHandler() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let url = "http://121.40.187.6:6677/customer/batchDelete";
          //手动将数组转换为查询字符串var str = qs.stringify(obj);
          let params = qs.stringify(
            { ids: this.ids },
            { arrayFormat: "repeat" }
          );
          alert(params);
          $.post(url, params, (resp) => {
            if (resp.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.reloadData();
            } else {
              //查询字符串自动转换有问题，后台接口问题ids=%5B26%5D
              this.$message({
                type: "error",
                message: "删除失败!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //添加
    submitForm(formdata) {
      this.centerDialogVisible = false;
      let url = "http://121.40.187.6:6677/customer/saveOrUpdate";
      $.post(url, this.addForm, (resp) => {
        // alert(resp.message);
        this.$notify({
          title: "成功",
          message: resp.message,
          type: "success",
        });
        this.centerDialogVisible = false;
        this.reloadData();
      });
    },
    //查询
    toQueryHandler(){
        this.loading=true
    },
  },
};
</script>
<style>
body{
    margin: 0px;
    padding: 0px;
}
.top{
    background-color: rgb(32, 216, 210);
}
.left{
    height:458px ;
    background-color: rgb(255, 197, 149);
}
.content{
    width:1080px ;
    background-color: rgb(248, 198, 255);
}
.bottom{
    background-color:rgb(181, 187, 255);
}

</style>