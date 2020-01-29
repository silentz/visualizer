<template>
	<div class='mainview'>
		<div class='paneltable'>
			<div class='panel options'>
				<h2>Options</h2>
				<div class='option-cards'>
					<div v-for='(preset, index) in presets' :class='{"card": true, "card-active": (index == current_preset)}'
							@click="set_preset(index)">
						<div class='card-header'>{{ preset.title }}</div>
						<div class='card-context'>{{ preset.description }}</div>
					</div>
				</div>
			</div>
			<div class='panel viewer'>
				<h2>View</h2>
				<div id='view-container'/>
			</div>
			<div class='panel code'>
				<h2>Code</h2>
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
						<div v-for='(language, index) in languages_values'
							:class='{"button": true, "radio": true, "radio-chosen": (index == languages_chosen)}'
							@click="languages_chosen = index">
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

export default {
	name: 'MainView',
	props: ['presets', 'algorithm'],
	data: () => {
		return {
			languages_values: ['C++', 'Python', 'Pseudo'],
			languages_chosen: 0,
			current_speed: 20, // value in range [0, 100]
			visualization_active: false,

			// ===== [State variables] =====
			current_preset: 0,
			current_state: 0,
			states: [],

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
					shape: 'circle'
				},
				edges: {
					color: {
						color: '#666'
					},
					width: 1
				}
			},
		}
	},
	mounted: function() {
		this.nodes = new DataSet([])
		this.edges = new DataSet([])
		this.network = new Network(document.getElementById("view-container"),
			{ nodes: this.nodes, edges: this.edges}, this.network_options)
		this.set_preset(0)
	},
	methods: {
		set_preset(preset_index) {
			this.current_preset = preset_index
			this.nodes.clear()
			this.edges.clear()
			this.nodes.add(this.presets[preset_index].nodes)
			this.edges.add(this.presets[preset_index].edges)
			this.states = new this.algorithm(
				this.presets[preset_index].nodes,
				this.presets[preset_index].edges, 1, this.network_options).run()
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
		}
	}
}
</script>

<style lang='scss'>
@import url('https://fonts.googleapis.com/css?family=Barlow&display=swap');

.mainview {
	height: 100%;

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

		.button {
			display: flex;
			justify-content: center;
			align-items: center;
			border: 1px solid #eee;
			border-radius: 5px;
			box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
			margin: 0 5px;
			width: 30px;
			height: 30px;
			padding: 2px;
			user-select: none;
			-webkit-user-select: none;
			font-weight: bold;
			box-sizing: border-box;
			cursor: default;

			&:active {
				box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.3);
				padding-top: 4px;
				padding-bottom: 0px;
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

		.option-cards {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			padding-top: 10px;

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
		border: 1px solid #fff;
		margin: 10px;
		padding: 10px;
		border-radius: 10px;
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
		background-color: white;

		font-family: 'Barlow', sans-serif;
		color: #aaa;

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