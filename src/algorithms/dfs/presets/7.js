import center from '@/utils/center.js';

export default {
	title: 'Example 7',
	description: 'Flower',
	default_start_node: 1,
	nodes: [
		{ id: 1, label: center("1"), x:    0, y:  -30 },
		{ id: 2, label: center("2"), x:    0, y:  -90 },
		{ id: 3, label: center("3"), x:   60, y:  -60 },
		{ id: 4, label: center("4"), x:   60, y:    0 },
		{ id: 5, label: center("5"), x:    0, y:   30 },
		{ id: 6, label: center("6"), x:  -60, y:  -60 },
		{ id: 7, label: center("7"), x:  -60, y:    0 },

		{ id: 8,  label: center("8"),  x:    0, y:  100 },
		{ id: 9,  label: center("9"),  x:   60, y:  100 },
		{ id: 10, label: center("10"), x:   60, y:  160 },
		{ id: 11, label: center("11"), x:    0, y:  160 },
		{ id: 12, label: center("12"), x:  -60, y:  160 },
		{ id: 13, label: center("13"), x:  -60, y:  100 },
	],
	edges: [
		{ id: 1, from: 1, to: 2 },
		{ id: 2, from: 1, to: 3 },
		{ id: 3, from: 1, to: 4 },
		{ id: 4, from: 1, to: 5 },
		{ id: 5, from: 1, to: 6 },
		{ id: 6, from: 1, to: 7 },

		{ id: 7,  from: 5,  to: 8 },
		{ id: 8,  from: 8,  to: 9 },
		{ id: 9,  from: 9,  to: 10 },
		{ id: 10, from: 10, to: 11 },
		{ id: 11, from: 11, to: 12 },
		{ id: 12, from: 12, to: 13 },
		{ id: 13, from: 13, to: 8 },
	],
}