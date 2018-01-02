<template>
	<!--<mu-list v-if="isAjax&&tableData">-->
	<el-container class="main_container">
		<el-row>
		  <el-col :span="12"><div class="grid-content bg-purple">1</div></el-col>
		  <el-col :span="12"><div class="grid-content bg-purple-light">1</div></el-col>
		</el-row>

		<div class="orderList" v-for="(item, index) of tableData">		
			<!--<div class="orderHead" >
				<ul>
					<li>订单编号：{{ item.headData.orderNum }}</li>
					<li>订单创建日期：{{ item.headData.orderCreateTime }}</li>
				</ul>
			</div>-->
			<el-row>
			  <el-col :span="24">
			  	<ul>
					<li>订单编号：{{ item.headData.orderNum }}</li>
					<li>订单创建日期：{{ item.headData.orderCreateTime }}</li>
				</ul>
			  </el-col>
			</el-row>
		  <el-table :data="item.orderItem">
		    <el-table-column prop="date" label="日期" width="140" sortable style="text-align: center;">
		    </el-table-column>
		    <el-table-column prop="name" label="姓名" width="120" sortable>
		    </el-table-column>
		    <el-table-column prop="address" label="地址">
		    </el-table-column>
		    <el-table-column label="操作">
		      <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
			      </template>
			    </el-table-column>
		  </el-table>
	  </div>
  </el-container>
  <!--</mu-list>-->
</template>

<script>
import { API } from '@/api/api_store_order'
export default {
    data() {
      return {
        tableData: []
      }
		},
		methods: {
			_getOrderList () {
				let para = {}
				// getOrderList(para).then((res) => {
				// 	this.tableData = res.data
				// })			
			}
		},
		created () {
			this._getOrderList()
		}
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
