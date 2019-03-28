<template>
<div class="novel-list active">
     <div class="list" v-if="i!=7&&i!=8&&(i!=5||is)&&(i!=6||!is)" v-for="(item,i) in indexdata.module" :key="i">
     	<div v-if="item.name" class="list-title">{{item.name}}
     		<span v-if="!item.channel">{{item.count}}
     			<i v-if="item.name" @click="recommend(item.name,item.moreId,item.count)" class="iconfont icon-jiantou"></i>
     		</span>
     		<span @click="switchs">
     		   <img v-if="item.channel==2" src="../../public/img/nv.png"/>
     		   <img v-if="item.channel==1" src="../../public/img/nan.png"/>
     		</span>
     	</div>
     	<div class="book-list" v-if="item.itemList.bookList">
     		<ul>
     			<li v-if="list.name" @click="view(list.bookId,list.name)" :class="list.introduce?'':'listbook'" v-for="(list,b) in item.itemList.bookList" :key="b">
     				<img class="img" :src="list.cover" />
     				<p class="name" v-if="!list.introduce">{{list.name}}</p>
     				<div v-if="list.introduce" class="list-text">
     					<h3>{{list.name}}</h3>
     					<p>{{list.introduce}}</p>
     					<p>
     						<img src="../../public/img/writer_01.png"/>
     						<span>{{list.author}}</span>
     						<span>{{list.readNum}}人在追</span>
     					</p>
     				</div>
     			</li>
     		</ul>
     	</div>
     	<div class="detail-booklist" v-if="item.itemList.detailBookList">
     		<ul>
     			<li @click="view(d.bookId,d.name)" :class="d.name?'':'cname'" v-for="(d,k) in item.itemList.detailBookList" :key="k">
     				<img :src="d.cover"/>
     				<p class="name">{{d.name}}</p>
     				<span v-if="!d.name">[{{d.cname}}]</span>
     				<i v-if="!d.name">{{d.title}}</i>	
     			</li>
     		</ul>
     	</div>
     	<div class="detail-booklist" v-if="i==3">
     		<ul>
     			<li v-if="m.name" @click="view(m.bookId,m.name)" v-for="(m,n) in item.itemList" :key="n">
     				<img :src="m.cover"/>
     				<p class="name">{{m.name}}</p>
     			</li>
     		</ul>
     	</div>
     	<div class="itemlist" v-if="item.channel">
     		<ul>
     			<li v-if="s.name" @click="view(s.bookId,s.name)" v-for="(s,l) in item.itemList" :key="l">
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
     	<div class="more" @click="typesd(item.moreId,item.moreType,item.name,item.channel)" v-if="item.channel">查看人气版单</div>
     </div>
</div>
</template>

<script>
export default {
    name: 'AzxsIndex',
    props:['indexdata'],
    data(){
    	return {
    		is:true
    	}
    },
    methods:{
    	switchs(){
    		this.is=!this.is
    	},
    	view(val,no){
    		if(no){
    		   this.$router.push({path:'/book',query:{bookid:val}})
    		   }
    	},
    	recommend(sname,sid,cont){
    		this.$router.push({path:'/recommend',query:{name:sname,id:sid,take:cont}})
    	},
    	typesd(mid,mtype,sname,ch){
				this.$router.push({path:'/type',query:{id:mid,type:mtype,name:sname,channel:ch}})
		}
    }
}
</script>

<style>
.novel-list{
	width: 100%;
	padding-bottom: 50.6px;
	display: none;
}
.novel-list .list{
     background: #fff;
	margin-top: 8px;
	
}
.novel-list .list .list-title{
	width: 100%;
	height: 44.2px;
	font-size: 18px;
	color: #000922;
	padding: 12px 15px 8px 15px;
	border-bottom: 1px solid #f8fafb;
}
.list .list-title span{
	float: right;
	color: #6eaefe;
	font-size: 14px;
}
.list .list-title span i{
	font-size: 14px!important;
	margin-left: 15px;
}
.list .list-title span img{
	width: 46.4px;
}
.book-list{
	width: 100%;
	padding: 0 15px 0 15px;
	border-bottom: solid 1px #f8fafb
}
.book-list ul{
	overflow: hidden;
}
.book-list ul li{
	float: left;
	width: 100%;
	height: 140px;
	padding-left: 33.33%;
    padding-top: 15px;
    position: relative;
}
.book-list ul li.listbook{
	padding-right: 5px;
	padding-left: 0;
	width: 33.33%;
	height: 184px;
	padding-top: 10px;
	margin-bottom: 5px;
}
.book-list ul li .img{
	box-shadow: -1px 3px 5px rgba(0, 0, 0, .2);
	width: 80px;
	position: absolute;
	top: 10px;
	left: 0;
}
.book-list ul li.listbook .img{
	width: 90px;
	right: 0;
	margin: 0 auto;
}
.book-list ul li .list-text{
	width: 100%;
}
.book-list ul li .name{
	margin-top: 6px;
	color: #000922;
	width: 100%;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 44px;
    width: 90px;
    font-size: 14px;
    line-height: 1.5;
    margin: 0 auto;
}
li .list-text h3{
    padding: 4px 82px 4px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
li .list-text p{
	color: #848b90;
	font-size: 14px;
	line-height: 1.8;
	height: 48px;
    overflow: hidden;
}
li .list-text p:last-child{
	padding-top: 7px;
	height: 28px;
	font-size: 12px;
	position: relative;
	
}
li .list-text p:last-child img{
	float: left;
	position: static;
	width: 16px;
}
.list-text p:last-child span{
	float: left;
	margin-left:4px;
	width:calc(50% - 8px - 4px)
}
.list-text p:last-child span:last-child{
	text-align: right;
}
.detail-booklist{
	width: 100%;
	overflow: hidden;
	padding: 0 15px 0 15px;
}
.detail-booklist li{
	float: left;
	position: relative;
	padding-right: 5px;
	padding-left: 0;
	width: 33.33%;
	height: 184px;
	padding-top: 10px;
	margin-bottom: 5px;
}
.detail-booklist li.cname{
	width:100%;
	height: 49px;
	border-bottom: solid 1px #F8FAFB;
    padding: 12px 15px;
    font-size: 16px;
}
.detail-booklist li.cname span{
    color: #6EAEFE;
    padding-right: 5px;
     white-space: nowrap;
}
.detail-booklist li img{
	box-shadow: -1px 3px 5px rgba(0, 0, 0, .2);
	position: absolute;
	top: 10px;
	left: 0;
	width: 90px;
	right: 0;
	margin: 0 auto;
}
.detail-booklist li.cname i{
	color: #515151;
	overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.detail-booklist li p{
	margin-top: 6px;
	color: #000922;
	width: 100%;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 44px;
    width: 90px;
    font-size: 14px;
    line-height: 1.5;
    margin: 0 auto;
    overflow: hidden;
}
.itemlist{
	width: 100%;
	overflow: hidden;
	padding: 0 15px 0 15px;
	border-bottom: solid 1px #f8fafb;
}
.itemlist ul li{
	float: left;
	width: 100%;
	height: 130px;
	padding-left: 33.33%;
    padding-top: 15px;
    position: relative;
}
.itemlist ul li .img{
	box-shadow: -1px 3px 5px rgba(0, 0, 0, .2);
	width: 80px;
	position: absolute;
	top: 10px;
	left: 0;
}
.itemlist ul li .num{
	text-align: center;
	color: #fff;
	line-height: 15px;
	font-size: 14px;
	width: 15px;
	height: 20px;
	position: absolute;
	left: 0;
	top: 10px;
	background: url(../../public/img/icon_rank_01.png) top center no-repeat;
    background-size: 100%;
}
.itemlist ul li .list-text h3{
	position: relative;
}
.itemlist ul li .list-text h3 span{
	height: 20px;
	position: absolute;
	right: 0px;
    display: inline-block;
    font-weight: 400;
    max-width: 85px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    color: #a0a4ab;
    line-height: 20px;
}
.itemlist ul li .list-text h3 img{
	width: 20px;
	position: absolute;
	right: 60px;
	top: 0;
	opacity: .6;
	
}
.itemlist ul li .list-text p span:last-child{
	position: relative;
}
.itemlist ul li .list-text p span:last-child i{
	position: absolute;
    right: 2px;
    top: 4px;
    border-radius: 10px;  
    font-size: 10px;
}
.itemlist ul li .list-text p span:last-child i:last-child{
    color: #ff5858;
    border-radius: 10px;
    line-height: 11px;
    padding: 1.2px 8px 0.5px 8px;
    margin-left: 3px;
    box-shadow: 0 0 0 0 #ff5858;
    border: solid 1px #ff5858;
}
.itemlist ul li .list-text p span:last-child i:first-child{
	right: 50px;
	white-space: nowrap;
	color: #848b90;
    box-shadow: 0 0 0 0 #caced1;
    border: solid 1px #caced1;
    line-height: 11px;
    padding: 1.2px 8px 0.5px 8px;
	
}
.more{
	width: 100%;
	height: 45px;
	color: #6eaefe;
    text-align: center;
    border-top: solid 1px #f8fafb;
    font-size: 14px;
    line-height: 45px;
}
</style>