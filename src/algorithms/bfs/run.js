import StateGenerator from '@/utils/state.js';


export default class BFS {
	static VISITED_COLOR = '#ddd'
	static ACTIVE_COLOR = '#FFDEDE' //'#c4e8ff'
	static CURRENT_COLOR = '#c3ffbc'
	static COLOR_DEFAULT = '#fff'

	constructor(nodes, edges, start_node, network_defaults) {
		this.nodes = nodes.slice()
		this.edges = edges.slice()
		this.start_node = start_node
		this.color = {}
		this.queue = []
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

	bfs(current_node) {
		this.states.same_change_node(current_node, 'color.background', this.CURRENT_COLOR)
		this.states.same_set_comment(`Entering node ${current_node}`)

		this.states.change_code_line([1, 1, 1])
		this.states.same_set_comment(`Mark node ${current_node} as visited`)
		this.color[current_node] = 1

		this.states.change_code_line([2, 2, 2])
		this.states.same_set_comment(`Initialize empty queue`)
		this.queue = []

		this.states.change_code_line([3, 3, 3])
		this.states.same_set_comment(`Appending start node to queue`)
		this.queue.push(current_node)

		this.states.change_code_line([4, 4, 4])
		this.states.same_set_comment(`Iterating over queue`)

		while (this.queue.length > 0) {
			this.states.change_code_line([5, 5, 5])
			let item = this.queue.shift()
			this.states.same_set_comment(`Going to node ${item}`)
			this.states.same_change_node(item, 'color.background', this.CURRENT_COLOR)

			this.states.change_code_line([6, 6, 6])
			this.states.same_set_comment(`Pop ${item} from queue`)

			this.states.change_code_line([7, 7, 7])
			this.states.same_set_comment(`Iterating over ${item} neigbours`)
			
			this.edges.forEach((c_edge) => {
				if (c_edge.from == item || c_edge.to == item) {
					this.states.same_change_edge(c_edge.id, 'width', 3)
					let start = c_edge.from
					let finish = c_edge.to
					if (item === c_edge.to) {
						start = c_edge.to
						finish = c_edge.from
					}

					this.states.change_code_line([8, 8, 8])

					if (this.color[finish] == 0) {
						this.states.same_change_edge(c_edge.id, 'color', this.ACCEPT_EDGE)
						this.states.same_set_comment(`Node ${finish} is not visited`)

						this.color[finish] = 1
						this.states.change_code_line([9, 9, 9])
						this.states.same_change_node(finish, 'color.background', this.ACTIVE_COLOR)

						this.states.same_set_comment(`Mark node ${finish} as visited`)

						this.queue.push(finish)
						this.states.change_code_line([10, 10, 10])
						this.states.same_set_comment(`Appending node ${finish} to queue`)

						this.states.change_code_line([7, 7, 7])
						this.states.same_set_comment(`Continue iterating over neighbours`)
						this.states.same_change_node(finish, 'color.background', this.VISITED_COLOR)
						this.states.same_change_edge(c_edge.id, 'color', this.EDGE_DEFAULT)
						this.states.same_change_edge(c_edge.id, 'width', 1)
					} else {
						this.states.same_set_comment(`Node ${finish} is already visited`)
						this.states.same_change_edge(c_edge.id, 'color', this.REJECT_EDGE)
						this.states.change_code_line([7, 7, 7])
						this.states.same_set_comment(`Continue iterating`)
						this.states.same_change_edge(c_edge.id, 'color', this.EDGE_DEFAULT)
						this.states.same_change_edge(c_edge.id, 'width', 1)
					}
				}
			})

			this.states.change_code_line([4, 4, 4])
			this.states.same_set_comment(`There are no unvisited neighbours`)
			this.states.same_change_node(item, 'color.background', this.VISITED_COLOR)
		}

		this.states.change_code_line([11, 14, 11])
		this.states.same_set_comment(`Exiting start node`)
		this.states.same_change_node(current_node, 'color', this.VISITED_COLOR)
	}

	run() {
		this.bfs(this.start_node)
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
				'bfs(node):',
				'  mark node as visited',
				'  queue = {}',
				'  add node to end of queue',
				'  while queue is not empty:',
				'    item = front element of queue',
				'    pop front element of queue',
				'    for x in "item neighbours":',
				'      if x is not visited:',
				'        mark x as visited',
				'        add x to end of queue',
				'  exit node',
			],
			'C++': [
				'void bfs(const int node) {',
				'  visited[node] = true;',
				'  std::queue<int> queue;',
				'  queue.push(node);',
				'  while (!queue.empty()) {',
				'    int x = queue.front()',
				'    queue.pop();',
				'    for (const auto x: neigbours[x]) {',
				'      if (!visited[x]) {',
				'        visited[x] = true;',
				'        queue.push(x);',
				'      }',
				'    }',
				'  }',
				'  return;',
				'}',
			],
			'Python': [
				'def bfs(node):',
				'  visited[node] = True',
				'  queue = collections.deque()',
				'  queue.append(node)',
				'  while queue:',
				'    item = queue[0]',
				'    queue.pop()',
				'    for x in neighbours[item]:',
				'      if not visited[x]:',
				'        visited[x] = True',
				'        queue.append(x)',
				'  return',
			]
		}
		return lines[lang]
	}
}