import Vue from 'vue'
import Router from 'vue-router'
import RootComponent from '@/components/Root.vue'
import MainView from '@/components/MainView.vue'

Vue.use(Router)

// collecting all needed data for algorithms
// ========== [DFS] ===========
import DFS from '@/algorithms/dfs/run.js'
import BFS from '@/algorithms/bfs/run.js'
import dfs_preset_1 from '@/algorithms/dfs/presets/1.js'
import dfs_preset_2 from '@/algorithms/dfs/presets/2.js'
import dfs_preset_3 from '@/algorithms/dfs/presets/3.js'
import dfs_preset_4 from '@/algorithms/dfs/presets/4.js'
import dfs_preset_5 from '@/algorithms/dfs/presets/5.js'
import dfs_preset_6 from '@/algorithms/dfs/presets/6.js'
import dfs_preset_7 from '@/algorithms/dfs/presets/7.js'


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
    			presets: [
    				dfs_preset_1,
    				dfs_preset_2,
    				dfs_preset_3,
    				dfs_preset_4,
    				dfs_preset_5,
    				dfs_preset_6,
    				dfs_preset_7,
    			],
    			algorithm: DFS
    		}
    	},
        {
            path: "/bfs",
            name: "bfs",
            component: MainView,
            props: {
                presets: [
                    dfs_preset_1,
                    dfs_preset_2,
                    dfs_preset_3,
                    dfs_preset_4,
                    dfs_preset_5,
                    dfs_preset_6,
                    dfs_preset_7,
                ],
                algorithm: BFS
            }
        }
    ]
})
