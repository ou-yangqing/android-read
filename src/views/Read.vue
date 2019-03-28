<template>
<div class="read">
	<div class="read-top">
		<img src="../../public/img/logo_read.png"/>
		<div class="read-rigth">
			<span @click="$router.push({path:'/'})">首页</span>
			<span @click="$router.push({path:'/bookcase'})">书架</span>
			<span>充值</span>
		</div>
	</div>
	<div class="read-nav">
		<span @click="$router.push({path:'/'})">首页 <i class="iconfont icon-jiantou"></i></span>
		<span @click="$router.push({path:'/book',query:{bookid:$route.query.bookid}})">{{readata.name}}</span>
		<span class="bt">
			<img src="../../public/img/read_moshi1.png"/>
			<img src="../../public/img/read_small1.png"/>
			<img src="../../public/img/read_big1.png"/>
		</span>
	</div>
	<div class="readtext">
		 <div v-html="readata.txt"></div>
	</div>
	<div class="read-item">	
		<ul>
			<li :class="readata.prevChapterId==='0'? 'tex' : ''" @click="pre">上一章</li>
			<li @click="ml">目录</li>
			<li :class="readata.nextChapterId==='0'? 'tex' : ''" @click="next">下一章</li>
		</ul>
	</div>
</div>
</template>

<script>
	export default {
        name: 'Read',
        data(){
        	return {
        		readata:{}
        	}
        },
        created() {
        	if(localStorage.getItem(this.$route.query.bookid)){
        		localStorage.setItem(this.$route.query.bookid,this.$route.query.chapterid)
        		if(sessionStorage.getItem(this.$route.query.bookid)){
        		    sessionStorage.setItem(this.$route.query.bookid,this.$route.query.chapterid)
        	    }
        	}else if(sessionStorage.getItem(this.$route.query.bookid)){
        		sessionStorage.setItem(this.$route.query.bookid,this.$route.query.chapterid)
        	}
        	
          this.axios.get('/api/sharp/H5BookStore/act.ashx?actionid=9007&bookid='+this.$route.query.bookid+'&chapterid='+this.$route.query.chapterid)
            .then(response => {
            	this.readata=response.data.ResponseObject[0].module
                console.log(this.readata,'ss')
             }, err => {
                 alert(err)
             })
        },
        methods:{
        	pre(){
        		if(this.readata.prevChapterId!=='0'){
        		    this.$router.push({path:'/read',query:{bookid:this.$route.query.bookid,chapterid:this.readata.prevChapterId,name:this.$route.query.name}})
        		    location.reload() 
        		}
        	},
        	next(){
        		console.log(this.readata.nextChapterId)
        		if(this.readata.nextChapterId!=='0'){
        		    this.$router.push({path:'/read',query:{bookid:this.$route.query.bookid,chapterid:this.readata.nextChapterId,name:this.$route.query.name}})
                    location.reload() 
        		}
        	},
  	        ml(){
  	  	        this.$router.push({path:'/directory',query:{bookid:this.$route.query.bookid,cid:this.$route.query.chapterid}})
  	        }        	
        }
     }
</script>

<style>
.read{
	width: 100%;
	background: #d6ead5;
}
.read-top{
	height: 52px;
    line-height: 50px;
    padding: 0 15px;
}
.read-top img{
	width: 140px;
	margin-top: 8px;
}
.read-top .read-rigth{
	float: right;
	width: 40%;
	
}
.read-rigth span{
	float: left;
	width: 33.3%;
	color: #2f442e;
    text-align: right;
    font-size: 16px;
    font-weight: 600;
}
.read-nav{
	background: #d6ead5;
    padding: 10px 15px;
    border-top: solid 1px #bbd5b9;
    color: #2f442e;
    font-size: 15px;
    width: 100%;
}

.bt{
	float: right;
}
.bt img{
	width: 30px;
    height: 20px;
    margin-left: 12px;
}
.readtext{
	width: 100%;
	padding: 0 15px 15px 15px;
}
.readtext h3{
	padding: 15px 0;
    font-weight: bold;
    font-size: 18px;
    text-align: center;
    color: #2f442e;
    line-height: 27px;
}
.readtext p{
	display: block;
	width: 100%;
    overflow: hidden;
	margin-bottom: 10px;
	word-break: break-all;
    word-wrap: break-word;
    text-align: justify;
    line-height: 2;
    font-size: 16px;
    color: #2f442e;
    text-indent:2em;
}
.read-item{
	padding: 15px 0;
    font-size: 16px;
    background: #c5e0c3;
}
.read-item li{
	float: left;
	width: 33.33%;
	text-align: center;
	color: #2f442e;
    text-align: center;
}
.read-item li.tex{
	color: #95b094;
}
</style>