import Vue from 'vue'
import Router from 'vue-router'
import RootComponent from '@/components/Root.vue'
import MainView from '@/components/MainView.vue'

Vue.use(Router)

// collecting all needed data for algorithms
// ========== [DFS] ===========
import dfs_preset_1 from '@/algorithms/dfs/presets/1.js';


export default new Router({
    routes: [
    	{
    		path: "/",
    		name: "root",
    		component: RootComponent
    	},
    	{
    		path: "/dfs",
    		name: "dfs",
    		component: MainView,
    		props: {
    			presets: [dfs_preset_1],
    			algorithm: undefined
    		}
    	}
    ]
})
