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
			this.states.new_change_edge(parent_edge, 'width', 3)
		}
		this.color[current_node] = 1
		this.states.new_change_node(current_node, 'color', '#C3FFBC')
		this.edges.forEach((item) => {
			if (item.from === current_node) {
				this.dfs(item.to, item.id)
			}
			if (item.to === current_node) {
				this.dfs(item.from, item.id)
			}
		})
		this.color[current_node] = 2
		this.states.new_change_node(current_node, 'color', '#eee')
		if (parent_edge !== undefined) {
			this.states.new_change_edge(parent_edge, 'width', 1)
		}
	}

	run() {
		this.dfs(this.start_node, undefined)
		return this.states.states.slice()
	}

	static languages() {
		return ['Pseudo', 'C++', 'Python']
	}

	static get_language_lines(index) {
		const lang = this.languages()[index]
		if (lang === 'Pseudo') {
			return [
				'dfs(node):',
				'  if node is already visited:',
				'    return',
				'  mark node as visited',
				'  for t in "unvisited neighbours":',
				'     dfs(t)',
			]
		}
		if (lang === 'C++') {
			return [
				'void dfs(const int node) {',
				'  if (visited[node]) {',
				'    return;',
				'  }',
				'  visited[node] = true;',
				'  for (auto t: neighbours[node]) {',
				'    dfs(t);',
				'  }',
				'}',
			]
		}
		if (lang === 'Python') {
			return [
				'def dfs(node):',
				'  if visited[node]:',
				'    return',
				'  visited[node] = true',
				'  for t in neighbours[node]:',
				'     dfs(t)',
			]
		}
	}
}