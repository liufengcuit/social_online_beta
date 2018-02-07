<template>
	<div class="open-bag">
		<span @click="close()" class="x">x</span>
		<div class="top"></div>
		<div class="radius"></div>
		
		<!-- <div class="look">查看大家的手气</div> -->
		<div class="details"
			v-show="details">
			<div class="titles">领取详情</div>
			<div 
				class="ul"
				v-loading="loading"
			    element-loading-text="数据加载中..."
			    element-loading-spinner="el-icon-loading"
			    element-loading-background="rgba(255, 255, 255, 0)">
				<div class="title">
					<p>{{ bagsender }}</p>
					<p>{{ bags }}</p>
				</div>
				<!-- 抢到了红包 -->
				<div v-if="openstatus == 1">
					<div class="flex king-box" v-for="list in bag_status" :class="{white:list.uid==11}">
						<div class="flex2 username" :title="list.username">{{ list.username }}</div>
						<div class="flex1">{{ list.amount }}元</div>
						<div class="flex1">{{ list.time }}</div>
						<img src="static/image/king.png" alt="" class="king" title="手气最佳" v-if="list.best == 1">
					</div>
				</div>
				<!-- 红包已过期 -->
				<div v-else-if="openstatus == 2">
					<p class="opentitle">当前红包已过期，sorry...</p>
				</div>
				<!-- 红包被抢光 -->
				<div v-else-if="openstatus == 4">
					<p class="opentitle">当前红包已被抢光，sorry...</p>
					<p class="open_status" @click="opendetails()">查看领取详情</p>
				</div>
				
			</div>
			<div class="close-open-bag"><span title="关闭" @click="close()">关闭</span></div>
		</div>
		<!-- 第一次点击显示时状态 -->
		<div class="status1" v-if="bagstatus == 1">
			<div class="circle" @click="openbag()">拆红包</div>
		</div>
		<div class="status1" v-else-if="bagstatus == 2">
			<p class="content">红包已过期</p>
		</div>
		<div class="status1" v-else-if="bagstatus == 3">
			<p class="content">红包已经领取过了</p>
			<p class="looks" @click="opendetails()">查看领取详情</p>
		</div>
		<div class="status1" v-else-if="bagstatus == 4">
			<p class="content">手慢了，红包被抢光啦</p>
			<p class="looks" @click="opendetails()">查看领取详情</p>
		</div>
		<div class="status1" v-else-if="bagstatus == 5">
			<p class="content">请先开通会员</p>
		</div>
		<div class="status1" v-else-if="bagstatus == 6">
			<p class="content">请先升级会员</p>
		</div>
		<div class="status1" v-else-if="bagstatus == 7">
			<p class="content">消耗积分</p>
		</div>
		<div class="status1" v-else-if="bagstatus == 8">
			<p class="content">自己的红包</p>
			<p class="looks" @click="opendetails()">查看领取详情</p>
		</div>
		<div class="status1" v-else-if="bagstatus == 9">
			<p class="content">红包状态判断中</p>
		</div>
	</div>
</template>
<script>
	let bagStatus = [
		{key:1, value:'拆红包'},
		{key:2, value:'红包过期了'},
		{key:3, value:'您已经领取过此红包'},
		{key:4, value:'手慢了'},
		{key:5, value:'需要开通会员'},
		{key:6, value:'需要升级会员'},
		{key:7, value:'消耗积分'},
	]
	export default {
		name:"OpenBag",
		data(){
			return {
				details:false,
				openstatus:'',
				bag_status:'',
				self_id:'',
				bags:null,
				bagsender:'',
				loading:true,
				bagstatus:9
			}
		},
		created(){
			this.self_id = this.$store.state.login_user.id;
			console.log(this.bagQualification)
			this.snatch();
		},
		computed:{
			loadingbag(){
				// return this.$store.state
			}
		},
		methods:{
			/*先抢红包*/
			snatch(){
				this.$api.snatch({
					token:this.$store.state.login_user.token,
					id:this.bagQualification.rid,
					is_agree:true
				}).then(result => {
					this.bagstatus = result.data
				})
			},
			/*再打开红包*/
			openbag:function(){
				var parms = {
					token:this.$store.state.login_user.token,
					id:this.bagQualification.rid,
					is_agree:true
				}
				this.details = true;
				this.$api.bagOpen(parms).then(result => {
					this.openstatus = result.data;
					this.opendetails();
				})
			},
			close:function(){
				this.$emit("bagStatus", false)
			},
			/*查看领取详情*/
			opendetails:function(){
				this.details = true;
				var parms = {
					token:this.$store.state.login_user.token,
					id:this.bagQualification.rid
				}
				this.$api.bagLog(parms).then(result => {
					if(result.code == 0){
						if(result.data.length == 0){
							this.loading = false;
							this.bagsender = '您的红包暂时还没人领取'
							return 
						}
						this.openstatus = 1;
						this.bagsender = result.data.info.username
						this.bags = '共'+ result.data.info.label;
						this.bag_status = result.data.list;
						this.loading = false;
					}
				})
			}
		},
		props:['bagQualification'],
		filters:{
			bagStatusFilter(value){
				for(var i in bagStatus){
					if(bagStatus[i].key == value){
						return bagStatus[i].value;
					}
				}
				return value;
			}
		}

	}
</script>
<style scoped>
	.open-bag{width: 300px;height: 400px;background: #cc543c;border-radius: 4px;transform: translateX(-50%) translateY(-50%);color: #ffe4b2;overflow: hidden;position: fixed;left: 580px;top: 50%;z-index:2;}
		.top,.radius{background: #d75940}
		.top{height: 80px;}
		.radius{width:100%;border-radius: 50%;height: 50px;position: absolute;left: 0;top: 50px;}
		.circle{border-radius: 50%;width: 80px;height: 80px;margin-left: 50%;transform: translateX(-50%);line-height: 80px;
			text-align: center;color: #fff;background: #ffa938;margin-top: -15px;}
		.circle:hover{cursor: pointer;}
		.look{width: 100%;position: absolute;left: 0;bottom: 30px;text-align: center;font-size: 13px;}

		.details{width: 100%;height: 100%;position: absolute;left: 0;top: 0;background: #cc543c;z-index: 50}
		.titles{text-align: center;height: 45px;line-height: 45px;text-align: center;font-size: 16px;border-bottom: 1px solid #a7a7a7;}
		.ul{height: 310px;overflow: auto;}
		.flex{display: flex;}
		.title{padding: 2px 0 8px;box-sizing: border-box;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
		.title p{padding-left: 10px;box-sizing: border-box;}
		.flex1{flex: 1;text-align: center;}
		.flex2{flex: 2;text-align: center;}
		.close-open-bag{text-align: center;padding: 8px;}
		.close-open-bag span:hover{cursor: pointer;}
		.status1 .content{position: absolute;left: 0;top: 40%;width: 100%;text-align: center;font-size: 18px;}
		.looks{position: absolute;bottom: 10px;text-align: center;left: 0;width: 100%;}
		.looks:hover{cursor: pointer;}
		.x{position: absolute;right: 10px;top: 2px;font-size: 20px;z-index: 222}
		.x:hover,{cursor: pointer;}
		.username:hover{cursor: default;}

		.opentitle{text-align: center;font-size: 20px;padding: 30px 10px 0;box-sizing: border-box;}
		.open_status{text-align: center;padding-top: 80px}
		.open_status:hover{cursor: pointer;}
		.username{text-overflow: ellipsis;white-space: nowrap;overflow: hidden;}

		.king-box{position: relative;}
		.king{position: absolute;left: 121px;top: -3px;width: 20px;transform: rotate(20deg);}
		.white{background: #bbb;color: #f00}

</style>