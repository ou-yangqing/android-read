<template>
<div class="novel-list">
    <div class="list" v-if="(i!=0||is)&&(i!=1||!is)&&(i!=2||isn)&&(i!=3||!isn)" v-for="(item,i) in ranks.module" :key="i">
    	<div class="list-title">{{item.name}}
    		<span @click="switchs(i)">
     		   <img v-if="item.channel==2" src="../../public/img/nv.png"/>
     		   <img v-if="item.channel==1" src="../../public/img/nan.png"/>
     		</span>
     	</div>
     	<div class="book-list" v-if="item.itemList.bookList">
     		<ul>
     			<li @click="view(list.bookId,list.name)" :class="list.introduce?'':'listbook'" v-for="(list,b) in item.itemList.bookList" :key="b">
     				<img class="img" :src="list.cover" />
     				<p class="name" v-if="!list.introduce">{{list.name}}</p>
     			</li>
     		</ul>
     	</div>
     	<div class="itemlist" v-if="item.channel">
     		<ul>
     			<li @click="view(s.bookId,s.name)" v-for="(s,l) in item.itemList.detailBookList" :key="l">
     				<img class="img" :src="s.cover"/>
     			    <div class="list-text">
     					<h3>{{s.name}}
     						<span>{{s.wordCount}}</span>
     					</h3>
     					<p>{{s.introduce}}</p>
     					<p>
     						<img src="../../public/img/writer_01.png"/>
     						<span>{{s.author}}</span> 
     						<span><i>{{s.category}}</i><i>{{s.score}}分</i></span>
     					</p>
     			    </div>
     			</li>
     		</ul>
     	</div>
       <div class="itemlist" v-if="item.channel">
     		<ul>
     			<li @click="view(s.bookId,s.name)" v-if="!item.itemList.detailBookList" v-for="(s,l) in item.itemList" :key="l">
     				<img class="img" :src="s.cover"/>
     				<i class="num">{{l+1}}</i>
     			    <div class="list-text">
     					<h3>{{s.name}}
     						<img src="../../public/img/hot.png"/>
     						<span>{{s.wordCount}}</span>
     					</h3>
     					<p>{{s.introduce}}</p>
     					<p>
     						<img src="../../public/img/writer_01.png"/>
     						<span>{{s.author}}</span> 
     						<span><i>{{s.category}}</i><i>{{s.score}}分</i></span>
     					</p>
     			    </div>
     			</li>
     		</ul>
     	</div>
     	<div class="more" @click="types(item.moreId,item.moreType,item.name,item.channel)" v-if="item.count===5">查看热销版单</div>
     	<div class="more" @click="types(item.moreId,item.moreType,item.name,item.channel)"  v-if="item.count===3">查看人气版单</div>
     	
    </div>
</div>
</template>

<script>
	export default {
		name: 'Ranking',
		props:['ranks'],
		data(){
			return {
				is:true,
				isn:true
			}
		},
		methods:{
			switchs(i){
				if(i>1){
				  this.isn=!this.isn
				}else{
				  this.is=!this.is
				}
			},
			view(val,no){
    		if(no){
    		   this.$router.push({path:'/book',query:{bookid:val}})
    		}
            },
    		types(mid,mtype,sname,ch){
    			console.log(sname)
				this.$router.push({path:'/type',query:{id:mid,type:mtype,name:sname,channel:ch}})
			}

		}
	}
</script>

<style>
</style>