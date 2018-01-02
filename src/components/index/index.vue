<template>
	<div class="main_container">
    <div class="loading" v-if="isloading">
      Loading...
    </div>
		<!--个人信息-->
		<el-row :gutter="20" style="margin-top:30px;">
		  <el-col :span="6">
		  	<div class="grid-content bg-greensea">
		  		<el-row class="grid-item">
				  <el-col :span="8">
				  	<i class="el-icon-sold-out fa-3x"></i>
				  </el-col>
				  <el-col :span="16">
				  	<p class="text-strong text-elg">{{ headData.processOrder }}</p>
				  	<span>已发货</span>
				  </el-col>
				</el-row>
		  	</div>
		  </el-col>
		  <el-col :span="6">
		  	<div class="grid-content bg-lightred">
		  		<el-row class="grid-item">
				  <el-col :span="8">
				  	<i class="el-icon-sold-out fa-3x"></i>
				  </el-col>
				  <el-col :span="16">
				  	<p class="text-strong text-elg">{{ headData.nonePayOrder }}</p>
				  	<span>用户未付款</span>
				  </el-col>
				</el-row>
		  	</div>
		  </el-col>
		  <el-col :span="6">
		  	<div class="grid-content bg-blue">
		  		<el-row class="grid-item">
				  <el-col :span="8">
				  	<i class="el-icon-time fa-3x"></i>
				  </el-col>
				  <el-col :span="16">
				  	<p class="text-strong text-elg">{{headData.waitDealOrder}}</p>
				  	<span>待处理</span>
				  </el-col>
				</el-row>
		  	</div>
		  </el-col>
		  <el-col :span="6">
		  	<div class="grid-content bg-slategray">
		  		<el-row class="grid-item">
				  <el-col :span="8">
				  	<i class="el-icon-circle-check-outline fa-3x"></i>
				  </el-col>
				  <el-col :span="16">
				  	<p class="text-strong text-elg">{{ headData.successOrder}}</p>
				  	<span>已完成</span>
				  </el-col>
				</el-row>
		  	</div>
		  </el-col>
		</el-row>
		<!--订单统计-->
		<div class="orderinfo_box">
			<el-row>
			  <el-col :span="24">
			  	<el-col :span="12">商城订单</el-col>
          <el-col :span="12"><router-link to="/home/storeOrder" style="float: right;">查看更多</router-link></el-col>
			  </el-col>
			</el-row>
			<el-row>
			  <el-col :span="24">
			  	<!--<div class="orderList" v-for="(item, index) of tableData">-->
				  <el-table :data="storeOrder.rows">
				    <el-table-column prop="headData.orderNum" label="订单编号" width="140" sortable style="text-align: center;">
				    </el-table-column>
				    <el-table-column prop="headData.toStore" label="商家名称" width="520">
				    </el-table-column>
				    <el-table-column prop="headData.userInfo" label="客户用户名">
				    </el-table-column>
            <el-table-column prop="headData.orderCreateTime" label="订单完成日期">
            </el-table-column>
				    <el-table-column label="操作" width="180" style="text-align: right">
				      <template slot-scope="scope">
                <!--<router-link :to="{name: 'storeOrderDetail',params: { id: item.orderNum, name, : item.name, coverImg: item.coverImgUrl, creator: item.creator, count: item.playCount, desc: item.description }}">-->
					        <el-button
					          size="mini"
					          type="danger"
										plain
					          @click="handleDetail(scope.$index, scope.row)">查看详情</el-button>
                <!--</router-link>-->
					      </template>
					    </el-table-column>
				  </el-table>
			  <!--</div>-->
			  </el-col>
			</el-row>
		</div>
		<!--商城订单-->
		<div class="orderinfo_box">
			<el-row>
			  <el-col :span="12">1</el-col>
			  <el-col :span="12">2</el-col>
			</el-row>
		</div>
		<!--服务订单-->
		<div class="orderinfo_box">
			<el-row>
			  <el-col :span="12">1</el-col>
			  <el-col :span="12">2</el-col>
			</el-row>
		</div>
	</div>

</template>

<script>
	import STATE_API from '@/api/api_index'
	import STORE_ORDER_API from '@/api/api_store_order'
  export default {
    data () {
      return {
				headData: {},
				storeOrder: "",
        serviceOrder: "",
        opacity: 0,
        value: 0,
        isloading: false
      }
    },
    created(){
			this.setStateData()
			this.setStoreOrder()
    },
    methods: {
			// 状态信息
      setStateData () {
        this.isloading = true
        STATE_API.getState().then((res) => {
					this.isloading = false
					if (res.data != ""){
						this.headData = res.data.headData
					}
        })
			},
			// 商城订单
			setStoreOrder () {
				STORE_ORDER_API.findList().then((res) => {
					if (res.data != ""){
						this.storeOrder = res.data
					}
        })
			},
      handleDetail(index,row){
        this.$router.push({path: 'storeOrderDetail',query: { id: row.headData.orderNum } });
      }
    }
  }
</script>

<style>
	.orderinfo_box{
		background:#fff;
		padding:20px;
		margin-top:20px;
	}
	.grid-item{
		padding:20px;
	}
	.bg-greensea{
		background: #16a085 !important;
		color:#fff;
	}
	.bg-lightred{
		background: #e05d6f !important;
		color:#fff;
	}
	.bg-blue{
		background: #418bca !important;
		color:#fff;
	}
	.bg-slategray{
		background: #3f4e62 !important;
		color:#fff;
	}
	.headBar ul li{
		float: left;
		color: #999;
	}
</style>
