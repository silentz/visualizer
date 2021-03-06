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
			lines: [0, 0, 0],
			comments: [],
		})
	}

	clone_last_state() {
		return lodash.cloneDeep(this.states[this.states.length - 1])
	}

	last_index() {
		return (this.states.length - 1);
	}

	get_node_state(node_id, property) {
		let current_state = this.clone_last_state()
		return lodash.get(current_state.nodes[node_id], property)
	}

	get_edge_state(edge_id, property) {
		let current_state = this.clone_last_state()
		return lodash.get(current_state.edges[edge_id], property)
	}

	new_change_node(node_id, property, value) {
		let last_state_copy = this.clone_last_state()
		lodash.set(last_state_copy.nodes[node_id], property, value)
		this.states.push(last_state_copy)
	}

	new_change_edge(edge_id, property, value) {
		let last_state_copy = this.clone_last_state()
		lodash.set(last_state_copy.edges[edge_id], property, value)
		this.states.push(last_state_copy)
	}

	same_set_comment(comment) {
		this.states[this.last_index()].comments.push(comment)
	}

	same_change_node(node_id, property, value) {
		lodash.set(this.states[this.last_index()].nodes[node_id], property, value)
	}

	same_change_edge(edge_id, property, value) {
		lodash.set(this.states[this.last_index()].edges[edge_id], property, value)
	}

	change_code_line(lang_lines) {
		let last_state_copy = this.clone_last_state()
		last_state_copy.lines = lodash.cloneDeep(lang_lines)
		this.states.push(last_state_copy)
	}
}