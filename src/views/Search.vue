<template>
  <div class="book">
       <div class="book-top">
           <span class="iconfont icon-zuojiantou-01" @click="$router.go(-1)"></span>
           <input  ref="sear" @focus="focus" @blur="$refs.mask.style.display='none'" @input="keyword" placeholder="搜索书名、作者、出版社"/>
           <span class="iconfont icon-sousuo m" @click="sear"></span>
           
       </div>
       <div ref="mask" class="mask"></div>	
       <div class="key" v-if="is">
       	   <ul v-if="keywords">
       	  	   <li @click="sear(w)" v-for="(w,k) in keywords" :key="k">{{w}}</li>
       	  </ul>
       </div>
       <div class="hotsearch"  v-if="isn">
       	   <h5 class="hot-title">
       	   	  热门搜索
       	   	  <img @click="refresh" src="../../public/img/shuaxin.png"/>
       	   </h5>
       	   <ul>
       	   	    <li @click="sear(hot)" v-for="(hot,o) in hotsear" :key="o">{{hot}}</li>
       	   </ul>
       </div>
       <div class="history"  v-if="isn">
       	   <h5 class="hot-title">
       	   	  搜索历史
       	   	  <img @click="dec" src="../../public/img/del.png"/>
       	   </h5>
       	   <ul>
       	   	   <li v-if="r.length>0" @click="sear(r)" v-for="(r,e) in hissear" :key="e">{{r}}</li>
       	   </ul>
       </div>
       <div class="books" v-if="searconent">
       	<div class="b-top">"{{searconent.searchName}}的相关作品 <span>{{searconent.recordCount}}</span></div>
      <div class="itemlist" v-if="searconent">
     		<ul>
     			<li @click="view(s.bookId,s.name)" v-for="(s,l) in searconent.bookList" :key="l">
     				<img class="img" :src="s.cover"/>
     			    <div class="list-text">
     					<h3>{{s.name}}
     						<span>{{s.readNum}}人阅读</span>
     					</h3>
     					<p>{{s.introduce}}</p>
     					<p>
     						<img src="../../public/img/writer_01.png"/>
     						<span>{{s.author}}</span> 
     						<span><i>{{s.status}}</i><i>{{s.score}}分</i></span>
     					</p>
     			    </div>
     			</li>
     		</ul>
     	</div>
     	<div @click="loading" class="more">加载更多<i class="iconfont icon-youshuangjiantou"></i></div>

       </div>
  </div>
</template>

<script>
	export default {
		name: 'Search',
		data(){
			return {
				keywords:{},
				hotsear:{},
				his:[],
				hissear:'',
				is:false,
				isn:true,
				searconent:'',
				num:1
			}
		},
		created() {
			this.isn=true
          this.axios.get('/api/sharp/H5BookStore/act.ashx?actionid=9014')
            .then(response => {
                this.hotsear=response.data.ResponseObject[0].module.hotSearch
             }, err => {
                 alert(err)
             })
        this.hissear=JSON.parse(window.sessionStorage.getItem('his'))
     
        },
        methods:{
        	keyword(e){
               if(e.target.value===''){
               	 this.keywords=''
               }else{
        	   this.axios.get('/api/sharp/H5BookStore/act.ashx?actionid=90144&keyword='+e.target.value)
                   .then(response => {
                   	this.keywords=response.data.ResponseObject[0].names
                   }, err => {
                      alert(err)
                   })
               }
        	},
        	focus(e){
        		this.is=true
        		this.$refs.mask.style.display='block'
        	    if(e.target.value===''){
               	   this.keywords=''
                }
        	},
        	sear(val){
        		this.is=false
        		if(val.length){
        			this.$refs.sear.value=val
        		}
        		if(JSON.parse(window.sessionStorage.getItem('his'))==null){
        			this.his.push(this.$refs.sear.value)
        			window.sessionStorage.setItem("his",JSON.stringify(this.his))
        		}else{
        		   this.his=JSON.parse(window.sessionStorage.getItem('his'))
        		   this.his.push(this.$refs.sear.value)
        		    window.sessionStorage.setItem("his",JSON.stringify(this.his));
        		}
        		if(this.$refs.sear.value.length>0){
        			this.isn=false
        	    this.axios.get('/api/sharp/H5BookStore/act.ashx?actionid=9014&keyword='+this.$refs.sear.value)
                   .then(response => {
                   	this.searconent=response.data.ResponseObject[0].module
                       console.log(this.searconent)
                   }, err => {
                       alert(err)
                   })
                   }
        	},
        	refresh(){
        		
        	this.axios.get('/api/sharp/H5BookStore/act.ashx?actionid=9014')
            .then(response => {
                this.hotsear=response.data.ResponseObject[0].module.hotSearch
             }, err => {
                 alert(err)
             })
        	},
        	dec(){
        		this.hissear=''
        		window.sessionStorage.removeItem('his')
        	},
        	view(val,no){
    		        if(no){
    		            this.$router.push({path:'/book',query:{bookid:val}})
    	  	           }
    	     },
    	    loading(){
    	    	this.num++
    	    	   this.axios.get('/api/sharp/H5BookStore/act.ashx?actionid=9014&keyword='+this.$refs.sear.value+'&pageIndex='+this.num)
                   .then(response => {
                   	let s=response.data.ResponseObject[0].module.bookList
                   	for(let i=0;i<s.length;i++){
                   			this.searconent.bookList.push(s[i])
                   	}
                 
                   }, err => {
                       alert(err)
                   })
    	    }
        }
	}
</script>

<style>
	.m{
		right: 15px!important;
	}
	.book input{
		box-sizing: border-box;
	 border-radius: 35px;
	 color: #a0a4ab;
	         font-weight: 400;
    font-size: 14px;
    border: solid 1px #f8fafb;
    padding: 3px 8px;
    width: calc(100% - 96px);
    margin: 0 auto;
    line-height: none;
    position: absolute;
    left: 0;
    right: 0;
    top: 8px;
     height: 28px;
    display: block;
	}
	.book input::-webkit-input-placeholder{
        color: #a0a4ab;
}
.book .mask{
	width: 100%;
	height: 100%;
	max-width: 750px;
	position: fixed;
	top: 60px;
	background: rgba(0,0,0,.7);
	display: none;
	z-index: 60;
}
.key{
	width: 100%;
	position: fixed;
	top: 45px;
	z-index:70;
	overflow: hidden;
	background: #fff;
}
.key .mask ul{
	z-index: 100;
	background: #fff;
	
}
.key li{
	height: 40px;
    line-height: 40px;
    padding-left: 30px;
    border-bottom: 1px solid #F8FAFB;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    color: #000922;
    font-family: '微软雅黑';
}
.hotsearch,.history{
	width: 100%;
	margin-top: 8px;
	background: #fff;

}
.history{
	width: 100%;
	margin-top: 8px;
	background: #fff;
    margin-bottom: 8px;
}
.hot-title{
	box-sizing: border-box;
	width: 100%;
	position: relative;
    padding: 12px 15px;
    color: #000922;
    font-size: 16px;
    text-align: left;
}
.hot-title img{
	width: 18px;
	float: right;
}
.hotsearch ul{
	box-sizing: border-box;
	padding: 6px 2% 10px 2%;
    text-align:center;
 
}
.hotsearch ul li{
	padding: 0 12px;
    line-height: 30px;
    display: inline-block;
    margin-bottom: 10px;
    border-radius: 15px;
    background:red;
    color: #FFFFFF;
    margin-left: 5px;
    font-size: 14px;
    font-family: '微软雅黑';
    list-style-type: none;
}
.hotsearch li:nth-child(1), 
.hotsearch li:nth-child(3),
.hotsearch li:nth-child(9), 
.hotsearch li:nth-child(11) {
    background: #99df84;
}
.hotsearch li:nth-child(2), 
.hotsearch li:nth-child(8),
.hotsearch li:nth-child(10), 
.hotsearch li:nth-child(16) {
    background: #c065e6;
}
.hotsearch li:nth-child(4), 
.hotsearch li:nth-child(12),
.hotsearch li:nth-child(21){
    background: #f4724b;
}
.hotsearch li:nth-child(5), 
.hotsearch li:nth-child(13),
.hotsearch li:nth-child(16){
    background: #56a1ff;
}
.hotsearch li:nth-child(6), 
.hotsearch li:nth-child(14) {
    background: #fe7275;
}
.hotsearch li:nth-child(7), 
.hotsearch li:nth-child(15), 
.hotsearch li:nth-child(17) {
    background: #f5a623;
}

.history ul{
	box-sizing: border-box;
	padding: 6px 2% 10px 2%;
    text-align:center;
 
}
.history li {
	padding: 0 12px;
    line-height: 30px;
    display: inline-block;
    color: #a0a4ab;
        margin-bottom: 10px;
    border-radius: 15px;
    border: 1px solid #dde5eb;
    margin-left: 5px;
    font-size: 14px;
    font-family: '微软雅黑';
    list-style-type: none;
}
.books{
	background: #fff;
	margin-top: 8px;
}
.b-top{
	    padding: 12px 40px 8px 15px;
	    font-size: 18px;
	        border-bottom: 1px solid #f8fafb;
	        color: #000922;
	        height: 38.6px;
	            overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
}
.b-top span{
	position: absolute;
	    font-size: 14px;
    color: #a0a4ab;
    position: absolute;
    right: 18px;
    top: 12px;
    line-height: 18px;
}
</style>