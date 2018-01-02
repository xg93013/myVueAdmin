<template>

  <div class="main_container">

    <!--主体内容-->
    <div class="white_bg mg20">
      <div class="storeOrder_form">
        <p class="head_title">订单信息</p>
        <el-form :model="headData" :rules="rules" ref="storeOrderForm" label-width="120px" class="storeOrderForm" style="width:50%;">
          <el-form-item label="订单编号" prop="name">
            <el-input v-model="headData.orderNum" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="用户名" prop="userInfo">
            <el-input v-model="headData.userInfo"></el-input>
          </el-form-item>
          <el-form-item label="订单完成时间" prop="orderCreateTime">
            <el-date-picker type="date" placeholder="选择日期" v-model="headData.orderCreateTime"></el-date-picker>
          </el-form-item>
          <el-form-item label="商户名称" prop="toStore">
            <el-input v-model="headData.toStore"></el-input>
          </el-form-item>

        </el-form>
      </div>
      <div class="order_item">
        <p class="head_title">商品信息</p>
        <el-table :data="orderItem">
          <el-table-column prop="goodsName" label="商品名称" width="340" sortable>
          </el-table-column>
          <el-table-column prop="imgUrl" label="商品封面图" width="220" sortable>
          </el-table-column>
          <el-table-column prop="price" label="价格">
          </el-table-column>
          <el-table-column prop="goodsAmount" label="商品数量">
          </el-table-column>
          <el-table-column prop="goodsDes" label="商品描述">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="btn_box">
        <el-row>
          <el-col :span="24">
            <div class="grid-content">
              <el-button type="primary" @click="submitForm('storeOrderForm')">立即创建</el-button>
              <el-button @click="resetForm('storeOrderForm')">重置</el-button>
              <el-button v-on:click="goback">返回</el-button>
            </div>
          </el-col>
        </el-row>
      </div>

      <!--编辑界面-->
      <el-dialog title="编辑" :visible.sync ="editFormVisible"  :close-on-click-modal="false" style="z-index:9999" :append-to-body="false">
        <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
          <el-form-item label="商店名称" prop="goodsName">
            <el-input v-model="editForm.goodsName"></el-input>
          </el-form-item>
          <el-form-item label="商品封面url" prop="imgUrl">
            <el-input v-model="editForm.imgUrl"></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="goodsAmount">
            <el-input v-model="editForm.goodsAmount"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input v-model="editForm.price"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="goodsDes">
            <el-input v-model="editForm.goodsDes"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
	import STORE_ORDER_API from '@/api/api_store_order'
  export default {
    data() {
      // 自定义验证
      let validater = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入名称'));
        } else if (value.length < 4){
          callback(new Error('请输入大于4位名称！'));
        } else {
          callback()
        }
      }
      return {
        headData: {
          orderCreateTime:"",
          orderNum:0,
          state:0,
          toStore:"",
          userInfo:""
        },
        rules: {
          orderNum: [
            { required: true, message: '请输入订单编号', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          toStore: [
            { required: true, message: '请输入商店名称', trigger: 'blur' },
            { min: 1, max: 20, message: '', trigger: 'blur' }
          ],
          userInfo: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 20, message: '', trigger: 'blur' }
          ],
          orderCreateTime: [
            { type: 'date', required: true, message: '请选择订单时间', trigger: 'change' }
          ],
          state: [
            { required: true, message: '请选择订单状态', trigger: 'blur' },
            { min: 1, max: 20, message: '', trigger: 'blur' }
          ]
        },
        orderItem:[],
        editLoading: false,
        editForm:{
          goodsName: "",
          imgUrl: "",
          price: "",
          goodsAmount:"",
          goodsDes: ""
        },
        editFormRules:{
          goodsName: [
            // { required: true, message: '请输入商品名称', trigger: 'blur' },
            // { min: 1, max: 20, message: '', trigger: 'blur' }
            { validator: validater, trigger: 'blur' }
          ],
          imgUrl: [
            { required: true, message: '请输入商品图片', trigger: 'blur' },
            { min: 1, max: 30, message: '', trigger: 'blur' }
          ],
          goodsAmount: [
            { required: true, message: '请输入商品数量', trigger: 'blur' },
            { min: 1, max: 20, message: '', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入商品价格', trigger: 'blur' },
            { min: 1, max: 100, message: '', trigger: 'blur' }
          ],
          goodsDes: [
            { required: true, message: '请输入商品描述', trigger: 'blur' },
            { min: 1, max: 40, message: '', trigger: 'blur' }
          ]
        },
        editFormVisible:false
      }
    },
    beforeRouteEnter: (to, from, next) => {
      let _this = this
      next(vm => {
        // 获取数据
        let params = { id:vm.$route.query.id }
        STORE_ORDER_API.findById(params).then((res) => {
					if (res.data != ""){
            vm.headData = res.data.headData
            vm.orderItem = res.data.orderItem
            // console.log(_this.headData)
					}
        })
      })
    },
    mounted () {
      // this.initValidater()
    },
    methods:{
      goback () {
        this.$router.go(-1)
      },
      back () {
        this.$router.back()
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$alert('商品订单添加成功！', '新增订单信息', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //显示编辑界面
      handleEdit(index,row){
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      // 编辑
      editSubmit(){
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            // 修改接口
            this.$alert('商品订单修改成功！', '修改订单信息', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .storeOrder_form{
    margin:40px 0 50px 20px;
    padding:20px;
    background: #fff;
  }
  .order_item{
    background: #fff;
    margin:20px;
    padding: 20px;
  }
  .head_title{
    font-size: 18px;
    margin:10px 0 20px 0;
  }
  .btn_box{
    margin:20px;
  }
</style>
