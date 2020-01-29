import lodash from "lodash"


export default class StateGenerator {
	constructor(nodes, edges) {
		this.states = []
		this.construct_initial_state(nodes, edges)
	}

	construct_initial_state(nodes, edges) {
		let initial_nodes = {}
		let initial_edges = {}
		nodes.forEach(function(item) {
			initial_nodes[item.id] = {
				id: item.id,
				color: {
					background: '#fff',
					border: '#666',
				}
			}
		})
		edges.forEach(function(item) {
			initial_edges[item.id] = {
				id: item.id,
				label: undefined,
				color: {
					color: '#666'
				}
			}
		})
		this.states.push({
			nodes: initial_nodes,
			edges: initial_edges,
		})
	}

	clone_last_state() {
		return lodash.cloneDeep(this.states[this.states.length - 1])
	}

	change_node_color(node_id, color) {
		let last_state_copy = this.clone_last_state()
		last_state_copy.nodes[node_id].color = color
		this.states.push(last_state_copy)
	}

	change_edge_color(edge_id, color) {
		let last_state_copy = this.clone_last_state()
		last_state_copy.edges[edge_id].color.color = color
		this.states.push(last_state_copy)
	}
}