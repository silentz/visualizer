<template>
	<div class='mainview'>
		<modal name='create-modal' @opened='before_open' :height="500">
			<div class='modal-wrapper'>
				<p class='modal-label'>Title<br><input type='text' class='modal-input' v-model='title'></p>
				<p class='modal-label'>Description<br><input type='text' class='modal-input' v-model='description'></p>
				<p class='modal-label'>View</p>
				<div class='horizontal'>
					<div id='add-network' class='panel'></div>
					<div class='buttons'>
						<div class='upper'>
							<div :class='{"button": true, "radio-chosen": (mode_chosen == 1)}'
									@click="choose_mode(1)">add node</div>
							<div :class='{"button": true, "radio-chosen": (mode_chosen == 2)}'
									@click="choose_mode(2)">add edge</div>
							<div :class='{"button": true, "radio-chosen": (mode_chosen == 3)}'
									@click="choose_mode(3)">select</div>
						</div>
						<div class='lower'>
							<div class='button delete' @click="delete_selected()" v-show="(mode_chosen == 3)">delete</div>
						</div>
					</div>
				</div>
				<div class='final-buttons'>
					<div class='button cancel' @click='$modal.hide("create-modal")'>Cancel</div>
					<div class='button confirm' @click='create_example()'>Confirm</div>
				</div>
			</div>
		</modal>
		<div class='paneltable'>
			<div class='panel options'>
				<div class='wrapper'>
					<h2>Options</h2>
					<div class='option-cards'>
						<div v-for='(preset, index) in presets_active' :class='{"card": true, "card-active": (index == current_preset)}'
								@click="set_preset(index, true)">
							<div class='card-header'>{{ preset.title }}</div>
							<div class='card-context'>{{ preset.description }}</div>
						</div>
					</div>
				</div>
				<div class='add'>
					<div class='button' @click='$modal.show("create-modal")'>create</div>
				</div>
			</div>
			<div class='panel viewer'>
				<h2>View</h2>
				<div id='view-container'/>
			</div>
			<div class='panel code'>
				<div class='wrapper'>
					<h2>Code</h2>
					<div class='code-lines'>
						<template v-for='(line, index) in algorithm.get_language_lines(language_chosen)'>
							<div :class='{"cursor-span": true, "chosen-cursor": index == current_code_line}'>
								<template v-if='index == current_code_line'>&rarr;</template>
							</div>
							<div :class='{"code-line": true, "chosen-line": index == current_code_line}'>{{ line }}</div>
						</template>
					</div>
				</div>
				<div class='code-annotations'>
					<div class='annotation' v-for='comment in comments'>
						{{ comment }}
					</div>
				</div>
			</div>
			<div class='panel controls'>
				<h2>Controls</h2>
				<div class='horizontal-control-group'>

					<div class='speed'>
						slow
						<input type='range' min='0' max='100' class='slider slider-slim' v-model="current_speed">
						fast
					</div>
					
					<div class='buttons'>
						<div class='button' @click='set_initial_state()'>&#10216;&#10216;</div>
						<div class='button' @click='set_prev_state()'>&#10216;</div>
						<div :class='{"button": true, "play": !visualization_active}'
							@click="start_visualization()">
							<template v-if="visualization_active">||</template>
							<template v-else>&#9655;</template>
						</div>
						<div class='button' @click='set_next_state()'>&#10217;</div>
						<div class='button' @click='set_last_state()'>&#10217;&#10217;</div>
						<input type='range' min='0' :max='states.length - 1' class='slider slider-wide'
							@change='user_state_change()' v-model='current_state'>
					</div>
				
					<div class='languages'>
						<div v-for='(language, index) in algorithm.languages()'
							:class='{"button": true, "radio": true, "radio-chosen": (index == language_chosen)}'
							@click="choose_language(index)">
							{{ language }}
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {DataSet, Network} from "vis-network/standalone/esm/vis-network";
import center from '@/utils/center';

export default {
	name: 'MainView',
	props: ['presets', 'algorithm'],
	data: () => {
		return {
			// ===== [Language values] =====
			language_chosen: 0,
			current_speed: 20, // value in range [0, 100]
			presets_active: [],
			
			// ===== [Input] =====
			mode_chosen: 1,
			node_counter: 1,
			title: '',
			description: '',
			add_nodes: undefined,
			add_edges: undefined,

			// ===== [State variables] =====
			visualization_active: false,
			current_preset: 0,
			current_state: 0,
			current_code_line: 0,
			start_node: 1,
			states: [],
			comments: [],

			// ===== [Visual objects] =====
			nodes: undefined,
			edges: undefined,

			// ===== [Network conf] =====
			network_options: {
				interaction: {
					dragView: false,
					dragNodes: false,
					zoomView: false
				},
				nodes: {
					color: {
						border: "#666",
						background: "#fff",
						highlight: {
							border: "#666",
							background: "#ccc",
						}
					},
					font: {
						color: "#666",
						size: 20,
						face: "sans-serif",
						align: 'center'
					},
					shape: 'circle',
					chosen: false,
					physics: false,
					fixed: true,
				},
				edges: {
					color: {
						color: '#666'
					},
					width: 1,
					chosen: false
				}
			},
			add_network_options: {
				interaction: {
					dragView: false,
					dragNodes: true,
					zoomView: false
				},
				nodes: {
					color: {
						border: "#666",
						background: "#fff",
						highlight: {
							border: "#666",
							background: "#ccc",
						}
					},
					font: {
						color: "#666",
						size: 16,
						face: "sans-serif",
						align: 'center'
					},
					shape: 'circle',
					chosen: true,
					physics: false,
					fixed: false,
				},
				edges: {
					color: {
						color: '#666'
					},
					width: 1,
					chosen: true
				},
				manipulation: {
					initiallyActive: false,
					enabled: false,
				}
			}
		}
	},
	mounted: function() {
		this.nodes = new DataSet([])
		this.edges = new DataSet([])
		this.presets_active = this.presets
		this.network = new Network(document.getElementById("view-container"),
			{ nodes: this.nodes, edges: this.edges}, this.network_options)
		this.network.on('click', (data) => {
			if (data.nodes.length == 1 && !this.visualization_active) {
				let chosen_node = data.nodes[0]
				this.start_node = chosen_node
				this.set_preset(this.current_preset, false)
			}
		})
		this.set_preset(0, true)
	},
	methods: {
		create_example() {
			let result = {
				title: this.title,
				description: this.description,
				default_start_node: 1,
				nodes: this.add_nodes.get(this.add_nodes.getIds()),
				edges: this.add_edges.get(this.add_edges.getIds()),
			}
			if (result.title.length === 0) {
				result.title = 'New example'
			}
			if (result.description.length === 0) {
				result.description = "No description"
			}
			this.presets_active.push(result)
			this.$modal.hide('create-modal')
		},
		add_node(node, callback) {
			node.id = this.node_counter
			node.label = center(this.node_counter.toString())
			this.node_counter++
			callback(node)
		},
		before_open() {
			this.title = ''
			this.description = ''
			this.mode_chosen = 1
			this.node_counter = 1
			this.add_nodes = new DataSet([])
			this.add_edges = new DataSet([])
			if (this.add_network_options.manipulation.addNode === undefined) {
				this.add_network_options.manipulation.addNode = this.add_node
			}
			this.add_network = new Network(
				document.getElementById("add-network"), {
					nodes: this.add_nodes,
					edges: this.add_edges,
				},
				this.add_network_options
			)
			this.add_network.addNodeMode()
			this.add_network.on('release', this.change_mode)
		},
		change_mode() {
			this.add_network.disableEditMode()
			switch(this.mode_chosen) {
				case 1:
					this.add_network.unselectAll()
					this.add_network.addNodeMode()
					break
				case 2:
					this.add_network.unselectAll()
					this.add_network.addEdgeMode()
					break
				case 3:
					break
			}
		},
		choose_mode(index) {
			this.mode_chosen = index
			this.change_mode()
		},
		delete_selected() {
			this.add_network.deleteSelected()
		},
		set_preset(preset_index, default_node) {
			this.current_preset = preset_index
			if (default_node) {
				this.start_node = this.presets_active[preset_index].default_start_node
			}
			this.nodes.clear()
			this.edges.clear()
			this.nodes.add(this.presets_active[preset_index].nodes)
			this.edges.add(this.presets_active[preset_index].edges)
			this.states = new this.algorithm(
				this.presets_active[preset_index].nodes,
				this.presets_active[preset_index].edges,
				this.start_node,
				this.network_options).run()
			this.current_state = 0
			this.set_state(0)
		},
		set_state(state_index) {
			let state = this.states[state_index]
			for (let property in state.nodes) {
				if (Object.prototype.hasOwnProperty.call(state.nodes, property)) {
					this.nodes.update(state.nodes[property])
				}
			}
			for (let property in state.edges) {
				if (Object.prototype.hasOwnProperty.call(state.edges, property)) {
					this.edges.update(state.edges[property])
				}
			}
			this.current_code_line = state.lines[this.language_chosen]
			this.comments = state.comments.slice(Math.max(state.comments.length - 5, 0)).reverse()
		},
		user_state_change() {
			this.set_state(this.current_state)
		},
		set_initial_state() {
			this.current_state = 0
			this.set_state(0)
		},
		set_last_state() {
			this.current_state = this.states.length - 1
			this.set_state(this.current_state)
		},
		set_next_state() {
			if (parseInt(this.current_state) + 1 < this.states.length) {
				this.current_state++
				this.set_state(this.current_state)
			}
		},
		set_prev_state() {
			if (parseInt(this.current_state) > 0) {
				this.current_state--
				this.set_state(this.current_state)
			}
		},
		start_visualization() {
			if (this.visualization_active === true) {
				this.visualization_active = false
			} else {
				this.visualization_active = true
				this.run_step()
			}
		},
		run_step() {
			if (this.visualization_active) {
				this.set_next_state()
				if (parseInt(this.current_state) + 1 < this.states.length) {
					setTimeout(this.run_step, 21000 / (parseInt(this.current_speed) + 6))
				} else {
					this.visualization_active = false
				}
			}
		},
		choose_language(index) {
			this.language_chosen = index
			this.set_state(this.current_state)
		}
	}
}
</script>

<style lang='scss'>
@import "@/assets/fonts.scss";
@import "@/assets/styles.scss";

$main-background-color: #fff;
$light-shadow: rgba(255, 255, 255, 0.5);
$dark-shadow: rgba(0, 0, 0, 0.3);
$shadow-x: 5px;
$shadow-y: 3px;
$shadow-blur: 5px;
$lgreen: rgba(195, 255, 188, 0.6);

.mainview {
	height: 100%;
	background-color: $main-background-color;
	font-family: 'Barlow', sans-serif;
	color: #aaa;

	.modal-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
		height: 100%;
		box-sizing: border-box;

		.horizontal {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			width: 100%;
			height: 100%;
			padding: 10px;
			box-sizing: border-box;
			padding: 10px;
		}

		.modal-label {
			margin: 0;
			padding-left: 14px;
			padding-top: 10px;
		}

		.modal-input {
			outline: none;
			border: none;
			background-color: rgba(0, 0, 0, 0.05);
			font-size: 1rem;
			padding: 5px;
			border-radius: 5px;
			color: #888;
		}

		.final-buttons {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			width: 100%;
			min-height: 40px;
			box-sizing: border-box;
			padding: 0 10px;
			margin-bottom: 10px;

			.button {
				width: 100px;
			}

			.confirm {
				background-color: rgba(0, 255, 0, 0.05);
			}

			.cancel {
				background-color: rgba(255, 0, 0, 0.05);
			}
		}

		#add-network {
			display: block;
			flex-grow: 1;
			height: 100%;
			width: 100%;
			margin: 5px;
			background-color: #fff;
			box-sizing: border-box;
			overflow: hidden;
		}

		.buttons {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			height: 100%;

			.upper {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: center;
			}

			.lower {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: center;
			}

			.delete {
				margin: 0 !important;
			}

			.radio-chosen {
				box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.3) !important;
				padding-top: 4px !important;
				padding-bottom: 0px !important;
			}

			.button {
				width: 100px;
				margin-bottom: 10px;
			}
		}
	}

	.paneltable {
		height: 100%;
		padding: 20px;
		box-sizing: border-box;

		display: grid;
		grid-template-columns: 1fr 3fr 2fr;
		grid-template-rows: 6fr 1fr;
		grid-template-areas:
			"options  viewer   code"
			"controls controls controls";
	}

	.controls {
		grid-area: controls;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;

		.horizontal-control-group {
			display: flex;
			flex-direction: row;
			padding: 0 30px;
			flex-grow: 1;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			box-sizing: border-box;
		}

		.vertical-control-group {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
		}

		.slider {
			-webkit-appearance: none;
			appearance: none;
			background-color: #eee;
			border-radius: 5px;
			height: 6px;
			margin: 0 5px;
			margin-top: 1px;
		}

		.slider-wide {
			width: 400px;
		}

		.slider-slim {
			width: 150px;
		}

		.slider::-webkit-slider-thumb {
			-webkit-appearance: none;
			appearance: none;
			width: 12px;
			height: 12px;
			border-radius: 50%; 
			background: #fff;
			border: 1px solid #ccc;
		}

		.slider::-moz-range-thumb {
			width: 12px;
			height: 12px;
			border-radius: 50%;
			background: #fff;
			border: 1px solid #aaa;
		}

		.buttons {
			display: flex;
			flex-direction: row;
			align-items: center;
			box-sizing: border-box;

			.play {
				padding-top: 6px !important;

				&:active {
					padding-top: 7px !important;
				}
			}
		}

		.speed {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}
	}

	.options {
		grid-area: options;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;

		.wrapper {
			width: 100%;
		}

		.add {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			.button {
				width: 100px;
			}
		}

		.option-cards {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			padding-top: 10px;
			width: 100%;

			.card {
				padding: 5px;
				margin: 0;
				-webkit-user-select: none;
				user-select: none;
				cursor: pointer;
				width: 100%;
				border-radius: 5px;
				width: 90%;
				margin: 5px 0;

				.card-header {
					margin-bottom: 2px;
				}

				.card-context {
					font-size: 0.9rem;
				}

				&:hover {
					background-color: #eee;
				}
			}

			.card-active {
				background-color: #fff;
				box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

				&:hover {
					background-color: #fff;
				}
			}
		}
	}

	.code {
		grid-area: code;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		
		$cursor-width: 30px;
		$cursor-height: 20px;

		.code-lines {
			display: grid;
			grid-template-columns: $cursor-width auto;
			padding-top: 10px;

			.code-line {
				white-space: pre;
				font-family: 'Source Code Pro', monospace;
				height: $cursor-height;
				font-size: 0.95rem;
			}

			.cursor-span {
				width: $cursor-width;
				height: $cursor-height;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.chosen-cursor {
				background-color: $lgreen;
				border-radius: 5px 0 0 5px;
			}

			.chosen-line {
				background-color: $lgreen;
				border-radius: 0 5px 5px 0;
			}
		}

		.code-annotations {
			display: flex;
			flex-direction: column-reverse;
			justify-content: flex-start;
			align-items: flex-start;
			padding-bottom: 10px;
			padding-left: 10px;

			.annotation {
				margin-top: 10px;

				&:nth-child(1) {
					font-size: 1.6rem;
					opacity: 1;
				}

				&:nth-child(2) {
					font-size: 1rem;
					opacity: 1;
				}

				&:nth-child(3) {
					font-size: 1rem;
					opacity: 0.7;
				}

				&:nth-child(4) {
					font-size: 1rem;
					opacity: 0.5;
				}

				&:nth-child(5) {
					font-size: 1rem;
					opacity: 0.3;
				}
			}
		}
	}

	.viewer {
		grid-area: viewer;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;

		#view-container {
			display: block;
			background-color: #fff;
			flex-grow: 1;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			overflow: hidden;
		}
	}

	.languages {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;

		.radio {
			width: 80px;
			margin: 10px;
			border-radius: 5px;
			border-left: none;
			border-right: none;
		}

		.radio-chosen {
			box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.3) !important;
			padding-top: 4px !important;
			padding-bottom: 0px !important;
		}

		.languages_chosen {
			color: red;
		}
	}

	.panel {
		border: 1px solid #eee;
		margin: 10px;
		padding: 10px;
		border-radius: 10px;
		box-shadow: $shadow-x $shadow-y $shadow-blur $dark-shadow;
		background-color: $main-background-color;

		h2 {
			font-size: 1em;
			font-weight: normal;
			padding: 0;
			margin: 0;
			-webkit-user-select: none;
			user-select: none;
			cursor: default;
		}
	}
}
</style>