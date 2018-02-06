<template>
	<div class="emoji-list" v-if="show">
      <span 
      	  :name="emoji.symbol"
          @click="emojiPackage($event)" 
          v-for="(emoji,index) in emojiList"
          :key="index"
          :style="{backgroundPosition:emoji.backgroundPosition}">{{ emoji.emoji }}</span>
	</div>
</template>
<script>
	var config = {
	  size: 24, // 大小, 默认 24, 建议18 - 58
	  url: "http://f2e.cn.ronghub.com/sdk/emoji-48.png", // Emoji 背景图片
	  lang: "zh", // Emoji 对应名称语言, 默认 zh
	  // 扩展表情
	  extension: {
	    dataSource: {
	      u1F914: {
	        en: "thinking face", // 英文名称
	        zh: "思考", // 中文名称
	        tag: "🤔", // 原生 Emoji
	        position: "0 0" // 所在背景图位置坐标
	      }
	    },
	    // 新增 Emoji 背景图 url
	    url: "https://emojipedia-us.s3.amazonaws.com/thumbs/160/apple/96/thinking-face_1f914.png"
	  }
	};
	RongIMLib.RongIMEmoji.init();
	var emojiList = RongIMLib.RongIMEmoji.list;
	for(var i in emojiList){
	  emojiList[i].backgroundPosition = -i*24+'px 0px';
	}
	export default {
		"name":'Emoji',
		data() {
			return {
				emojiList:emojiList
			}
		},
		computed:{
			show(){
				return this.$store.state.emojiView
			}
		},
		methods:{
			emojiPackage:function(e){
				//获取name值
				let names = e.target.attributes.name.nodeValue
				//隐藏表情面板
				document.querySelector("#textarea").focus();
				this.$store.commit("setEmojiView",false);
				this.$emit("show",names);
			}
		}
	}
</script>
<style scoped>
	.emoji-list{
	    width: 510px;
	    height: 174px;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    position: absolute;
	    top: -175px;
	    left: 0;
	    padding-left: 5px;
	    box-shadow: 0px -1px 25px 0px #999;
	    z-index: 666;
	    text-align: left;
	    background: #fff;
  }
  .emoji-list span{
		display: inline-block;
		width: 24px;
		height: 24px;
		line-height: 24px;
		background-image: url('http://f2e.cn.ronghub.com/sdk/emoji-48.png');
		background-size: auto 24px;
		overflow: hidden;
		vertical-align: middle;
		font-size: 0
  }
</style>