<template>
	<div>
		<div class="container">
			<Skill></Skill>
			<CarouselEle></CarouselEle>
		</div>
		<!-- <Canvas></Canvas> -->
	</div>
	
</template>

<script> 
	import Skill from '../widget/Skill';
	import CarouselEle from '../widget/CarouselEle';
	import Canvas from '../widget/Canvas';
	export default {
		name: "Home",
		methods:{
		},
		mounted(){
		},
		components: {
			Skill,
			CarouselEle,
			Canvas
		}
	}
</script>

<style scoped>

</style>