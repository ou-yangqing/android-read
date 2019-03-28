<template>
  <div class="book"  v-if="bookdata.book">
       <div class="book-top">
           <span class="iconfont icon-zuojiantou-01" @click="$router.go(-1)"></span>
           <span class="iconfont icon-shouye" @click="$router.push({path:'/'})"></span>
           {{bookdata.name}}
       </div>
       <div class="book-box">
       	   <img class="bg-img" :src="bookdata.book.cover"/>
       	   <div class="book-left">
       	   	  <img :src="bookdata.book.cover"/>
       	   </div>
       	   <div class="book-right">
       	   	  <h4>{{bookdata.book.name}}</h4>
       	   	  <div class="points">
       	   	  	<span><img src="../../public/img/star_bg.png"/><i :style="'width:'+bookdata.book.star"><img src="../../public/img/star_x.png"/></i></span>
       	   	  	<span>{{bookdata.book.score}}分</span>
       	   	  </div>
       	   	  <p>作者：{{bookdata.book.author}}</p>
       	   	  <p>类型：</p>
       	   	  <p>{{bookdata.book.category}}</p>
       	   	  <p>字数：{{bookdata.book.wordCount}}</p>
       	   </div>
         
       </div>
       <div class="read">
       	   <span @click="add(bookdata.book.chapterId,bookdata.book.name,bookdata.book.cover)">
       	   	 <i v-if="continueTo">加入收藏</i>
       	   	 <i v-else="continueTo">
       	   	 	已收藏
       	   	 </i></span>
       	   <span @click="readed(bookdata.book.chapterId,bookdata.book.name,bookdata.book.cover)"><i v-if="isRead">立即阅读</i>
       	   	<i v-else="isRead">继续阅读</i></span>
       </div>
       <div class="directory">
       	 <div class="jj" :class="open?'j':''">
       	 	<p>简介：{{bookdata.book.introduce}}</p>
       	 	<i @click="opens" class="iconfont" :class="open?'icon-jiantou-xia':'icon-jiantou-shang'"></i>
       	 </div>
       	 <div class="tip">
       	 	<span @click="ml(bookdata.book.chapterId)" class="booki">查看目录</span>
       	 	<span class="zx">{{bookdata.book.latestChapter}}</span>
       	 	<span>{{bookdata.book.update}}<i class="iconfont icon-jiantou"></i></span>
       	 </div>
       </div>
       <div class="comments">
       	<div class="comments-title"><span>评论</span><span><i class="iconfont icon-gaixie"></i>写评论</span></div>
       	<div class="comments-item" v-for="(com,o) in bookdata.commentList" :key="o">
       		<img :src="com.HeadUrl"/>
       		<div class="comments-content">
       			  <p>{{com.SenderName}}</p>
       			  <p v-if="com.Title">{{com.Title}}</p>
       			  <p v-if="com.Content">{{com.Content}}</p>
       			  <p v-if="com.Content">{{com.SendTime}}
       			  	<span>
       			  	<i class="iconfont icon-pinglun-xian"></i>
       			  	<em v-if="com.CommentNum">{{com.CommentNum}}</em>
       			  	<em v-else="com.CommentNum">0</em>
       			  	<i class="iconfont icon-zan"></i>
       			  	<em v-if="com.SupportNum">{{com.SupportNum}}</em>
       			  	<em v-else="com.SupportNum">0</em></span>
       			  </p>
       		</div>
        </div>
            <div class="gd" @click="viewMore">查看更多评论<i class="iconfont icon-youshuangjiantou"></i></div>
      </div>
  </div>
</template>

<script>
import {MessageBox} from 'element-ui'
export default {
  name: 'Book',
  data(){
  	return {
  		bookdata:{},
  		open:true,
  		continueTo:'',
  		isRead:''
  	}
  },
  created() {
  	console.log(localStorage.getItem(this.$route.query.bookid))
  	      if(localStorage.getItem(this.$route.query.bookid)){
  	      	this.continueTo=false
  	      	this.isRead=false
  	      }else{
  	      	this.continueTo=true
  	      	if(sessionStorage.getItem(this.$route.query.bookid)){
  	      		this.isRead=false
  	      	}else{
  	      		this.isRead=true
  	      	}
  	      }
          this.axios.post('/api/sharp/H5BookStore/act.ashx?actionid=9002&bookid='+this.$route.query.bookid)
            .then(response => {
            	this.bookdata=response.data.ResponseObject[0].module
                 console.log(this.bookdata,'sss')
             }, err => {
                 alert(err)
             })
  },
  methods:{
  	  opens(){
  		this.open=!this.open
  	  },
  	  viewMore(){
  	  	this.$router.push({path:'/comments',query:{bookid:this.$route.query.bookid}})
  	  },
  	  readed(cid,name,img){
  	  	if(sessionStorage.getItem(this.$route.query.bookid)){
  	  		console.log('已阅读过')
  	  	}else{
  	  		sessionStorage.setItem(this.$route.query.bookid,cid)
  	  		 if(sessionStorage.getItem("bookcases")){
  	  			var bc = JSON.parse(sessionStorage.getItem("bookcases"))
  	  			bc.push([this.$route.query.bookid,name,img])
  	  			sessionStorage.setItem('bookcases',JSON.stringify(bc)) 
  	  		}else{
   	  		   var obj=[[this.$route.query.bookid,name,img]]
  	  		   sessionStorage.setItem('bookcases',JSON.stringify(obj)) 	  			
  	  		}
  	  	}
  	  
	  	if(localStorage.getItem(this.$route.query.bookid)){
	  		this.$router.push({path:'/read',query:{bookid:this.$route.query.bookid,chapterid:localStorage.getItem(this.$route.query.bookid)}})
	  	}else{
	  		console.log(sessionStorage.getItem(this.$route.query.bookid))
	  		if(sessionStorage.getItem(this.$route.query.bookid)){
	  			this.$router.push({path:'/read',query:{bookid:this.$route.query.bookid,chapterid:sessionStorage.getItem(this.$route.query.bookid)}})
	  		}else{
	  			this.$router.push({path:'/read',query:{bookid:this.$route.query.bookid,chapterid:cid}})
	  		}
	  		
	  	}
	  	
  	  },
  	  ml(id){
  	  	this.$router.push({path:'/directory',query:{bookid:this.$route.query.bookid,cid:id}})
  	  },
  	  add(id,name,img){
  	  	if(localStorage.getItem(this.$route.query.bookid)){
         this.$alert('该书已收藏', '安卓读书', {
          confirmButtonText: '确定'
        })
  	  	}else{
  	  	localStorage.setItem(this.$route.query.bookid,id)
  	  	this.$alert('收藏成功', '安卓读书', {
          confirmButtonText: '确定'
        })
  	  		if(localStorage.getItem("bookcase")){
  	  			var bc = JSON.parse(localStorage.getItem("bookcase"))
  	  			bc.push([this.$route.query.bookid,name,img])
  	  			localStorage.setItem('bookcase',JSON.stringify(bc)) 
  	  		}else{
   	  		   var obj=[[this.$route.query.bookid,name,img]]
  	  		   localStorage.setItem('bookcase',JSON.stringify(obj)) 	  			
  	  		}
 
  	  		
  	  	}
  
  	  }
  }
}
</script>
<style>
	.book{
		width: 100%;
		padding-top: 45px;
	}
	.book .book-top{
		width: 100%;
		background: #6EAEFE;
        height: 45px;
        color: #FFFFFF;
        text-align: center;
        font-size: 18px;
        line-height: 45px;
        max-width: 750px;
        position: fixed;
top: 0;
z-index: 100;
	}
	.book .book-top span{
	   position: absolute;
       font-size: 25px;
       color: #fff;
	}
	.book .book-top span:first-child{
		left: 10px;
	}
	.book .book-top span:last-child{
		right: 10px;
	}
	.book .book-box{
	    background: url(../../public/img/book_bg_bg.jpg) no-repeat;
        background-size: cover;
        height: 164px;
        overflow: hidden;
        position: relative;
        padding-left: 33%;
	}
	.book .book-box .bg-img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        opacity: 0.2;
	}
	.book-box .book-left{
		width: 88px;
		position: absolute;
        top: 30px;
        left: 3.5%;
	}
	.book-box .book-right{
		text-align: left;
        position: relative;
        padding-top: 26px;
	}
	.book-box .book-right h4{
		font-size: 16px;
		overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 24px;
        font-weight: 400;
        color: #fff;
	}
	.book-right .points{
		color: #fff;
		font-size: 13px;
		overflow: hidden;
		line-height: 19.2px;
	}
	.book-right .points span{
		overflow: hidden;
		position: relative;
		display: inline-block;
		width: 80px;
		height: 16.5px;
		
	}
	.book-right .points span i{
		overflow: hidden;
		height: 12.5px;
	   position: absolute;
	   bottom: 0;
	}
	.book-right .points span img{
		width: 80px;
		position: absolute;
		bottom: 0;
	 
	}
	.book-right p{
		color: #fff;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 19.2px;
	}
	.book-right p:nth-child(5){
		text-decoration: underline;
	}
	.book .read{
		width: 100%;
		height: 45px;
		background: #fff;
		padding: 5px 6%;
	}
	.book .read span{
		display: inline-block;
		width: 46%;
		border: 1px solid #6EAEFE;
		color: #6EAEFE;
		border-radius: 6px;
		line-height: 34px;
		text-align: center;
		position: relative;
	}
	.book .read span:last-child{
		margin-left: 6%;
		background: #6EAEFE;
		color:#fff;
	}
	.book .directory{
		margin-top: 8px;
		width: 100%;
		background: #fff;
	}
	.book .directory .jj{
		padding: 12px 3.5%;
		overflow: hidden;
		position: relative;
	}
	.book .directory .jj p{
		    font-size: 14px !important;
    color: #a0a4ab;
    line-height: 24px;
    overflow: hidden;
    word-break: break-all;
    word-wrap: break-word;
	}
	.book .directory .jj i{
		position: absolute;
		bottom: 3px;
		right: 3px;
		font-size: 20px;
		color: #a0a4ab;
	}
	.book .directory .jj.j{
		height: 84px;
		margin-bottom: 10px;
	}
	.book .directory .tip{
		width: 100%;
		    margin: 0 15px;
		    height: 30px;
    line-height: 22px;
    position: relative;
    padding-right: 0;
	}
	.book .directory .tip span{
		float: left;
		height: 22px;
		color: #9E9E9E;
	}
	.book .directory .tip .booki{
		width: 64px;
		color: #6eaefe;
		font-size: 13px;
		border-right: solid 1px #E9EEF1;
	}
	.book .directory .tip .zx{
		width: calc(100% - 150px)!important;
		font-size: 13px;
		padding-left:4px ;
		overflow: hidden;
		word-break: normal;
	}
	.book .directory .tip span:last-child{
		width: 50px;
		font-size: 10px;
	}
	.book .directory .tip span:last-child i{
		font-size: 10px;
		float: right;
	}
	.book .comments{
		width: 100%;
		margin-top: 8px;
		background: #fff;
	}
	.book .comments .comments-title{
		height: 40px;
        border-bottom: solid 1px #e9eef1;
	}
	.book .comments .comments-title span{
		float: left;
	}
	.book .comments .comments-title span:first-child{
		width: calc(100% - 90px - 17px);
		    font-size: 16px;
    padding-left: 15px;
    border-left: solid 2px #6EAEFE;

	}
	.book .comments .comments-title span:last-child{
		text-align: right;
		width: 90px;
		   color: #6eaefe;
	}
	.book .comments .comments-title span:last-child i{
		font-size: 20px;
	}
	.book .comments .comments-title{
		width: 100%;
		border-bottom: solid 1px #e9eef1;
		padding: 9px 0 8px;
		padding-right: 15px;
	}
	.comments-item{
		width: 100%;
		overflow: hidden;
		padding: 15px;
    border-bottom: solid 1px #e9eef1;
	}
	.comments-item img{
		float: left;
		width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
	}
	.comments-item .comments-content{
		float: left;
		width: calc(100% - 40px);
	}
	
	.comments-item .comments-content p{
		max-height: 64px;
		overflow: hidden;
	text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: 14px;
    line-height: 20px;
    }
    .comments-content p:last-child,.comments-content p:first-child{
    	   line-height: 30px;
    	    color: #848b90;
    	    line-height: 30px;
    	    
    }
    .comments-content p:last-child{
    	margin-top: 8px;
    }
    .comments-content p:last-child span{
    	float: right;
    	color: #000;
    }
    .comments-content p:last-child span i{
    	color: #848b90;
    	margin-left: 10px;
    }
    .gd{
    	width: 100%;
    	height: 60px;
    	line-height: 60px;
    text-align: center;
        color: #848b90;
    font-size: 14px;
    }
    .el-message-box__wrapper,.el-popup-parent--hidden,.v-modal{
    	height: 100%;
    	padding: 0!important;
    
    	max-width: 750px!important;
    	margin: 0 auto;
    	left: 20px;
    	right: 0;
    	
    }
    .el-message-box {
    	width: 270px!important;
    }
    .el-message-box__headerbtn, .el-message-box__headerbtn i:before{
    content: '';
    	width: 0!important;
    	height: 0!important;
    }
    .el-message-box__header{
    	text-align: center!important;
    	border-bottom: solid 1px #e9eef1;
    	    font-size: 17px!important;
    	    font-weight: 500!important;
    	    color: #000;
    }
    .el-message-box__message{
    	font-size: 14px;
    	color: #000;
    	text-align: center!important;
    }
    .el-button{
    	width: 94%;
    	
    }
    .el-message-box__btns{
    	padding-left: 0!important;
    }
</style>