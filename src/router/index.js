import Vue from 'vue'
import Router from 'vue-router'
import RootComponent from '@/components/Root.vue'
import MainView from '@/components/MainView.vue'

Vue.use(Router)

export default new Router({
    routes: [
    	{
    		path: "/",
    		name: "root",
    		component: RootComponent
    	},
    	{
    		path: "/test",
    		name: "test",
    		component: MainView
    	}
    ]
})
