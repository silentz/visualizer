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

	dfs(current_node, parent_id) {
		this.states.change_code_line([1, 0, 1])
		if (this.color[current_node] !== 0) {
			this.states.change_code_line([2, 0, 2])
			return
		}
		this.states.change_code_line([3, 0, 3])
		this.color[current_node] = 1
		this.states.same_change_node(current_node, 'color', '#C3FFBC')
		this.states.change_code_line([4, 0, 4])
		this.edges.forEach((item) => {
			if (item.from === current_node) {
				this.states.change_code_line([5, 0, 5])
				this.states.change_code_line([0, 0, 0])
				this.states.same_change_edge(item.id, 'width', 3)
				this.dfs(item.to, item.id)
			}
			if (item.to === current_node) {
				this.states.change_code_line([5, 0, 5])
				this.states.change_code_line([0, 0, 0])
				this.states.same_change_edge(item.id, 'width', 3)
				this.dfs(item.from, item.id)
			}
		})
		this.states.change_code_line([6, 0, 6])
		this.color[current_node] = 2
		this.states.same_change_node(current_node, 'color', '#eee')
		if (parent_id !== undefined) {
			this.states.same_change_edge(parent_id, 'width', 1)
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
		const lines = {
			'Pseudo': [
				'dfs(node):',
				'  if node is already visited:',
				'    return',
				'  mark node as visited',
				'  for t in "node neighbours":',
				'     dfs(t)',
				'  exit node',
			],
			'C++': [
				'void dfs(const int node) {',
				'  if (visited[node]) {',
				'    return;',
				'  }',
				'  visited[node] = true;',
				'  for (auto t: neighbours[node]) {',
				'    dfs(t);',
				'  }',
				'}',
			],
			'Python': [
				'def dfs(node):',
				'  if visited[node]:',
				'    return',
				'  visited[node] = true',
				'  for t in neighbours[node]:',
				'     dfs(t)',
				'  return',
			]
		}
		return lines[lang]
	}
}