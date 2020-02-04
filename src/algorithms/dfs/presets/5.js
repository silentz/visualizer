import center from '@/utils/center.js';

export default {
	title: 'Example 5',
	description: 'Star',
	default_start_node: 1,
	nodes: [
		{ id: 1, label: center("1"), x:    0, y:    0 },
		{ id: 2, label: center("2"), x:    0, y: -120 },
		{ id: 3, label: center("3"), x:  100, y:  -50 },
		{ id: 4, label: center("4"), x:  100, y:   50 },
		{ id: 5, label: center("5"), x:    0, y:  120 },
		{ id: 6, label: center("6"), x: -100, y:   50 },
		{ id: 7, label: center("7"), x: -100, y:  -50 },
	],
	edges: [
		{ id: 1, from: 1, to: 2 },
		{ id: 2, from: 1, to: 3 },
		{ id: 3, from: 1, to: 4 },
		{ id: 4, from: 1, to: 5 },
		{ id: 5, from: 1, to: 6 },
		{ id: 6, from: 1, to: 7 },
	],
}