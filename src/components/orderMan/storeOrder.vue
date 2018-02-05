<template>
	<!--商城订单-->
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
				<div class="page-box">
					<el-pagination
            background="true"
            layout="prev, pager, next"
            :total="1000"
						@current-change="changePage"
						>
          </el-pagination>
				</div>
			<!--</div>-->
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import STORE_ORDER_API from '@/api/api_store_order'
	export default {
    data() {
      return {
				storeOrder: ""
      }
		},
		methods: {
			_getOrderList () {
				STORE_ORDER_API.findList().then((res) => {
					if (res.data != ""){
						this.storeOrder = res.data
					}
        })		
			},
			changePage () {
				this.$alert('下一页', '页码切换', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `切换成功！`
            });
          }
        });
			},
			handleDetail(index,row){
        this.$router.push({path: 'storeOrderDetail',query: { id: row.headData.orderNum } });
			}
		},
		created () {
			this._getOrderList()
		}
  };
</script>

<style lang="scss" scoped>
	.orderinfo_box{
		background:#fff;
		padding:20px;
		margin-top:20px;
	}
	.page-box{
		margin: 20px 0 20px 0;
	}
</style>

