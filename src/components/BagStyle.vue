<template>
	<div class="bag-style">
		<div class="redbag" @click="open(bags.data.content)">
			<div class="redbag-top">
				<div class="bag">
					<div class="top"></div>
					<div class="radius"></div>
					<span class="money">¥</span>
				</div>
				<!-- 内容 -->
				<div class="content-bag">
					<p class="title">{{ bags.data.content.des }}</p>
					<p class="info">领取红包</p>
				</div>
			</div>
			<div class="redbag-bottom">红包</div>
		</div>
		<open-bag :bagQualification="selectBag" v-if="bagSwitch" v-on:bagStatus="controBagView"></open-bag>
	</div>
</template>
<script>
	import openBag from './OpenBag.vue'
	export default {
		name: "BagStyle",
		data() {
			return {
				bagstatus:'',
				selectBag:'',
				bagSwitch:false
			}
		},
		methods:{
			open(bags){
				this.selectBag = bags;
				if(this.$store.state.bagStatusView){
					this.$message({
						message: '您已经打开了一个红包，请先关闭或领取再点击！',
						type: 'warning'
					});
					return false;
				}
				this.bagSwitch = true;
				this.$store.commit("setBagStatusView", true);
			},
			controBagView(status){
				this.bagSwitch = status;
				this.$store.commit("setBagStatusView", false);
			}
		},
		props:['bags'],
		components:{
			openBag
		}
	}
</script>
<style scoped>
	.redbag{
			border-radius: 3px;
			width: 210px;
			overflow: hidden;
			border-top: 1px solid #d0a473;
			box-sizing: border-box;
		}
		.redbag-top{
			background: #f99d3a;
			border-bottom: 1px solid #d0a473;
			height: 58px;
		}
		.redbag-bottom{
			background: #fff;
			font-size: 13px;
			color: #959595;
			padding-left: 20px;
			padding-top: 2px;
			padding-bottom: 2px;
		}
		.redbag-top{position: relative;}
		.bag{
			width: 28px;
		    height: 30px;
		    background: #d73c1e;
		    overflow: hidden;
		    position: absolute;
		    left: 18px;
		    top: 13px;
		}
		.top{width: 100%;height: 6px;background: #f04d2c}
		.radius{width: 100%;height: 15px;border-radius: 50%;background: #f04d2c;transform: translateY(-50%);}
		.money{display: block;position: absolute;width: 20px;height: 20px;text-align: center;line-height: 20px;background: #f2d055;color: #da9049;border-radius: 50%;left: 4px;top: 5px;font-size: 13px;transform: scale(.7);}
		.title{color: #fff;width: 100%;padding-left: 60px;font-size: 15px;padding-top: 11px;padding-right: 10px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;box-sizing: border-box;}
		.info{color: #fff;font-size: 12px;padding-left: 60px;box-sizing: border-box;}
		p:hover{cursor: default;}
</style>