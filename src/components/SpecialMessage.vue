<template>
	<div class="special-message">
		<!-- 红包提示 -->
		<div class="red-tips" v-if="chatlist.type.special == 'redtips'">
			<!-- 别人领取了你的红包 -->
			<p v-if="chatlist.content.senduid != chatlist.content.getuid && curr_id==chatlist.content.senduid">{{ chatlist.content.getname }}领取了你的红包<span v-if="chatlist.content.over==true">，<b>红包已被领完</b></span></p>
			<!-- 领取自己的红包 -->
			<p v-else-if="chatlist.content.senduid == curr_id && chatlist.content.getuid == curr_id">你领取了自己的红包<span v-if="chatlist.content.over==true">，<b>红包已被领完</b></span></p>
			<!-- 你领取了别人的红包 -->
			<p v-else-if="chatlist.content.getuid == curr_id && curr_id != chatlist.content.senduid ">你领取了{{ chatlist.content.sendname }}的红包<span v-if="chatlist.content.over==true">，<b>红包已被领完</b></span></p>
			<!-- 别人领取了别人的红包 -->
			<p v-else-if="chatlist.content.getuid != curr_id && chatlist.content.senduid != chatlist.content.getuid && chatlist.content.getuid != curr_id">{{ chatlist.content.getname }}领取了{{ chatlist.content.sendname }}的红包<span v-if="chatlist.content.over==true">，<b>红包已被领完</b></span></p>
			<!-- 别人领取了自己的红包 -->
			<p v-else>{{ chatlist.content.getname }}领取了自己的红包<span v-if="chatlist.content.over==true">，<b>红包已被领完</b></span></p>
		</div>
		<!-- 加群提示 -->
		<div class="add-group" v-else>
			{{ chatlist.content }}
		</div>

	</div>
</template>
<script>
	import { mapState  } from 'vuex';
	export default {
		name:"SpecialMessage",
		data() {
			return {}
		},
		computed:{
			...mapState({
				curr_id: state => state.login_user.id
			}),
		},
		props:["chatlist"]
	}
</script>
<style scoped>
	.special-message{
		text-align: center;
	}
	.add-group{
		color: #fff;
	}
	.red-tips{
		color: #ffffff;
	}
	.red-tips b{
		color: #c1ff1d
	}
</style>