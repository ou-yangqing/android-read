<template>
<div class="novel-list">
    <div class="sex" v-for="(sex,e) in point.module">
    	<div class="sex-title">{{sex.name}} <span>新增：{{sex.total}}</span></div>
    	<div class="sex-list">
    		<ul>
    			<li @click="types(si.moreId,si.moreType,si.name)" v-for="(si,m) in sex.itemList">
    				<img :src="si.cover"/>
    				<div class="lx">
    					<h4>{{si.name}}</h4>
    					<p>{{si.count}}</p>
    				</div>
    			</li>
    		</ul>
    	</div>
    </div>
</div>
</template>

<script>
	export default {
		name: 'Classification',
		props:['point'],
		methods:{
			types(mid,mtype,sname){
				this.$router.push({path:'/type',query:{id:mid,type:mtype,name:sname,channel:0}})
			}
		}
	}
</script>

<style>
	.sex{
		width: 100%;
		overflow: hidden;
		background: #fff;
	}
	.sex-title{
		width: 100%;
		font-size: 18px;
		padding: 12px 15px 8px 15px;
		color: #000922;
	 border-bottom: 1px solid #f8fafb;
	 position: relative;
	}
	.sex-title span{
	font-size: 14px;
    color: #a0a4ab;
    position: absolute;
    right: 18px;
    top: 12px;
    line-height: 18px;
	}
	.sex:last-child{
		margin-top: 8px;
	}
	.sex-list,ul{
		width: 100%;
		overflow: hidden;
	}
	.sex-list li{
		float: left;
		width: 50%;
		padding: 10px 0 10px 10px;
		border-bottom: 1px solid #f0f1f3;
	}
	.sex-list li img{
		float: left;
		width: 35px;
		margin-left: 5px;
	}
	.sex-list li .lx{
		float: left;
		margin-left: 12px;
	}
	.sex-list li .lx h4{
		    font-size: 16px;
		        color: #000922;
		            overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 400;
    line-height: 24px;
	}
	.lx p{
		    color: #a0a4ab;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    width: 100%;
    margin-top: 1px;
	}
</style>