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
							<p class="text-strong text-elg">{{ headData.payNum }}</p>
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
							<p class="text-strong text-elg">{{ headData.noPayNum }}</p>
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
							<p class="text-strong text-elg">{{headData.waitDealNum}}</p>
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
							<p class="text-strong text-elg">{{ headData.finishNum }}</p>
							<span>已完成</span>
						</el-col>
					</el-row>
		  	</div>
		  </el-col>
		</el-row>

		<!-- 统计图 -->
		<div class="chart-box">
			<el-row :gutter="20">
				<el-col :span="8">
					<div class="white-back">
						<el-row class="grid-item">
							<div class="chart-bar">
								<div class="echarts">
									<IEcharts :option="chartBoxOp" ref="chartBoxOpRef"></IEcharts>
								</div>
							</div>
						</el-row>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="white-back">
						<el-row class="grid-item">
							<div class="chart-line">
								<div class="echarts">
									<IEcharts :option="chartLineOp" ref="chartLineOpRef"></IEcharts>
								</div>
							</div>
						</el-row>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="white-back">
						<el-row class="grid-item">
							<div class="chart-pie">
								<div class="echarts">
									<IEcharts :option="chartPieOp" ref="chartPieOpRef"></IEcharts>
								</div>
							</div>
						</el-row>
					</div>
				</el-col>
			</el-row>
		</div>
		<!--商城订单-->
		<div class="orderinfo_box">
			<el-row>
			  <el-col :span="24">
			  	<el-col :span="12">商城订单</el-col>
          <el-col :span="12"><router-link to="/storeOrder" style="float: right;">查看更多</router-link></el-col>
			  </el-col>
			</el-row>
			<el-row class="mg-top-20">
			  <el-col :span="24">
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
								<el-button
									size="mini"
									type="danger"
									plain
									@click="handleDetail(scope.$index, scope.row)">查看详情</el-button>
							</template>
						</el-table-column>
				  </el-table>
			  </el-col>
			</el-row>
		</div>
		<!--服务订单-->
		<div class="orderinfo_box">
			<el-row>
			  <el-col :span="24">
			  	<el-col :span="12">
						服务订单
					</el-col>
          <el-col :span="12"><router-link to="/serviceOrder" style="float: right;">查看更多</router-link></el-col>
			  </el-col>
			</el-row>
			<el-row class="mg-top-20">
			  <el-col :span="24">
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
									@click="handleSeDetail(scope.$index, scope.row)">查看详情</el-button>
							</template>
						</el-table-column>
				  </el-table>
			  </el-col>
			</el-row>
		</div>
	</div>

</template>

<script>
	import STATE_API from '@/api/api_index'
	import STORE_ORDER_API from '@/api/api_store_order'
	import SERVICE_ORDER_API from '@/api/api_service_order'
	import IEcharts from 'vue-echarts-v3/src/lite.js'
	import 'echarts/lib/chart/bar'
	import 'echarts/lib/component/title'
	import 'echarts/lib/chart/line'
	import 'echarts/lib/chart/pie'
  export default {
		components: {
			IEcharts
		},
    data () {
      return {
				headData: {},
				storeOrder: "",
        serviceOrder: "",
        opacity: 0,
        value: 0,
				isloading: false,
				chartBoxOp: {},
				chartLineOp: {},
				chartPieOp: {},
				asyncData: {},
				asyncPieData: [
					{value:335, name:'直接访问'},
					{value:310, name:'邮件营销'},
					{value:274, name:'联盟广告'},
					{value:235, name:'视频广告'},
					{value:400, name:'搜索引擎'}
				]
      }
    },
    created (){
			this.setStateData()
			this.setStoreOrder()
			this.setServiceOrder()
			this.setEcahrtBar()
			this.setLineBar()
			this.setPieBar()
			setTimeout(() => {
				console.log('resize')
				window.onresize = (() => {
					this.$refs.chartBoxOpRef.resize
					this.$refs.chartLineOpRef.resize
					this.$refs.chartPieOpRef.resize
				})
			}, 20)
			
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
			// 柱状统计图
			setEcahrtBar () {
				this.asyncData.data = [5, 20, 36, 10, 10, 20]
				this.asyncData.categories = ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
				this.chartBoxOp = {
					backgroundColor: '#fff',
					title: {
						text: '销量展示',
						padding: 5,
						textStyle: {
							fontSize: 18,
							fontWeight: 'normal',
							color: '#333'          // 主标题文字颜色
						},
					},
					grid: {
						top: '60',
						left: '30',
						right: '20',
						bottom: '40',
					},
					tooltip: {},
					legend: {
						top: '0',
						right: '0',
						data:['销量']
					},
					xAxis: {
						data: this.asyncData.categories
					},
					yAxis: {},
					series: [{
							name: '销量',
							type: 'bar',
							data: this.asyncData.data
					}],
					bar: {
						barMinHeight: 0,          // 最小高度改为0
						barWidth: '40px',        // 默认自适应
						barGap: '30%',            // 柱间距离，默认为柱形宽度的30%，可设固定值
						barCategoryGap : '20%',   // 类目间柱形距离，默认为类目间距的20%，可设固定值
						itemStyle: {
								normal: {
										// color: '各异',
										barBorderColor: '#fff',       // 柱条边线
										barBorderRadius: 0,           // 柱条边线圆角，单位px，默认为0
										barBorderWidth: 1,            // 柱条边线线宽，单位px，默认为1
										label: {
												show: false
												// position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
												//           'inside'|'left'|'right'|'top'|'bottom'
												// textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
										}
								},
								emphasis: {
										// color: '各异',
										barBorderColor: 'rgba(0,0,0,0)',   // 柱条边线
										barBorderRadius: 0,                // 柱条边线圆角，单位px，默认为0
										barBorderWidth: 1,                 // 柱条边线线宽，单位px，默认为1
										label: {
												show: false
												// position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
												//           'inside'|'left'|'right'|'top'|'bottom'
												// textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
										}
								}
						}
					}
				}
			},
			// 折线统计图
			setLineBar () {
				this.chartLineOp = {
					backgroundColor: '#fff',
					title: {
						text: '销量展示',
						padding: 5,
						textStyle: {
							fontSize: 18,
							fontWeight: 'normal',
							color: '#333'          // 主标题文字颜色
						},
					},
					legend: {
						top: '30',
						right: '0',
						data:['每月销量']
					},
					tooltip: {
						trigger: 'axis'
					},
					toolbox: {
							show: true,
							feature: {
									magicType: {show: true, type: ['stack', 'tiled']},
									saveAsImage: {show: true}
							}
					},
					grid: {
						top: '60',
						left: '30',
						right: '20',
						bottom: '40',
					},
					step: 'start',
					xAxis: {
							type: 'category',
							data: ['一月', '二月', '三月', '四月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
					},
					yAxis: {
							type: 'category',
							boundaryGap: false,
							data: ['0', '10', '20', '30', '40', '50', '60']
					},
					series: [{
						name: '每月销量',
						smooth: true,
						type: 'line',
						data: [
							[  0, 0 ],
							[  1, 2 ],
							[  2, '30' ], 
							[  3, 5 ],
							[  6, 4 ],
							[  8, 2 ]
						]
					}]
				}
			},
			// 饼状统计图
			setPieBar () {
				this.chartPieOp = {
					title: {
							text: 'Customized Pie',
							left: 'center',
							top: 0,
							textStyle: {
									color: '#111',
									fontSize: '14'
							}
					},
					grid: {
						top: '60',
						left: '30',
						right: '20',
						bottom: '40',
					},
					tooltip : {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					series: [{  
						name: '种类',  
						type: 'pie',  
						// 内圆半径，外圆半径  
						radius: [30, 100],  
						// 位置，左右，上下  
						center: ['50%', '50%'],  
						roseType: 'area',  
						data: this.asyncPieData // this  
					}]  
				}
			},
			// 商城订单
			setStoreOrder () {
				STORE_ORDER_API.findList().then((res) => {
					if (res.data != ""){
						this.storeOrder = res.data
					}
        })
			},
			// 服务订单
			setServiceOrder () {
				SERVICE_ORDER_API.findList().then((res) => {
					if (res.data != "") {
						this.serviceOrder = res.data
					}
				})
			},
      handleDetail(index,row){
        this.$router.push({path: 'storeOrderDetail',query: { id: row.headData.orderNum } });
			},
			handleSeDetail (index, row) {
				this.$router.push({path: 'serviceOrderDetail',query: { id: row.orderNum } });
			},
			getEchartData(val){
        console.log(val);
			},
			// bar的操作
			doRandom() {
        const that = this;
        let data = [];
        for (let i = 0, min = 5, max = 99; i < 6; i++) {
          data.push(Math.floor(Math.random() * (max + 1 - min) + min));
        }
        that.loading = !that.loading;
        that.bar.series[0].data = data;
      },
      onReady(instance) {
        console.log(instance);
      },
      onClickBar(event, instance, echarts) {
        console.log(arguments);
      }
    }
  }
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/common.scss';
.main_container{
	.chart-box{
		margin: 20px 0 0 0;
		.chart-bar{
			width: 100%;
			height: 300px;
		}
		.chart-line{
			width: 100%;
			height: 300px;
		}
		.chart-pie{
			width: 100%;
			height: 300px;
		}
	}
	.orderinfo_box{
		background:#fff;
		padding:20px;
		margin-top:20px;
	}
}
</style>

