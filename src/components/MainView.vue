<template>
	<div class='mainview'>
		<div class='paneltable'>
			<div class='panel options'>
				<h2>Options</h2>
			</div>
			<div class='panel viewer'>
				<h2>View</h2>
			</div>
			<div class='panel code'>
				<h2>Code</h2>
			</div>
			<div class='panel controls'>
				<h2>Controls</h2>
				<div class='horizontal-control-group'>

					<div class='spped'>
						slow
						<input type='range' min='0' max='100' class='slider slider-slim'>
						fast
					</div>
					
					<div class='buttons'>
						<div class='button'>&#10216;&#10216;</div>
						<div class='button'>&#10216;</div>
						<div class='button play'>&#9655;</div>
						<div class='button'>&#10217;</div>
						<div class='button'>&#10217;&#10217;</div>
						<input type='range' min='0' max='100' class='slider slider-wide'>
					</div>
				
					<div class='languages'>
						<div v-for='(language, index) in languages_values'
							:class='{"button": true, "radio": true, "radio-chosen": (index == languages_chosen),
								"radio-left": (index == 0), "radio-right": (index + 1 == languages_values.length)}'
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
export default {
	name: 'MainView',
	data: () => {
		return {
			languages_values: ['C++', 'Python', 'Pseudo'],
			languages_chosen: 0
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
	}

	.code {
		grid-area: code;
	}

	.viewer {
		grid-area: viewer;
	}

	.languages {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;

		.radio {
			width: 80px;
			// margin-left: 10px;
			margin: 10px;
			border-radius: 0;
			border-left: none;
			border-right: none;
		}

		.radio-chosen {
			box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.3) !important;
			padding-top: 4px !important;
			padding-bottom: 0px !important;
		}

		.radio-left {
			border-radius: 10px 0 0 10px !important;
		}

		.radio-right {
			border-radius: 0 10px 10px 0 !important;
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
		}
	}
}
</style>