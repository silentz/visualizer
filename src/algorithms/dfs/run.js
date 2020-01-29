import StateGenerator from '@/utils/state.js';

export default class DFS {
	constructor(nodes, edges, start_node) {
		this.nodes = nodes.slice()
		this.edges = edges.slice()
		this.start_node = start_node
		this.color = {}
		nodes.forEach((item) => {
			this.color[item.id] = 0
		})
		this.states = new StateGenerator(nodes, edges)
	}

	dfs(current_node, parent_edge) {
		if (this.color[current_node] !== 0) {
			return
		}
		this.color[current_node] = 1
		this.states.change_node_color(current_node, '#00ff00')
		this.edges.forEach((item) => {
			if (item.from === current_node) {
				this.dfs(item.to, item.id)
			}
			if (item.to === current_node) {
				this.dfs(item.from, item.id)
			}
		})
		this.color[current_node] = 2
		this.states.change_node_color(current_node, '#0000ff')
	}

	run() {
		this.dfs(this.start_node, -1)
		return this.states.states.slice()
	}
}