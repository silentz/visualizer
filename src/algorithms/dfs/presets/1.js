import {DataSet} from "vis-network/standalone/esm/vis-network";
import center from '@/utils/center.js';

export default {
	title: 'Example 1',
	description: 'Simple tree example',
	nodes: new DataSet([
		{ id: 1, label: center("1") },
		{ id: 2, label: center("2") },
		{ id: 3, label: center("3") },
		{ id: 4, label: center("4") },
		{ id: 5, label: center("5") },
	]),
	edges: new DataSet([
		{ from: 1, to: 2 },
		{ from: 2, to: 3 },
		{ from: 3, to: 4 },
		{ from: 4, to: 5 }
	]),
}