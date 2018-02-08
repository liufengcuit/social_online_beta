<template>
	<div class="contact-lists">
		<!-- 快速搜索群 -->
		<div class="fastSearch">
			<input type="text" placeholder="快速搜索 ID/名字" @keyup="fastSearch()" v-model="searchValue" @blur="removeSearchValue()">
			<i class="el-icon-search"></i>
		</div>
		<div class="lists-content">
			
			<div class="ul"
				v-for="(contact,$index) in groups"
				:key="$index"
				@click="changeSelect($index, contact)"
				:class="{'contact-selected': $index == contactIndex}"
			>
				<div class="contact-image">
					<img :src="contact.avatar" alt="">
				</div>
				<p class="contact-name">{{ contact.name }}</p>
				<p class="contact-id">&lt;&nbsp;{{ contact.group_id }}&nbsp;&gt;</p>
				<span :class="{badge: contact.status == true}"></span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "ContactsLists",
		data() {
			return {
				contactIndex:0,
				searchValue:'',
				fastLists:'',
				contacts:''
			}
		},
		computed:{
			groups(){
				let result = this.$store.state.groups;
				if(this.searchValue != ""){
					this.contacts = result;
					return this.fastLists;
				}else{
					return result
				}
			}
		},
		methods:{
			changeSelect(index, contact){
				this.contactIndex = index;
				this.$router.push("/group");
				this.$store.commit("set_active_group", contact);
				this.$store.commit("setCurrChatType", 3)
				let groups = this.$store.state.groups;
				for(var i=0, len=groups.length; i<len; i++){
					if(groups[i].group_id == contact.group_id){
						groups[i].status = false;
					}
				}
				this.$store.commit("setGroups", groups);
			},
			fastSearch(){
				console.log(this.contacts)
				let fastListsArr = []
				for(var i=0,len=this.contacts.length; i<len; i++){
					if(this.contacts[i].group_id.toString().indexOf(this.searchValue) != -1 || this.contacts[i].name.indexOf(this.searchValue) != -1){
						fastListsArr.push(this.contacts[i]);
					}
				}
				this.fastLists = fastListsArr;
				this.contactIndex = 0;
			},
			removeSearchValue(){
				this.searchValue = ''
				this.fastLists = this.contacts;
			}
		}
	}
</script>
<style scoped>
	.contact-lists{
		box-sizing: border-box;
		position: relative;
		height: 758px;
	}
	.lists-content{
		height: 722px;
		overflow: auto;
	    background: #2db7f5;
	}
	.contact-lists .ul{
		position: relative;
		padding: 5px 10px 10px;
	}
	.contact-image{
		width: 30px;
		height: 30px;
		border-radius: 50%;
		overflow: hidden;
		position: absolute;
	}
	.contact-image img{
		width: 100%;
	}
	.contact-name{
		padding-left: 35px;
		padding-top: 5px;
		box-sizing: border-box;
		white-space: nowrap;
		overflow: hidden;
		font-size: 14px;
	}
	.contact-id{
		padding-left: 35px;
		margin-top: 5px;
		box-sizing: border-box;
		white-space: nowrap;
		overflow: hidden;
	}
	.contact-lists .contact-selected{
		background: #70c7fd;
		color: #fff;
	}
	.el-icon-search{
		font-size: 15px;
	}
	.fastSearch{
		padding: 10px;
		width: 100%;
    	box-sizing: border-box;
    	height: 36px;
    	border-bottom: 1px solid #dcdfe6;
	}
	/*滚动条整体部分,必须要设置*/
    ::-webkit-scrollbar{
        width: 10px;
        height: 10px;
        background-color: #333;
    }
    /*滚动条的轨道*/
    ::-webkit-scrollbar-track{
        box-shadow: inset 0 0 5px rgba(0,0,0,.3);
        background-color: #f5f5f5;
    }
    /*滚动条的滑块按钮*/
    ::-webkit-scrollbar-thumb{
        border-radius: 10px;
        background-color: #29a9de;
        box-shadow: inset 0 0 5px #17d3d5;
    }
    /*滚动条的上下两端的按钮*/
    ::-webkit-scrollbar-button{
        height: 5px;
        background-color: #B0AEDA;
    }
    .badge{
    	display: inline-block;
    	transform: scale(.9);
    	width: 8px;
    	color: #fff;
    	height: 8px;
    	background-color: #ff0000;
    	border-radius: 50%;
    	position: absolute;
    	left:  150px;
    	top: 35px;
    }
</style>