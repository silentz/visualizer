import center from '@/utils/center.js';

export default {
	title: 'Example 1',
	description: 'Bamboo tree',
	default_start_node: 1,
	nodes: [
		{ id: 1, label: center("1"), x: -140, y: -80 },
		{ id: 2, label: center("2"), x:  -70, y: -40 },
		{ id: 3, label: center("3"), x:    0, y:   0 },
		{ id: 4, label: center("4"), x:   70, y:  40 },
		{ id: 5, label: center("5"), x:  140, y:  80 },
	],
	edges: [
		{ id: 1, from: 1, to: 2 },
		{ id: 2, from: 2, to: 3 },
		{ id: 3, from: 3, to: 4 },
		{ id: 4, from: 4, to: 5 }
	],
}