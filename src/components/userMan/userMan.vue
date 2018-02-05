<template>
  <div class="user-box">
    <el-form ref="form" :model="userForm" label-width="100px" class="user-form">
      <el-form-item label="用户名">
        <el-input v-model="userForm.name"></el-input>
      </el-form-item>
      <el-form-item label="身份">
        <el-select v-model="userForm.region" placeholder="请选择身份">
          <el-option label="用户" value="user"></el-option>
          <el-option label="管理员" value="admin"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="userForm.date1" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="可修改资料">
        <el-switch v-model="userForm.isEdit"></el-switch>
      </el-form-item>
      <el-form-item label="权限">
        <el-checkbox-group v-model="userForm.type">
          <el-checkbox label="权限1" name="type"></el-checkbox>
          <el-checkbox label="权限2" name="type"></el-checkbox>
          <el-checkbox label="权限3" name="type"></el-checkbox>
          <el-checkbox label="权限4" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="userForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input type="textarea" v-model="userForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        userForm: {
          name: '',
          region: '',
          date1: '',
          isEdit: false,
          type: [],
          sex: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style lang="scss" scoped>
  .user-box{
    background: #fff;
    padding: 40px 20px;
    margin: 30px 0 0 0;
  }
  .user-form{
    width:50%;
  }
</style>


