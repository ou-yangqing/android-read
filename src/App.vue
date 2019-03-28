<template>
  <div id="app">
  	<div class="app" v-if="$route.path==='/'">
   <div class="top">
        <div class="top-logo">
            <img src="../public/img/idx_logo.png"/>
        </div>
        <div class="top-right">
            <img src="../public/img/logo.jpg"/>
            <span>&nbsp;&nbsp;|&nbsp;&nbsp;充值</span>
        </div>        
   </div>
   <div class="nav">
       <ul>
       	 <li class="act" @click="index(0,$event)">首页</li>
       	 <li @click="index(1,$event)">排行</li>
       	 <li @click="index(2,$event)">分类</li>
       	 <li @click="index(3,$event)">免费</li>
       </ul>
   </div>
   <div class="today" v-if="is">
       <img src="../public/img/today.png"/>
       <span>300读书券，免费领取！</span>
   </div>
   <div ref="xs">
   <AzxsIndex :indexdata="indexs"></AzxsIndex>
   <Ranking :ranks="rank"></Ranking>
   <Classification :point="points"></Classification>
   <Free :free="free"></Free>
   </div>
   <div class="bottom">
   	  <ul>
   	  	  <li><router-link to="/bookcase"><i class="iconfont icon-icon_shuchengnor"></i><p>书架</p></router-link></li>
   	  	  <li class="navact"><i class="iconfont icon-jiachang_shujia"></i><p>书城</p></li>
   	  	  <li><router-link to="/search"><i class="iconfont icon-sousuo"></i><p>搜索</p></router-link></li>
   	  	  <li><i class="iconfont icon-04"></i><p>我的</p></li>
   	  </ul>
    </div>
  </div>
  <router-view></router-view>
  </div>
</template>
<script>
import router from './router.js'
import AzxsIndex from './components/AzxsIndex'
import Ranking from './components/Ranking'
import Classification from './components/Classification'
import Free from './components/Free'
      export default {
        name: 'app',
        data(){
        	return {
        	    indexs:{},
        	    rank:{},
        	    points:{},
        	    free:{},
        	    is:true
        	}
        },
        created() {
          this.axios.get('/api/sharp/H5BookStore/act.ashx?actionid=9033&code=&state=')
            .then(response => {
                 this.indexs=response.data.ResponseObject[0]
                 console.log(this.indexs)
             }, err => {
                 alert(err)
             })
          this.axios.get('/api/sharp/H5BookStore/act.ashx?actionid=9008')
            .then(response => {
                 this.rank=response.data.ResponseObject[0]
                 console.log(this.rank)
             }, err => {
                 alert(err)
             })
          this.axios.get('/api/sharp/H5BookStore/act.ashx?actionid=9009')
            .then(response => {
                 this.points=response.data.ResponseObject[0]
                 console.log(this.points)
             }, err => {
                 alert(err)
             })
          this.axios.get('/api/sharp/H5BookStore/act.ashx?actionid=9025')
            .then(response => {
                 this.free=response.data.ResponseObject[0]
                 console.log(this.free,'ssss')
             }, err => {
                 alert(err)
             })
        },
        components:{
              AzxsIndex,
              Ranking,
              Classification,
              Free
        },
        router,
        methods:{
          index(s,evt){
            for(let i=0;i<evt.target.parentNode.children.length;i++){
                evt.target.parentNode.children[i].className=''
                this.$refs.xs.children[i].classList.remove("active")
            }
            if(s===0){
            	this.is=true
            }else{
            	this.is=false
            }
            evt.target.className='act'
            this.$refs.xs.children[s].classList.add("active")
          }
        }
      }
</script>

<style>
div,li,p{
box-sizing: border-box;
}
html,body{width:100%;height:100%; background: #efeff4;}
.active{
	display: block;
}
.navact{
	color: #6EAEFE !important;
}
a:visited{color: #848b90;}
a.router-link-active{
	color: #6EAEFE !important;
}
#app{
 max-width: 750px;
 width: 100%;
 margin: 0 auto;
 position: relative;
 overflow: auto;
}

.top{
width: 100%;
max-width: 750px;
height: 45px;
background: #6EAEFE;
padding: 12px;
border-bottom: solid 1px #E9EEF1;
position: fixed;
top: 0;
z-index: 100;
}
.top .top-logo{
float: left;
width: calc(100% - 90px);
height: 22.6px;
}
.top .top-logo img{
   width:92.8px;
   height: 21px;
}
.top .top-right{
float: left;
width: 90px;
height: 22.6px;
}
.top .top-right img{
float: left;
margin-left: 20px;
width: 21.6px;
height: 21.6px;
}
.top .top-right span{
float: left;
font-size: 14px;
color: #FFFFFF;
overflow: hidden;
 text-align: left;
 line-height: 21.6px;
}
.nav{
margin-top: 46px;
width: 100%;
height: 46.4px;
background: #fff;
border-bottom: solid 1px #E9EEF1;
}
.nav ul{
overflow: hidden;
}
.nav ul li{
float: left;
width: 25%;
color: #6EAEFE;
text-align: center;
line-height: 46.4px;
font-size: 18px;
}
.nav ul li.act{
position: relative;
}
.nav ul li.act:before{
content: "";
width: 28px;
height: 2px;
background:  #6EAEFE;
position: absolute;
bottom: 7px;
right: 0;
left: 0;
margin: 0 auto;
}
.today{
width: 100%;
height: 40px;
background: #fff;
padding: 10px 15px;
margin-top: 8px;
color: #000922;
font-size: 14px;
text-align: left;
line-height:20px;
}
.today img{
float: left;
height: 20px;
width: 92px;
}
.today span{
float: left;
margin-left: 5px;
}
.bottom{
width:100%;
height: 50.6px;
max-width: 750px;
border-top: 1px solid #dfdfdf;
background: #fff;
position: fixed;
bottom: 0;
z-index: 100;
}
.bottom ul{
	overflow: hidden;
}
.bottom ul li{
	float: left;
	width: 25%;
	height: 50.6px;
	font-size: 12px;
	text-align: center;
	color: #848b90;
	padding: 8px 0px 6px;
	position: relative;
}
.bottom ul li i{
	  width: 18px;
    height: 18px;
    font-size: 18px;
   position: absolute;
   top: 8px;
   left: 0;
   right: 0;
   margin: 0 auto;
}
.bottom ul li p{
	position: ab;
	height: 12px;
	position: absolute;
   bottom: 6px;
   left: 0;
   right: 0;
   margin: 0 auto;
   
}
</style>
