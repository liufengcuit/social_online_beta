<template>
	<div class="bag"
		v-loading="loading"
	    element-loading-text="发送中"
	    element-loading-spinner="el-icon-loading"
	    element-loading-background="rgba(255, 255, 255, 0)"
	>
		<h3>发红包<i class="iconfont el-icon-close" title="关闭" @click="close()"></i></h3>
		<div>
			<p class="txts">
				<label for="number">红包个数：</label>
				<input type="number" id="number" placeholder="个数" v-model="number" @blur="checkBag()" min="1">
				<span>个</span>
			</p>
			<p class="txts">
				<label for="money">总金额：</label>
				<input type="number" id="money" placeholder="输入金额" v-model="money" @blur="checkBag()" min="0.01">
				<span>元</span>
			</p>
			<p class="titles">
				<input type="text" placeholder="恭喜发财" v-model="bag_title">
			</p>
			<div class="select">
				<el-radio-group v-model="radio2">
				    <el-radio :label="0">无</el-radio>
				    <el-radio :label="1">仅会员可领<span style="font-size:12px;color:red;">(*仅会员可发)</span></el-radio>
				</el-radio-group>
			</div>
			<p class="send_bag">
				<button @click="bagMsg()" id="send_bag_money">发送</button>
			</p>
		</div>
	</div>
</template>
<script>
	export default {
		name:"Bag",
		data(){
			return {
				number:"",
				money:"",
				bag_title:"",
				radio2:0,
				loading:false
			}
		},
		methods:{
			bagMsg:function(){
				if(this.number=="" || this.money=="" || this.number ==0 || this.money==0){
					alert("需要设置红包个数和红包金额切不能为0");
					return false;
				}else if(this.money >= 200){
					this.$confirm('确定发送'+this.money+'¥ 红包', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.sendBagMseeage();
						}).catch(() => {
							this.$message({
							type: 'warning',
							message: '已取消当前操作'
						});          
					});
				}else{
					document.querySelector("#send_bag_money").disabled = false;
					document.querySelector("#send_bag_money").blur();
					this.sendBagMseeage();
				}
				
			},
			checkBag:function(){
				var btn = document.querySelector("#send_bag_money");
				if(this.number!="" && this.money!=""){
					btn.style.backgroundColor = '#d13d4b';
					btn.innerHTML = "发送"+parseFloat(this.money).toFixed(2)+"元";
					btn.disabled = false;
				}else{
					btn.style.backgroundColor = '#de959c';
					btn.innerHTML = "发送";
					btn.disabled = 'disabled';
				}
			},
			sendBagMseeage:function(){
				let state = this.$store.state;
				let parms = {
					token: state.login_user.token,
					amount: parseFloat(this.money).toFixed(2),
					num: parseInt(this.number),
					brief: this.bag_title?this.bag_title:"恭喜发财",
					is_vip: this.radio2,
					signString:signString,
					group_id: state.active_group.group_id
				}
				this.getData(parms);
				this.loading = true;
			},
			/**关闭红包*/
			close:function(){
				this.$store.commit('set_bag_status',false);
			},
			/*创建红包*/
			getData:function(payload){
				this.loading = false;
				this.$api.create(payload).then(result => {
					console.log(result);
					if(result.code == 0 && result.msg == "success"){
						let parms = {
							token: payload.token,
							amount: payload.amount,
							channel: "BAL",
							t_id:result.data,
							brief:payload.brief,
							type:1
						}
						this.$api.payfor(parms).then(res => {
							console.log(res)
							this.loading = false;
							if(res.code == 1){
								alert(res.msg);
							}else{
								this.$store.commit('set_bag_status',false);
							}
						});
						
					}else{
						alert(result.msg);
						this.loading = false;
					}
				
				});
				
			}
		}
	}
</script>
<style scoped>
	.bag{
		position: absolute;
	    left: 23%;
	    top: 32%;
	    right: 0;
	    bottom: 0;
	    width: 275px;
	    height: 240px;
	    border-radius: 3px;
	    overflow: hidden;
	    background-color: #ecedee;
	    z-index: 2;
	}
	.bag h3{
		background: #d81e06;
		color: #fff;
		padding: 8px 0;
		text-align: center;
	}
	.txts{
		padding: 7px 8px;
		display: flex;
		width: 100%;
		background-color: #fff;
		box-sizing: border-box;
		border-bottom: 1px solid #f5f5f5;
	}
	.txts label{
		width: 100px;
	}
	.txts input{
		flex: 1;
	}
	.txts span{
		width: 14px;
	}
	.titles{
		margin-top: 15px;
	}
	.titles input{
		width: 100%;
		height: 100%;
		padding: 7px 0 7px 8px;
		font-size: 12px;
	}
	.send_bag{
		text-align: center;
		margin-top: 20px;
	}
	.send_bag button{
		width: 164px;
		padding: 4px 0;
		border-radius: 5px;
		background-color: #de959c;
		box-sizing: border-box;
		color: #fff;
	}
	.iconfont{
		float: right;
		margin-right: 5px;
	}
	.iconfont:hover{
		cursor: pointer;
	}
	.select{
		padding-top: 8px;
		padding-left: 5px;
		box-sizing: border-box;
	}
</style>