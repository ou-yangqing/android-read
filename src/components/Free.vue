<template>
	<div class="novel-list" v-if="free.bookLimitFree.name" >
	     	<div class="book-list bg">
	     		<div class="list-top">
	     			<p v-if="free.bookLimitFree.name">{{free.bookLimitFree.name}}</p>
	     			<p>
	     			<CountDown  
			                    :currentTime="(new Date()).getTime()" 
			                    :startTime="(new Date()).getTime()" 
			                    :endTime="(new Date()).getTime()+parseInt(free.bookLimitFree.leftTime)*1000" 
			                    :tipText="''" 
			                    :tipTextEnd="''" 
			                    :endText="''" 
			                    :dayTxt="''" 
			                    :hourTxt="':'" 
			                    :minutesTxt="':'" 
			                    :secondsTxt="''">
	     			</CountDown>
	     			</p>
                    <p>更多<i v-if="free.bookLimitFree.name" @click="recommend(free.bookLimitFree.name,free.bookLimitFree.moreId,free.bookLimitFree.type)" class="iconfont icon-jiantou"></i></p>
	     		</div>
     		<ul>
     			<li @click="view(list.bookId)" class="listbook li" v-for="(list,b) in free.bookLimitFree.bookList" :key="b">
     			
     				<img class="img" :src="list.cover" />
     				<img class="mf" src="../../public/img/free_icon.png"/>
     				<p class="name" v-if="list.name">{{list.name}}</p>
     			</li>
     		</ul>
     	</div>
     	<div class="zj" v-if="free.chapterLimitFree.bookList">
	     		<div class="list-top">
	     			<p>{{free.chapterLimitFree.name}}</p>
	     			<p>
	     			<CountDown :currentTime="(new Date()).getTime()" 
			                    :startTime="(new Date()).getTime()" 
			                    :endTime="(new Date()).getTime()+parseInt(free.chapterLimitFree.leftTime)*1000" 
			                    :tipText="''" 
			                    :tipTextEnd="''" 
			                    :endText="''" 
			                    :dayTxt="''" 
			                    :hourTxt="':'" 
			                    :minutesTxt="':'" 
			                    :secondsTxt="''">
	     			</CountDown>
	     			</p>
                    <p>更多<i v-if="free.chapterLimitFree.name" @click="recommend(free.chapterLimitFree.name,free.chapterLimitFree.moreId,free.chapterLimitFree.type)" class="iconfont icon-jiantou"></i></p>
	     	 </div>
	     	 <ul>
	     	 	<li @click="view(zj.bookId)" v-for="(zj,j) in free.chapterLimitFree.bookList" :key="j">
	     	 	     <p v-if="zj.name">{{zj.name}}</p>
	     	 	     <p>{{zj.introduce}}</p>
	     	    </li>
	     	 </ul>
     	</div>
     	 <div class="itemlist bg" v-if="free.bookFree.name">
     	 	<div class="list-top"><p v-if="free.bookFree.name">{{free.bookFree.name}}</p></div>
     		<ul>
     			<li @click="view(s.bookId)"  v-for="(s,l) in free.bookFree.bookList" :key="l">
     				<img class="img" :src="s.cover"/>
     			    <div class="list-text">
     					<h3 v-if="s.name">{{s.name}}
     						<span>{{s.wordCount}}</span>
     					</h3>
     					<p>{{s.introduce}}</p>
     					<p>
     						<img src="../../public/img/writer_01.png"/>
     						<span>{{s.author}}</span> 
     						<span><i>{{s.category}}</i><i class="green">{{s.score}}分</i></span>
     					</p>
     			    </div>
     			</li>
     		</ul>
     		<div v-if="free.bookFree.name" @click="recommend(free.bookFree.name,free.bookFree.moreId,free.bookFree.type,free.bookFree.take)" class="more">查看更多<i class="iconfont icon-youshuangjiantou"></i></div>
     	</div>
	</div>
</template>

<script>
	import CountDown from 'vue2-countdown'
	export default {
		name: 'Free',
		props:['free'],
		data(){
			return {
				time:''
			}
		},
		components: {
            CountDown
       },
       methods:{
       	  view(val){
    		   this.$router.push({path:'/book',query:{bookid:val}})

    	  },
    	  recommend(sname,sid,cont,take){
    	  	if(take){
    	  		this.$router.push({path:'/recommend',query:{name:sname,id:sid,type:cont,take:take}})
    	  	}else{
    	  		this.$router.push({path:'/recommend',query:{name:sname,id:sid,type:cont}})
    	  	}
    	 	
    	  }
       }

	}
</script>

<style>
	.bg{
		background: #fff;
		border-bottom: solid 1px #f8fafb;
	}
	.list-top{        height: 50px;
		padding: 12px 0 8px 0;
        border-bottom: 1px solid #f8fafb;
	}
	.zj .list-top{
		padding-left: 15px;
	} 
	.list-top>p{
		float: left;
        width: 80px;
        line-height: 30px;
        vertical-align: middle;
		margin: 0 6px 0 0;
		color: #000922;
		font-size: 18px;
    font-family: '微软雅黑';
	}
	.list-top p:nth-child(2){
		width: calc(100% - 148px);
	}
	.list-top p:nth-child(3){
		margin: 0;
		width: 50px;
		text-align: right;
         color: #848b90;
         font-size: 14px;
	}
	.list-top p:nth-child(3) i{
		 font-size: 14px;
	}
	.li{
		position: relative !important;
	}
	.mf{
     position: absolute;
    top: 10px;
    left: 10px;
    width: 18px;
	}
	.zj{
		background: #fff;
		border-bottom: solid 1px #f8fafb;
	}
	.zj li{
		width: 100%;
        padding: 12px 15px;
        border-bottom: solid 1px #F8FAFB;
	}
	.zj li p{
		overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
	}
	.zj li p:first-child{
		color: #6EAEFE;
        font-size: 18px;
	}
	.zj li p:last-child{
		font-size: 16px;
    width: 98%;
        color: #515151;    color: #515151;
        height: 24px;
        line-height: 24px;
        box-sizing: border-box;
	}
	 .green{
	 	    border: solid 1px #49b939!important;
	 	    color: #49b939!important;
             box-shadow: 0 0 0 0 #49b939!important;
	 }  
</style>