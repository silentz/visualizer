import StateGenerator from '@/utils/state.js';


export default class DFS {
	constructor(nodes, edges, start_node, network_defaults) {
		this.nodes = nodes.slice()
		this.edges = edges.slice()
		this.start_node = start_node
		this.color = {}
		nodes.forEach((item) => {
			this.color[item.id] = 0
		})
		this.states = new StateGenerator(nodes, edges, network_defaults)
	}

	dfs(current_node, parent_edge) {
		if (this.color[current_node] !== 0) {
			return
		}
		if (parent_edge !== undefined) {
			this.states.change_edge(parent_edge, 'width', 3)
		}
		this.color[current_node] = 1
		this.states.change_node(current_node, 'color', '#C3FFBC')
		this.edges.forEach((item) => {
			if (item.from === current_node) {
				this.dfs(item.to, item.id)
			}
			if (item.to === current_node) {
				this.dfs(item.from, item.id)
			}
		})
		this.color[current_node] = 2
		this.states.change_node(current_node, 'color', '#eee')
		if (parent_edge !== undefined) {
			this.states.change_edge(parent_edge, 'width', 1)
		}
	}

	run() {
		this.dfs(this.start_node, undefined)
		return this.states.states.slice()
	}
}