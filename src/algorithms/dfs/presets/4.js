import center from '@/utils/center.js';

export default {
	title: 'Example 4',
	description: 'Forest',
	default_start_node: 1,
	nodes: [
		{ id: 1, label: center("1"), x: -120, y: -130 },
		{ id: 2, label: center("2"), x:  -70, y:  -50 },
		{ id: 3, label: center("3"), x: -170, y:  -50 },

		{ id: 4, label: center("4"), x:   70, y:  -50 },
		{ id: 5, label: center("5"), x:  170, y:  -50 },
		{ id: 6, label: center("6"), x:  120, y:   30 },

		{ id: 7, label: center("7"), x:  -50, y:   50 },
		{ id: 8, label: center("8"), x:    0, y:  130 },
		{ id: 9, label: center("9"), x: -100, y:  130 },
	],
	edges: [
		{ id: 1, from: 1, to: 2 },
		{ id: 2, from: 2, to: 3 },
		{ id: 3, from: 3, to: 1 },

		{ id: 4, from: 4, to: 5 },
		{ id: 5, from: 5, to: 6 },
		{ id: 6, from: 6, to: 4 },

		{ id: 7, from: 7, to: 8 },
		{ id: 8, from: 8, to: 9 },
		{ id: 9, from: 9, to: 7 },
	],
}