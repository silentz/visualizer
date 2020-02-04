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
		this.VISITED_COLOR = '#dddddd'
		this.ACTIVE_COLOR = '#c4e8ff'
		this.CURRENT_COLOR = '#c3ffbc'
		this.REJECT_EDGE = '#e82c0c'
		this.ACCEPT_EDGE = '#a0e8af'
		this.EDGE_DEFAULT = '#666666'
	}

	dfs(current_node) {
		this.states.same_change_node(current_node, 'color.background', this.CURRENT_COLOR)
		this.states.change_code_line([1, 0, 0])
		this.color[current_node] = 1
		this.states.change_code_line([2, 0, 0])
		this.edges.forEach((item) => {
			if (item.from === current_node || item.to == current_node) {
				this.states.same_change_edge(item.id, 'width', 3)
				this.states.change_code_line([3, 0, 0])
				let start = item.from
				let finish = item.to
				if (current_node === item.to) {
					start = item.to
					finish = item.from
				}
				if (this.color[finish] === 0) {
					this.states.same_change_edge(item.id, 'color', this.ACCEPT_EDGE)
					this.states.change_code_line([4, 0, 0])
					this.states.same_change_node(finish, 'color.background', this.CURRENT_COLOR)
					this.states.change_code_line([0, 0, 0])
					this.states.same_change_node(current_node, 'color.background', this.ACTIVE_COLOR)
					this.states.same_change_edge(item.id, 'width', 1)
					this.states.same_change_edge(item.id, 'color', this.EDGE_DEFAULT)
					this.dfs(finish)
					this.states.same_change_node(current_node, 'color.background', this.CURRENT_COLOR)
				} else {
					this.states.same_change_edge(item.id, 'color', this.REJECT_EDGE)
					this.states.change_code_line([2, 0, 0])
					this.states.same_change_edge(item.id, 'color', this.EDGE_DEFAULT)
					this.states.same_change_edge(item.id, 'width', 1)
				}
			}
		})
		this.states.change_code_line([5, 0, 0])
		this.states.same_change_node(current_node, 'color', this.VISITED_COLOR)
	}

	run() {
		this.dfs(this.start_node)
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
				'  mark node as visited',
				'  for t in "node neighbours":',
				'     if t is not already visited:',
				'       dfs(t)',
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
				'  return;',
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