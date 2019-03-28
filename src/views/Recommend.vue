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
  </div>
</template>

<script>
	export default {
		name: 'Recommend',
		data(){
			return {
				readcom:{
				}
			}
		},
        created() {
        this.$route.query.id=this.$route.query.id?this.$route.query.id:1010
        if(this.$route.query.type){
            this.axios.get('/api/sharp/H5BookStore/act.ashx?actionid=9004&id='+this.$route.query.id+'&take='+this.$route.query.take+'&name='+this.$route.query.name+'&type='+this.$route.query.type)
            .then(response => {
                this.readcom=response.data.ResponseObject[0].module
                console.log(this.readcom,'kkk')
             }, err => {
                 alert(err)
             })	
        }else{
        	  this.axios.get('/api/sharp/H5BookStore/act.ashx?actionid=9004&id='+this.$route.query.id+'&take='+this.$route.query.take+'&name='+this.$route.query.name)
            .then(response => {
                this.readcom=response.data.ResponseObject[0].module
                console.log(this.readcom,'kkk')
             }, err => {
                 alert(err)
             })	
        }

        },
        methods:{
        	view(val,no){
    		if(no){
    		   this.$router.push({path:'/book',query:{bookid:val}})
    		   }
    	}
        }
	}
</script>

<style>
	.w{
		background: #fff;
		padding-top: 5px;
	}
	.w ul li .list-text i{
    font-size: 14px;
		    color: #848b90;
    line-height: 1.8;
    overflow: hidden;
    margin-top: 0;
	}
	.w ul li  p:last-child{
		height: 48px;
		    color: #848b90;
    line-height: 1.8;
    height: 58px;
    overflow: hidden;
    margin-top: 0;
        font-size: 14px;
	}
</style>