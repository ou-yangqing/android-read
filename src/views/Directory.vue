<template>
  <div class="book">
       <div class="book-top">
           <span class="iconfont icon-zuojiantou-01" @click="$router.go(-1)"></span>
           <span class="iconfont icon-shouye" @click="$router.push({path:'/'})"></span>
                        目录 
       </div>
         <div class="dirtitle">
            <p>{{dir.name}}</p>
            <div class="desc">
               <span @click="descsw(0)" :class="desc==0 ? 'ck':''">正序</span>
               <span @click="descsw(1)" :class="desc==1? 'ck':''">倒序</span>
            </div>
         </div>
         <div class="diritems">
         	<ul>
         		<li @click="read(item.chapterId,item.text)" :class="(item.chapterId==$route.query.cid)?'blue':''" v-for="(item,i) in diritem" :key="i">
         			{{item.name}}<i v-if="item.text">{{item.text}}</i><span v-if="item.original!=='0'&&!item.text">{{item.original}}</span>
         		</li>
         	</ul>
         </div>
         <div class="dirpage">
         	<ul>
         		<li><span :class="dir.prevPageIndex? '':'op'" @click="pre">上一页</span></li>
         		<li>
         			<span>
         				<i><em></em></i>
         			    <select @change="page">
         			  	    <option v-for="(num,s) in dir.pages"  :selected ="num.Key==dir.selectPage" :value="num.Key" :key="s">{{num.Key}}</option>
         			    </select>
         			    
         			</span>
         		</li>
         		<li><span :class="dir.nextPageIndex? '':'op'" @click="next">下一页</span></li>
         	</ul>
         </div>
  </div>
</template>

<script>
	export default {
		name: 'Directory',
		data(){
			return {
				dir:{},
			    diritem:{},
			    desc:0
		    }
		},
        created() {
        	    if(this.$route.query.desc=='1'){
        	    	this.desc=1
        	    }else{
        	    	this.desc=0
        	    }
            if(this.$route.query.cid){
                this.axios.get('/api/sharp/H5BookStore/act.ashx?actionid=9005&bookid='+this.$route.query.bookid+'&cid='+this.$route.query.cid)
                  .then(response => {
                      this.dir=response.data.ResponseObject[0].module
                      this.diritem=this.dir.ascList
                      console.log(this.dir,'目录')
                      console.log(this.dir.prevPageIndex.length,'目录55')
                      
                  }, err => {
                  alert(err)
                })
            }else{
            	this.axios.get('/api/sharp/H5BookStore/act.ashx?actionid=9005&bookid='+this.$route.query.bookid+'&pageindex='+this.$route.query.page+'&pageSize=100')
                  .then(response => {
                      this.dir=response.data.ResponseObject[0].module
                      if(this.$route.query.desc==0){
                      	this.diritem=this.dir.ascList
                      }else if(this.$route.query.desc==1){
                      	this.diritem=this.dir.descList
                      	
                      }else{
                      		this.diritem=this.dir.ascList
                      }
                      
                  }, err => {
                  alert(err)
                })
            }
        },
        methods:{
        	pre(){
        		if(this.dir.prevPageIndex){
        		    this.$router.push({path:'/directory',query:{bookid:this.$route.query.bookid,page:this.dir.prevPageIndex,desc:this.desc}})
        		    location.reload() 
        		}
        	},
        	next(){
        		if(this.dir.nextPageIndex){
        		    this.$router.push({path:'/directory',query:{bookid:this.$route.query.bookid,page:this.dir.nextPageIndex,desc:this.desc}})
                    location.reload() 
        		}
        	},
        	page(e){
        		this.$router.push({path:'/directory',query:{bookid:this.$route.query.bookid,page:e.target.value,desc:this.desc}})
                    location.reload() 
        	},
        	read(cid,t){
        		if(t){
  	  	           this.$router.push({path:'/read',query:{bookid:this.$route.query.bookid,chapterid:cid}})
  	  	        }else{
  	  	        	this.$router.push({path:'/buybook'})
  	  	        }
  	       },
  	       descsw(n){
  	       	 this.desc=n
  	       	 console.log(this.desc)
  	       	 if(this.desc==0){
  	       	 	this.diritem=this.dir.ascList
  	       	 }else if(this.desc==1){
  	       	 	this.diritem=this.dir.descList
  	       	 }
  	       	 
  	       }
        }
	}
</script>

<style>
	.dirtitle{
		border-bottom: solid 1px #E9EEF1;
        padding: 10px 10px;
        width: 100%;
        height: 51px;
        background: #fff;
        position: fixed;
        top: 45px;
        background: #fff;
        z-index: 100;
	}
	.dirtitle p{
		margin-right: 10px;
		float: left;
		    width: 53%;
		        font-size: 16px;
    color: #ff6600;
    line-height: 30px;
        text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
	}
	.dirtitle .desc{
		float: right;
border: solid 1px #6EAEFE;
    border-radius: 6px;
    color: #6EAEFE;
    height: 30px;
    line-height: 28px;
    width: 120px;
	}
	.desc span{
		float: left;
		text-align: center;
		    display: block;
    width: 50%;
    font-size: 14px;
	}
	.desc span.ck{
		    color: #FFFFFF;
    background: #6EAEFE;
	}
	.diritems{
		background: #fff;
		width: 100%;
		margin-top: 51px;
		
	}
	.diritems li{
		    padding-left: 10px;
		    padding-right: 50px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #E9EEF1;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: #505557;
        font-family: '微软雅黑';
        font-size: 14px;
        position: relative;
	}
	.diritems li.blue{
		    background: #6EAEFE;
		    color: #fff;
	}
	.diritems li i{
		    text-align: right;
    line-height: 26px;
    font-size: 12px;
    display: inline-block;
    position: absolute;
    height: 26px;
    top: 7px;
    right: 10px;
	}
	.diritems li span{
     background: url(../../public/img/yb.png) no-repeat left center;
    background-size: 16px;
    padding-left: 20px;
    text-align: right;
    line-height: 26px;
    font-size: 12px;
    width: auto;
    color: #848b90;
    position: absolute;
        top: 7px;
    right: 10px;
    
	}
	.dirpage{
	    padding: 15px 10px 5px;
        text-align: center;
        height: 48px;
        width: 100%;
        background: #fff;
        margin-bottom: 8px;
	}
	.dirpage li{
		float: left;
		width: 33.33%;
	}
	.dirpage li span{
		width: 84px;
		height: 28px;
		line-height: 28px;
		 background: #6EAEFE;
    color: #FFFFFF;
    padding: 7px 19px;

    text-align: center;
	}
	.dirpage li span.op{
		opacity: .55;
	}
	.dirpage li:nth-child(2) span{
		 background: #fff;
		 padding-left: 10px;
		 position: relative;
	}
	.dirpage li span select{
		    -webkit-appearance: none;
    height: 28px;
    width: 80px;
    border: 0;
    position: relative;
    background-color: rgba(255, 255, 255, 0);
    padding-left: 5px;
    border-radius: 0;
        font-family: inherit;
    font-size: 100%;
    vertical-align: middle;
    outline: 0;
    border:  1px solid #cbcbcb;
	}
	.dirpage li:nth-child(2) i{
    height: 30px;
    width: 20px;
    background-color: #cbcbcb;
    position: absolute;
    right: 19px;
    top: 5px;
    z-index: 10;
}
.dirpage li:nth-child(2) em {
    height: 0;
    width: 0;
    position: absolute;
    top: 11px;
    right: 4px;
    border-style: solid;
    border-width: 5px 5px 0;
    border-color: #fff transparent;
    pointer-events: none;
    z-index: 160;
}
</style>