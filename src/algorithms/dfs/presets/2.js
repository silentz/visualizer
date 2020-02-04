import center from '@/utils/center.js';

export default {
	title: 'Example 2',
	description: 'Binary tree',
	default_start_node: 1,
	nodes: [
		{ id: 1, label: center("1") },
		{ id: 2, label: center("2") },
		{ id: 3, label: center("3") },
		{ id: 4, label: center("4") },
		{ id: 5, label: center("5") },
		{ id: 6, label: center("6") },
		{ id: 7, label: center("7") },
	],
	edges: [
		{ id: 1, from: 4, to: 3 },
		{ id: 2, from: 4, to: 5 },
		{ id: 3, from: 3, to: 1 },
		{ id: 4, from: 3, to: 2 },
		{ id: 5, from: 5, to: 6 },
		{ id: 6, from: 5, to: 7 },
	],
}