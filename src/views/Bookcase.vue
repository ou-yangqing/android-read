<template>
  <div class="book">
       <div class="book-top case">
           <span class="iconfont icon-zuojiantou-01" @click="$router.go(-1)"></span>
           <p class="case-his">
           	  <i @click="switch2" :class="sw?'':'xz'">历史</i>
           	   <i @click="switch1" :class="sw?'xz':''">收藏</i>
           </p>
           <p v-if="mg" @click="ment" class="gl">管理</p>
           <p v-else="mg" @click="ment" class="gl">完成</p>
       </div>
        <div  class="history-to">
        	 <div v-if="!sw" class="tolist">
        	 	    <div @click="re(t.bookId,t.chapterId)" class="to" v-for="(t,v) in rec.topList" :key="v">
        	 	    	<img :src="t.cover"/>
        	 	    	<img class="shelf_free" src="../../public/img/free_icon.png"/>
        	 	    </div>
        	 </div>
        <div class="recoms" v-if="!sw" >
            <ul class="container">
                    <transition-group name="slider">
                        <li @click="re(path.bookId,path.chapterId)" class="item" v-for="(path,index) in rec.recoms" :key="index" v-show="index===currentIndex">
                           <span>推荐</span>
                           {{path.title}}
                        </li>
                  </transition-group>

            </ul>
        </div>
        <div class="read-book" v-if="read">
        	 <ul>
        	 	    <li  v-for="(r,y) in read" :key="y">
        	 	    	  <img @click="reads(r[0])" :src="r[2]"/>
        	 	    	  <p @click="reads(r[0])">{{r[1]}}</p>
        	 	    	  <span :class="gener?'xzact':''" @click="xz(r[0],y,$event)"  v-if="!mg"></span>
        	 	    </li>
        	 </ul>
        </div>
        <div v-if="sw&&isshow" class="shujia_tip">
        	  <img src="../../public/img/icon_normal.png"/>
        </div>
        </div>
        <div class="case-bottom" v-if="!mg">
        	<span v-if="!gener" @click="qx" class="b">全选</span>
        	<span v-if="gener" @click="qbx" class="b">全不选</span>
        	<span @click="dele">删除</span>
        </div>
  </div>
</template>

<script>
	import {MessageBox} from 'element-ui'
	export default {
		name: 'Bookcase',
		data(){
			return {
				mg:true,
				sw:false,
				rec:{},
				currentIndex: 0,
				read:'',
				del:{},
				gener:false,
				isshow:false
			}
		},
		created() {
			    let obj=sessionStorage.getItem('bookcases')
			    this.read=JSON.parse(obj)
			    if(localStorage.getItem('bookcase')){
			    	this.isshow=false
			    }else{
			    	this.isshow=true
			    }
          this.axios.get('/api/sharp/H5BookStore/act.ashx?actionid=9017')
            .then(response => {
            	this.rec=response.data.ResponseObject[0].module
                 console.log(response.data.ResponseObject[0].module,'ddd')
                 if(this.rec.recoms){
                      this.$nextTick(function(){
                           setInterval(this.nextPic, 3000)
                      })
                 }
             }, err => {
                 alert(err)
             })
    },
		methods:{
				ment(){
					 this.mg=!this.mg
					 this.del={}
				},
				nextPic() {
                this.currentIndex++
                if (this.currentIndex >= this.rec.recoms.length) {
                    this.currentIndex = 0
                }
       },
       reads(bid){
	  		   console.log(bid)
	  		   if(this.sw){
	  		   	     this.$router.push({path:'/read',query:{bookid:bid,chapterid:localStorage.getItem(bid)}})
	  		   }else{
	  		   	    this.$router.push({path:'/read',query:{bookid:bid,chapterid:sessionStorage.getItem(bid)}})
	  		   }
	  		   
       },
       re(bid,cid){
       	  this.$router.push({path:'/read',query:{bookid:bid,chapterid:cid}})
       },
       switch1(){
       	      this.sw=true
       	      let obj=localStorage.getItem('bookcase')
			        this.read=JSON.parse(obj)
       },
       switch2(){
       	      this.sw=false
       	      let obj=sessionStorage.getItem('bookcases')
			        this.read=JSON.parse(obj)
       },
       xz(id,y,$event){
     
       	       if($event.target.className){
       	       	     $event.target.className=''
                          delete this.del[y]
       	       }else{
       	       	   $event.target.className='xzact'       	       	     
       	       	   this.del[y]=id
       	       }
       	     
       },
       dele(){
       	const h = this.$createElement;
        this.$message({
          title: '消息',
          message: h('p', null, [
            h('span', null, '是否所选书籍 '),
            h('i', { style: 'color: teal' })
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                         	   if(this.gener){
       	   	if(!this.sw){
       	   		sessionStorage.clear()
       	   	}else{
 
       	   		 localStorage.clear()
       	   	}
       	   	   
       	   }else{
       	   	    let key
       	   	    let obj=JSON.parse(sessionStorage.getItem('bookcases'))
       	   	  	let obj1=JSON.parse(localStorage.getItem('bookcase'))
       	   	    for (key in this.del){
       	   	    	if(!this.sw){
       	   	    		obj[key]=0
       	   	    		sessionStorage.removeItem(this.del[key])
       	   	  	  }else{
                    obj1[key]=0
                    localStorage.removeItem(this.del[key])
       	   	  	  }
       	   	    }
       	   	    if(!this.sw){
       	   	    	   obj = obj.filter(item => item !== 0)
       	   	         sessionStorage.setItem('bookcases',JSON.stringify(obj)) 
       	   	    }else{
       	   	    	   obj1 = obj1.filter(item => item !== 0)
       	   	         localStorage.setItem('bookcase',JSON.stringify(obj1)) 
       	   	    }

             

       	   }
       	   location.reload()
                }, 300);
              }, 3000);
            } else {
              done();
            }
          }
        })	
       },
       qx(){
       	this.gener=true
       },
       qbx(){
       	  this.gener=false
       }
			
		}
	}
</script>

<style>
	.case{
		background: #6c4834!important;
		padding-left: 35px;
		padding-right: 35px;
	}
	.case-his{

		width: 120px;
		height: 30px;
		    border: solid 1px #FFFFFF;
    border-radius: 6px;
    color: #FFFFFF;
    display: inline-block;
    vertical-align: -8px;
 
    line-height: 28px;
    overflow: hidden;

	}
	.gl{
		    position: absolute;
    bottom: 0px;
    right: 15px;
    width: 40px;
    height: 50px;
    line-height: 52px;
    color: #FFFFFF;
    font-size: 16px;
	}
	.case-his i{
		display: block;
    font-size: 16px;
    text-align: center;
    width: 50%;
    float: left;
    

	}
	.case-his i.xz{
		color: #6c4834;
    background: #FFFFFF;
	}
	
	
	.case-bottom{
		    position: fixed;
    background: #fff;
    border-top: 1px solid #dfdfdf;
    box-shadow: 0 -1px 2px rgba(0, 0, 0, .1);
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 210;
    text-align: center;
		border-top: solid 1px #e9e8e8;
    height: 49px;
    background: #fff;
        line-height: 49px;
        font-size: 14px;
	}
	.case-bottom span{
		display: inline-block;
    width: 49%;
    text-align: center;
    color: #878e93;
	}
	.case-bottom span.b{
		    color: #6EAEFE;
	}	
		.case-bottom span:last-child{
		border-left: solid 1px #e9e8e8;
	}
	.history-to{
	background: #fff;
	    padding-bottom: 51px;
	}
	.tolist{
		    padding: 0 15px 10px;
		     background: #6c4834;
		     overflow: hidden;
	}
	.tolist .to{
		width: 24%;
		float: left;
		margin: 10px 4.5% 10px 4.5%;
    position: relative;
	}
	.to img{
	box-shadow: -1px 3px 5px rgba(0, 0, 0, .2);
	}
	.to img.shelf_free {
    position: absolute;
    top: -1px;
    left: 8px;
    width: 21px;
    height: 44px;
}
  .recoms{
  	padding: 0 15px;
  }
	        .container {
            position: relative;
           box-sizing: border-box;
            width: 100%;
            height: 46px;
            overflow: hidden;
        }

        .container .item {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            padding: 10px 0;
            border-bottom: 1px solid #F8FAFB;
           overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
        }
        .container .item span{
        	  width: 40px;
        	  color: #6EAEFE;
        	  display: inline-block;
        	  height: 25px;
        	  text-align: center;
        	  line-height: 25px;
        	  font-size: 14px;
        	  border-radius: 8px;
        	  border: 1px solid #6EAEFE;
        	  margin-right: 10px;
        }
        .slider-enter {
            transform: translateX(315px);
        }

        .slider-enter-to {
            transform: translateX(0);
        }

        .slider-enter-active {
            transition: all .6s linear;
        }

        .slider-leave {
            transform: translateX(0);
        }
        .slider-leave-to {
            transform: translateX(-315px);
        }

        .slider-leave-active {
            transition: all .6s linear;
        }
        .read-book{
        	width: 100%;        		    
        	padding: 0 15px 10px;
		      overflow: hidden;

        }
        .read-book ul{
 		      display: flex;
		      flex-wrap: wrap;     	
        }
        .read-book li{
            flex-grow: 1;
            flex: 0 0 24%;
	          margin: 15px 4.5% 0;
            position: relative;
        }
        .read-book li p{
        	margin-top: 10px;
    height: 44px;
    overflow: hidden;
    font-size: 14px;
        line-height: 1.5;
        }
       .read-book li img{
	      box-shadow: -1px 3px 5px rgba(0, 0, 0, .2);
	      z-index: 100;
	     }
	     .read-book li span{
	     	z-index: 110;
    position: absolute;
    top: 0;
    right: 0;
    display: inline-block;
    width: 100%;
    height: 100%;
    background: url(../../public/img/icon_xz_y.png) no-repeat right 2px;
    background-size: 16px auto;
	     }
	     .read-book li span.xzact{
	     	background: url(../../public/img/icon_xz_y_on.png) no-repeat right 2px;
	     	background-size: 16px auto;
	     }
	     .shujia_tip {
    width: 100%;
    padding: 10px 3.5%;
    color: #848b90;
  
}
.shujia_tip img{
	    border: 0;
    vertical-align: middle;
	    width: 30%;
    display: block;
    margin: 0 auto;
}
</style>