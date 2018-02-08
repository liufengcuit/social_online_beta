<template>
	<div class="special-message">
		<!-- 红包提示 -->
		<div class="red-tips" v-if="chatlist.type == 'redtips'" v-html="chatlist.data.content"></div>
		<!-- 加群提示 -->
		<div class="add-group" v-else>
			{{ chatlist.data.content }}
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
</style>