<template>
  <div class="book">
       <div class="book-top">
           <span class="iconfont icon-zuojiantou-01" @click="$router.go(-1)"></span>
           <span class="iconfont icon-shouye" @click="$router.push({path:'/'})"></span>
                   章节购阅
       </div>
       请购买
  </div>
</template>

<script>
	export default {
		name: 'Buybook'
	}
</script>

<style>
</style>