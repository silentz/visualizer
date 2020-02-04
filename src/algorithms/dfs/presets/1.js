import center from '@/utils/center.js';

export default {
	title: 'Example 1',
	description: 'Simple tree example',
	default_start_node: 1,
	nodes: [
		{ id: 1, label: center("1") },
		{ id: 2, label: center("2") },
		{ id: 3, label: center("3") },
		{ id: 4, label: center("4") },
		{ id: 5, label: center("5") },
	],
	edges: [
		{ id: 1, from: 1, to: 2 },
		{ id: 2, from: 2, to: 3 },
		{ id: 3, from: 3, to: 4 },
		{ id: 4, from: 4, to: 5 }
	],
}