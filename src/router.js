import Vue from 'vue'
import Router from 'vue-router'
import Book from './views/Book'
import Comments from './views/Comments'
import Type from './views/Type'
import Search from './views/Search'
import Read from './views/Read'
import Recommend from './views/Recommend'
import Directory from './views/Directory'
import Buybook from './views/Buybook'
import Bookcase from './views/Bookcase'

Vue.use(Router)

const routes = [
    {path:'/book',name:'book',component: Book},
    {path:'/comments',name:'comments',component: Comments},
    {path:'/type',name:'type',component: Type},
    {path:'/search',name:'search',component: Search},
    {path:'/read',name:'read',component: Read},
    {path:'/recommend',name:'recommend',component: Recommend} ,   
    {path:'/directory',name:'directory',component: Directory},
    {path:'/buybook',name:'buybook',component: Buybook},
    {path:'/bookcase',name:'bookcase',component: Bookcase}
]

const router = new Router({
    routes
})

export default router