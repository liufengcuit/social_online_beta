<template>
	<div class="session-lists">
		<div
			class="ul"
			v-for="(sessionList,$index) in msgs"
			:key="$index"
			:class="{'session-select':sessionIndex == $index}"
			@click="changeSession($index)"
			>
				<div class="session-head-image">
					<img :src="sessionList.img" alt="">
				</div>
				<p class="session-title">{{ sessionList.title }}{{ $index }}</p>
				<p class="session-content">{{ sessionList.content }}</p>
				<p class="session-time">{{ sessionList.time }}</p>
				<span class="session-unread" v-if="sessionList.num != 0">{{ sessionList.num }}</span>
		</div>
		{{ sessions }}
	</div>
</template>
<script>
	export default {
		name: 'SessionLists',
		data() {
			return {
				sessionIndex:0,
				msgs:[
					{
						img:'http://or0r5rpd3.bkt.clouddn.com/group/4dae89f9852c9b3d99603cd5374ca4514569d62d507069c046247addb69a9507.jpg',
						title:'群名称',
						content:'消息内容',
						time:'17:00',
						num:12
					}
				]
			}
		},
		computed:{
			sessions(){
				let data = []
				let result = this.$store.state.messages;
				for(let i=0, len= result.length; i<len; i++){
					let obj = {}
					console.log(result[i])
					obj.targetId = result[i].targetId;
					obj.type = result[i].type;
					obj.time = result[i].data[result[i].data.length-1].data.time
					console.log(obj);
					data.push(obj);
				}
				console.log(data);
				return data;
			}
		},
		methods:{
			changeSession(index){
				this.sessionIndex = index;
			}
		}
	}
</script>
<style type="text/css">
	@import url("../../static/css/sessionlists.css")
</style>