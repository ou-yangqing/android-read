<template>
  <div class="book">
       <div class="book-top">
           <span class="iconfont icon-zuojiantou-01" @click="$router.go(-1)"></span>
           <span class="iconfont icon-shouye" @click="$router.push({path:'/'})"></span>
           {{$route.query.name}}
       </div>
      <div class="itemlist w" v-if="readcom">
     		<ul>
     			<li @click="view(s.bookId,s.name)" v-for="(s,l) in readcom.itemList" :key="l">
     				<img class="img" :src="s.cover"/>
     			    <div class="list-text">
     					<h3>{{s.name}}
     						<span>{{s.wordCount}}</span>
     					</h3>
     					<i>作者：{{s.author}}</i>
     					<p>{{s.introduce}}</p>
     					
     			    </div>
     			</li>
     		</ul>
     	</div>
     	<div @click="loading" class="more">查看更多<i class="iconfont icon-youshuangjiantou"></i></div>
  </div>
</template>

<script>
	export default {
		name: 'Type',
		data(){
			return {
				readcom:{
				},
				num:1
			}
		},
   created() {
            this.axios.get('/api/sharp/H5BookStore/act.ashx?actionid=9004&id='+this.$route.query.id+'&take='+this.$route.query.take+'&name='+this.$route.query.name+'&type='+this.$route.query.type+'&channel='+this.$route.query.channel)
            .then(response => {
                this.readcom=response.data.ResponseObject[0].module
                console.log(this.readcom,'kkkd')
             }, err => {
                 alert(err)
             })	
        },
        methods:{
        	view(val){
    		   this.$router.push({path:'/book',query:{bookid:val}})
          },
          loading(){
          	this.num++
          	this.axios.get('/api/sharp/H5BookStore/act.ashx?actionid=9004&id='+this.$route.query.id+'&take='+this.$route.query.take+'&name='+this.$route.query.name+'&type='+this.$route.query.type+'&pageindex='+this.num+'&channel='+this.$route.query.channel)
            .then(response => {
                let s=response.data.ResponseObject[0].module.itemList
                for(let i=0;i<s.length;i++){
                   	this.readcom.itemList.push(s[i])
                }
                console.log(this.readcom,'fff')
             }, err => {
                 alert(err)
             })	
          }
        }
	}
</script>

<style>
</style>