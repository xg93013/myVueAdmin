<template>
	<el-row class="container">
		<!-- header -->
		<el-col :span="24" class="header">
			<el-header>
				<div class="branding">
					<p>ADMIN</p>
				</div>
				<ul class="nav-right">
					<li class="dropdown users" uib-dropdown="">
						<el-dropdown style="color: #fff;" trigger="hover">
							<span class="el-dropdown-link">{{ sysUserName }}<i class="el-icon-setting" style="margin:0 20px 0 4px"></i></span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>个人主页</el-dropdown-item>
								<el-dropdown-item>消息管理</el-dropdown-item>
								<el-dropdown-item>个人设置</el-dropdown-item>
								<el-dropdown-item divided @click.native="loginout">退出登录</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</li>
					<li>
						<a><i class="el-icon-star-on"></i></a>
					</li>
				</ul>
			</el-header>
		</el-col>
		<!-- main -->
		<el-col :span="24" class="main">
			<aside :class="collapsed? 'menu-collapsed' : 'menu-expanded'">
				<!--导航菜单-->
				<el-menu :default-active="$route.path" id="menu-tab" class="el-menu" :collapse="collapsed">
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden" @click="$router.push(child.path)">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i><span slot="title">{{item.children[0].name}}</span></el-menu-item>
					</template>
				</el-menu>
				<el-button class="btns" type="primary" @click="collapse"><i :class="collapse_icon"></i></el-button>
			</aside>
			<!-- 主要内容 -->
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
	
</template>
<style lang="scss" scoped>
	@import '~@/assets/scss/const.scss';
	.container{
		position: absolute;
		top:0;
		bottom: 0;
		width: 100%;
		.header{
			height: 60px;
			width: 100%;
			line-height: 60px;
			background: $color-background;
			.branding{
				float: left;
				color: $color-text;
			}
			.nav-right{
				float: right;
				color: #fff;
				font-size: $font-size-medium;
				li{
					float: left;
				}
			}
		}
		.main{
			display: flex;
			position: absolute;
			top: 60px;
			bottom: 0;
			overflow: hidden;
			aside{
				height:100%;
				position: relative;
				.el-menu:not(.el-menu--collapse) {
					width: 230px;
					height: 100%;
				}
				.el-menu{
					width: 60px;
					height: 100%;
				}
				.btns{
					width: 20px;
					height: 60px;
					padding: 0;
					position: absolute;
					top: 50%;
					margin-top: -30px;
					right: -20px;
					background: $color-background;
					border: none;
				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container{
				flex: 1;
				overflow-y: scroll;
				padding: 20px;
				background:#f5f5f5 ;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
			}
		}
	}
</style>


<script>
	import { MyStorage } from '@/assets/js/LocalStorage.js'
	export default {
		data() {
			return {
				sysName:'VUEADMIN',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: ''
			}
		},
		methods: {
			handleOpen() {
				// console.log(key, keyPath);
			},
			handleClose() {
				// console.log(key, keyPath);
			},
			collapse () {
				this.collapsed = !this.collapsed
			},
			loginout () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					localStorage.removeItem('access-user')
					_this.$router.push('/login');
				}).catch(() => {

				});
			}
		},
		computed: {
			collapse_icon () {
				if(this.collapsed){
					return "el-icon-arrow-right"
				}else{
					return "el-icon-arrow-left"
				}
			}
		},
		mounted () {
		}
	};
</script>