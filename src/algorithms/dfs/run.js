import StateGenerator from '@/utils/state.js';


export default class DFS {
	static VISITED_COLOR = '#ddd'
	static ACTIVE_COLOR = '#FFDEDE' //'#c4e8ff'
	static CURRENT_COLOR = '#c3ffbc'
	static COLOR_DEFAULT = '#fff'

	constructor(nodes, edges, start_node, network_defaults) {
		this.nodes = nodes.slice()
		this.edges = edges.slice()
		this.start_node = start_node
		this.color = {}
		nodes.forEach((item) => {
			this.color[item.id] = 0
		})
		this.states = new StateGenerator(nodes, edges, network_defaults)
		this.REJECT_EDGE = '#e82c0c'
		this.ACCEPT_EDGE = '#a0e8af'
		this.VISITED_COLOR = '#ddd'
		this.ACTIVE_COLOR = '#FFC3B3' //'#c4e8ff'
		this.CURRENT_COLOR = '#c3ffbc'
		this.COLOR_DEFAULT = '#fff'
		this.EDGE_DEFAULT = '#666666'
	}

	dfs(current_node) {
		this.states.same_change_node(current_node, 'color.background', this.CURRENT_COLOR)
		this.states.same_set_comment(`Entering node ${current_node}`)
		this.states.change_code_line([1, 1, 1])
		this.states.same_set_comment(`Mark node ${current_node} as visited`)
		this.color[current_node] = 1
		this.states.change_code_line([2, 2, 2])
		this.states.same_set_comment(`Iterating over neighbours of node ${current_node}`)
		this.edges.forEach((item) => {
			if (item.from === current_node || item.to == current_node) {
				this.states.same_change_edge(item.id, 'width', 3)
				this.states.change_code_line([3, 3, 3])
				let start = item.from
				let finish = item.to
				if (current_node === item.to) {
					start = item.to
					finish = item.from
				}
				if (this.color[finish] === 0) {
					this.states.same_change_edge(item.id, 'color', this.ACCEPT_EDGE)
					this.states.same_set_comment(`Node ${finish} is not visited`)
					this.states.change_code_line([4, 4, 4])
					this.states.same_change_node(finish, 'color.background', this.CURRENT_COLOR)
					this.states.same_set_comment(`Going to visit node ${finish}`)
					this.states.change_code_line([0, 0, 0])
					this.states.same_change_node(current_node, 'color.background', this.ACTIVE_COLOR)
					this.states.same_change_edge(item.id, 'width', 1)
					this.states.same_change_edge(item.id, 'color', this.EDGE_DEFAULT)
					this.dfs(finish)
					this.states.same_change_node(current_node, 'color.background', this.CURRENT_COLOR)
				} else {
					this.states.same_set_comment(`Node ${finish} is already visited`)
					this.states.same_change_edge(item.id, 'color', this.REJECT_EDGE)
					this.states.change_code_line([2, 2, 2])
					this.states.same_set_comment(`Continue iterating`)
					this.states.same_change_edge(item.id, 'color', this.EDGE_DEFAULT)
					this.states.same_change_edge(item.id, 'width', 1)
				}
			}
		})
		this.states.change_code_line([5, 7, 5])
		this.states.same_set_comment(`Exiting node ${current_node}`)
		this.states.same_change_node(current_node, 'color', this.VISITED_COLOR)
	}

	run() {
		this.dfs(this.start_node)
		return this.states.states.slice()
	}

	static colors() {
		return [
			{name: 'unvisited', value: this.COLOR_DEFAULT},
			{name: 'visited',   value: this.VISITED_COLOR},
			{name: 'current',   value: this.CURRENT_COLOR},
			{name: 'active',    value: this.ACTIVE_COLOR},
		]
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
				'  visited[node] = true;',
				'  for (auto t: neighbours[node]) {',
				'    if (!visited[node]) {',
				'      dfs(t);',
				'    }',
				'  }',
				'  return;',
				'}',
			],
			'Python': [
				'def dfs(node):',
				'  visited[node] = true',
				'  for t in neighbours[node]:',
				'     if is not visited[t]:',
				'       dfs(t)',
				'  return',
			]
		}
		return lines[lang]
	}
}