<template>
	<div class="container">
        <Skill></Skill>
	</div>
</template>

<script> 
	import Skill from './Skill';

	export default {
		name: "Home",
		components: {
			[Skill.name]: Skill
		}
	}
</script>

<style scoped>

</style>