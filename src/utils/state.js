import lodash from "lodash"


export default class StateGenerator {
	constructor(nodes, edges, network_defaults) {
		this.states = []
		this.construct_initial_state(nodes, edges, network_defaults)
	}

	construct_initial_state(nodes, edges, options) {
		let initial_nodes = {}
		let initial_edges = {}
		nodes.forEach((item) => {
			let c_node = lodash.cloneDeep(options.nodes)
			let result = lodash.assign(c_node, item)
			initial_nodes[item.id] = lodash.cloneDeep(result)
		})
		edges.forEach((item) => {
			let c_edge = lodash.cloneDeep(options.edges)
			let result = lodash.assign(c_edge, item)
			initial_edges[item.id] = lodash.cloneDeep(result)
		})
		this.states.push({
			nodes: initial_nodes,
			edges: initial_edges,
		})
	}

	clone_last_state() {
		return lodash.cloneDeep(this.states[this.states.length - 1])
	}

	change_node(node_id, property, value) {
		let last_state_copy = this.clone_last_state()
		lodash.set(last_state_copy.nodes[node_id], property, value)
		this.states.push(last_state_copy)
	}

	change_edge(edge_id, property, value) {
		let last_state_copy = this.clone_last_state()
		lodash.set(last_state_copy.edges[edge_id], property, value)
		this.states.push(last_state_copy)
	}
}