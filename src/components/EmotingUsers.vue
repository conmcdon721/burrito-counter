<template>
	<div>
		<div v-for="user in emotingsUsers" :key="user.name">
			<h2>{{ user.name }} {{ user.count }}</h2>
		</div>
	</div>
</template>

<script>
	export default {
		name: "EmotingUsers",

		props: {
			emotingUsers: Array,
		}
	}
</script>

<style scope>

</style>