<template>
	<div class="contact-lists">
		<!-- 快速搜索好友 -->
		<div class="fastSearch">
			<input type="text" placeholder="快速搜索 ID/名字" @keyup="fastSearch()" v-model="searchValue" @blur="removeSearchValue()">
			<i class="el-icon-search"></i>
		</div>
		<div class="lists-content">
			
			<div class="ul"
				v-for="(contact,$index) in groups"
				:key="$index"
				@click="changeSelect($index)"
				:class="{'contact-selected': $index == contactIndex}"
			>
				<div class="contact-image">
					<img :src="contact.avatar" alt="">
				</div>
				<p class="contact-name">{{ contact.name }}</p>
				<p class="contact-id">&lt;&nbsp;{{ contact.group_id }}&nbsp;&gt;</p>
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
			changeSelect(index){
				this.contactIndex = index;
				this.$router.push("/group")
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
		background: #f2f2f2;
		color: #409EFF;
	}
	.el-icon-search{
		font-size: 15px;
	}
	.fastSearch{
		padding: 10px;
		width: 100%;
    	box-sizing: border-box;
    	height: 36px;
	}
</style>