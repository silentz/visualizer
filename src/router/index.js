import Vue from 'vue'
import Router from 'vue-router'
import RootComponent from '@/components/Root.vue'

Vue.use(Router)

export default new Router({
    routes: [
    	{
    		path: "/",
    		name: "root",
    		component: RootComponent
    	}
    ]
})
