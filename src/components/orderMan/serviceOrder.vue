<!-- 图表 -->
<template>
  <div class="orderinfo_box">
        <el-row>
            <el-col :span="24">服务订单</el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
            <!--<div class="orderList" v-for="(item, index) of tableData">-->
                <el-table :data="serviceOrder.rows">
                <el-table-column prop="orderNum" label="订单编号" width="140" sortable style="text-align: center;">
                </el-table-column>
                <el-table-column prop="serviceName" label="服务名称" width="240">
                </el-table-column>
                <el-table-column prop="userInfo" label="客户用户名">
                </el-table-column>
                    <el-table-column prop="price" label="价格">
                </el-table-column>
        <el-table-column prop="orderDate" label="订单完成日期">
        </el-table-column>
                <el-table-column label="操作" width="180" style="text-align: right">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                                    plain
                            @click="handleDetail(scope.$index, scope.row)">查看详情</el-button>
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
    import SERVICE_ORDER_API from '@/api/api_service_order'
	export default {
    data() {
      return {
		serviceOrder: ""
      }
		},
    methods: {
        _getServiceList () {
            SERVICE_ORDER_API.findList().then((res) => {
                if (res.data != ""){
                    this.serviceOrder = res.data
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
        }
    },
    created () {
        this._getServiceList()
    }
  };
</script>
<<style lang="scss" scoped>
    .orderinfo_box{
		background:#fff;
		padding:20px;
		margin-top:20px;
    }
    .page-box{
		margin: 20px 0 20px 0;
	}
</style>
