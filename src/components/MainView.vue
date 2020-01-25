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
				<div class='control-group'>
					<div class='buttons'>
						<div class='button'>&#10216;&#10216;</div>
						<div class='button'>&#10216;</div>
						<div class='button play'>&#9655;</div>
						<div class='button'>&#10217;</div>
						<div class='button'>&#10217;&#10217;</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MainView'
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
		grid-template-rows: 4fr 1fr;
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

		.control-group {
			display: flex;
			width: 100%;
			justify-content: space-around;
			align-items: center;
			flex-grow: 1;
		}

		.buttons {
			display: flex;
			flex-direction: row;

			.button {
				display: flex;
				justify-content: center;
				align-items: center;
				border: 1px solid #eee;
				border-radius: 5px;
				box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
				margin: 0 10px;
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

			.play {
				padding-top: 4px !important;

				&:active {
					padding-top: 6px !important;
				}
			}
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