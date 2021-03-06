import center from '@/utils/center.js';

export default {
	title: 'Example 6',
	description: 'Grid',
	default_start_node: 1,
	nodes: [
		{ id: 1, label: center("1"), x: -200, y: -100 },
		{ id: 2, label: center("2"), x: -100, y: -100 },
		{ id: 3, label: center("3"), x:    0, y: -100 },
		{ id: 4, label: center("4"), x:  100, y: -100 },
		{ id: 5, label: center("5"), x:  200, y: -100 },
		{ id: 6, label: center("6"), x: -200, y:    0 },
		{ id: 7, label: center("7"), x: -100, y:    0 },
		{ id: 8, label: center("8"), x:    0, y:    0 },
		{ id: 9, label: center("9"), x:  100, y:    0 },
		{ id: 10, label: center("10"), x:  200, y:   0 },
		{ id: 11, label: center("11"), x: -200, y: 100 },
		{ id: 12, label: center("12"), x: -100, y: 100 },
		{ id: 13, label: center("13"), x:    0, y: 100 },
		{ id: 14, label: center("14"), x:  100, y: 100 },
		{ id: 15, label: center("15"), x:  200, y: 100 },
	],
	edges: [
		{ id: 1, from: 1, to: 2 },
		{ id: 2, from: 1, to: 6 },
		{ id: 3, from: 2, to: 3 },
		{ id: 4, from: 2, to: 7 },
		{ id: 5, from: 3, to: 4 },
		{ id: 6, from: 3, to: 8 },
		{ id: 7, from: 4, to: 5 },
		{ id: 8, from: 4, to: 9 },
		{ id: 9, from: 5, to: 10 },
		{ id: 10, from: 6, to: 7 },
		{ id: 11, from: 6, to: 11 },
		{ id: 12, from: 7, to: 8 },
		{ id: 13, from: 7, to: 12 },
		{ id: 14, from: 8, to: 9 },
		{ id: 15, from: 8, to: 13 },
		{ id: 16, from: 9, to: 10 },
		{ id: 17, from: 9, to: 14 },
		{ id: 18, from: 10, to: 15 },
		{ id: 19, from: 11, to: 12 },
		{ id: 20, from: 12, to: 13 },
		{ id: 21, from: 13, to: 14 },
		{ id: 22, from: 14, to: 15 },
	],
}