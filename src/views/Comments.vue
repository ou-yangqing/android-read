<template>
<div class="book">
       <div class="book-top">
           <span class="iconfont icon-zuojiantou-01" @click="$router.go(-1)"></span>
           <span class="iconfont icon-shouye" @click="$router.push({path:'/'})"></span>
                   书籍评论
       </div>
       <div class="comxq" v-if="comData.book">
       	    <div class="left">
       	    	<img :src="comData.book.cover"/>
       	    </div>
       	    <div class="right">
       	    	<p>{{comData.book.name}}</p>
       	    	<div class="star"><img src="../../public/img/star_bg.png"/>
       	    	<em :style="'width:'+comData.book.star"><img src="../../public/img/star_x.png"/></em><i>{{comData.book.score}}</i>
       	    	</div>
       	    	<p class="p"><img src="../../public/img/writer_01.png"/>{{comData.book.author}}</p>
       	    	<p class="r"><span>{{comData.book.readNum}}</span>人在读</p>
       	    </div>
       </div>
       <div class="comments c" v-if="comData.commentList">
       <div class="comments-title">
       	  <span>评论（共{{comData.book.commentCount}}条）</span>
       	  <span class="sx">
       	  	    <ul>
       	  	    	<li :class="is?'':'ht'" @click="is=true">时间</li>
       	  	    	<li :class="is?'ht':''" @click="is=false">热度</li>
       	  	    </ul>
       	  </span>
       </div>
       	<div v-if="is" class="comments-item" v-for="(comd,p) in comData.commentList" :key="p">
       	   	   <img :src="comd.HeadUrl"/>
       	   	   <div class="comments-content">
       	   	      <p>{{comd.SenderName}}</p>
       			  <p v-if="comd.Title">{{comd.Title}}</p>
       			  <p v-if="comd.Content">{{comd.Content}}</p>
       			  <p v-if="comd.Content">{{comd.SendTime}}
       			  	<span>
       			  	<i class="iconfont icon-pinglun-xian"></i>
       			  	<em v-if="comd.CommentNum">{{comd.CommentNum}}</em>
       			  	<em v-else="comd.CommentNum">0</em>
       			  	<i class="iconfont icon-zan"></i>
       			  	<em v-if="comd.SupportNum">{{comd.SupportNum}}</em>
       			  	<em v-else="comd.SupportNum">0</em></span>
       			  </p>
       	   	 </div>
       	   </div>
       	    <button v-if="is" @click="time">加载更多时间</button>
       	   
       	  <div v-if="!is" class="comments-item" v-for="(co,g) in comData.commentListByHot">
       	   	   <img :src="co.HeadUrl"/>
       	   	   <div class="comments-content">
       	   	      <p>{{co.SenderName}}</p>
       			  <p v-if="co.Title">{{co.Title}}</p>
       			  <p v-if="co.Content">{{co.Content}}</p>
       			  <p v-if="co.Content">{{co.SendTime}}
       			  	<span>
       			  	<i class="iconfont icon-pinglun-xian"></i>
       			  	<em v-if="co.CommentNum">{{co.CommentNum}}</em>
       			  	<em v-else="co.CommentNum">0</em>
       			  	<i class="iconfont icon-zan"></i>
       			  	<em v-if="co.SupportNum">{{co.SupportNum}}</em>
       			  	<em v-else="co.SupportNum">0</em></span>
       			  </p>
       	   	   </div>
       	  </div>
       	  <button v-if="!is" @click="hot">加载更多热门</button>
       </div>
       <div class="comments-bottom">
       	  <span><i class="iconfont icon-gaixie"></i>写评论</span>
       </div>
</div>
</template>

<script>
export default {
  name: 'Comments',
  data(){
  	return {
  		comData:{},
  		num:0,
  		num1:0,
  		is:true
  	}
  },
  created() {
          this.axios.post('/api/sharp/H5BookStore/act.ashx?actionid=9026&bookid='+this.$route.query.bookid)
            .then(response => {
                 this.comData=response.data.ResponseObject[0]
                 console.log(this.comData,'评论')
             }, err => {
                 alert(err)
             })
  },
  methods:{
  	time(){
  		 this.num++
  		  this.axios.post('/api/sharp/H5BookStore/act.ashx?actionid=9026&bookid='+this.$route.query.bookid+'&pageIndex='+this.num)
            .then(response => {
            	let list=response.data.ResponseObject[0].commentList
            	for(let i=0;i<list.length;i++){
                 this.comData.commentList.push(list[i])
                }
             }, err => {
                 alert(err)
             })
  	},
  	hot(){
  		this.num1++
  		  this.axios.post('/api/sharp/H5BookStore/act.ashx?actionid=9026&bookid='+this.$route.query.bookid+'&pageIndex='+this.num1)
            .then(response => {
            	let list=response.data.ResponseObject[0].commentListByHot
            	for(let i=0;i<list.length;i++){
                 this.comData.commentListByHot.push(list[i])
                }
             }, err => {
                 alert(err)
             })
  	}
  }
}
	
</script>

<style>
	.c{
		margin-top: 0 !important;
		padding-bottom: 45px;
	
	}
	.sx li.ht{
		    color: #848b90;
	}
	.comxq{
		width: 100%;
		height: 128.4px;
		padding: 15px;
		background: #fff;
	}
	
	.comxq .right{
		float: left;
		margin-left: 8px;
	}
	.comxq .right p{
		font-size: 16px;
		line-height: 24px;
	}
	.comxq .right .star{
		margin: 4px 0;
		position: relative;
	}
	.comxq .right .star em{
		position: absolute;
		left: 0;
		top: 0;
		overflow: hidden;
	}
	.comxq .right .star i{
		position: absolute;
		right: -30px;
		top: 0;
		    line-height: 1.5;
    font-size: 14px;
    color: #000922;
    font-family: '微软雅黑';
	}
	.comxq .right p.p{
   line-height: 1.5;
    font-size: 14px;
    color: #000922;
    font-family: '微软雅黑';
	}
	.comxq .right p.r{
		    line-height: 1.5;
        font-size: 14px;
    color: #000922;
    font-family: '微软雅黑';
	}
	.comxq .right p.r span{
		color: #6EAEFE;
	}
	.comxq .right .p img{
		width: 16px;
		margin: 2px;
	}
	.comxq .right .star img{
		width: 120px;
	}
	    
	.comxq .left{
		float: left;
	    width: 68px;
        height: 95px;
    }
   .comments-bottom{
   	   width: 100%;
   	   height: 45px;
   	   background: #fff;
   	   position: fixed;
   	   bottom: 0;
   	   max-width: 750px;
   	   padding: 4px 8px;
   	   border-top:1px solid #c4c4c4;
   }
   .comments-bottom span{
   	display: inline-block;
   	text-align: center;
   	width: 70%;
   	margin-left: 15%;
   background: #6EAEFE;
    background-clip: padding-box;
    color: #FFFFFF;
    border: 1px solid #6EAEFE;
    border-radius: 6px;
    line-height: 34.8px;
    }
    .sx li{
    	float: left;
    	    line-height: 14px;
    padding: 0 8px;
    font-size: 14px;
    }
    .sx li:first-child {
    border-right: solid 2px #e9eef1;
}
</style>