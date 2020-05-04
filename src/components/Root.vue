<template>
	<div class="root">
		<div class='centered'>
			<h1>Visualizer</h1>
			<div class='buttons'>
				<div class='button somemargin' @click='$router.push({"name": "dfs"})'>dfs</div>
				<div class='button somemargin' @click='$router.push({"name": "bfs"})'>bfs</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'RootComponent'
}
</script>

<style lang='scss'>
@import "@/assets/fonts.scss";
@import "@/assets/styles.scss";

.root {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	font-family: 'Barlow', sans-serif;
	color: #aaa;

	.centered {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;

		h1 {
			margin: 0;
			font-size: 3rem;
		}

		.somemargin {
			margin: 0 15px;
		}

		.buttons {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			padding-top: 30px;

			.button {
				width: 100px;
			}
		}
	}
}
</style>