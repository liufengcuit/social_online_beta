<template>
	<div class="groups">
		<div class="top-bar">
			<h2>闲聊吧</h2>
			<p>群简介：休闲娱乐玩耍</p>
			<i class="close el-icon-close" title="关闭"></i>
		</div>
	</div>
</template>
<script>
	export default {
		name: "Groups",
		data() {
			return {}
		}
	}
</script>
<style scoped>
	.groups{
		background: #3e7bab;
	}
	.top-bar{
		background: #3e7bab;
		height: 50px;
		padding-top: 15px;
		padding-left: 20px;
		color: #fff;
		position: relative;
	}
	.close{
		position: absolute;
		right: 10px;
		top: 15px;
		font-size: 20px;
	}
	.close:hover{
		cursor: pointer;
	}
</style>