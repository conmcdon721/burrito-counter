<template>
  <button @click="$emit('resetTotal')">Quick Reset</button>
</template>

<script>
export default {
  name: "ResetButton",
};
</script>

<style scoped>
button {
  display: block;
  margin: 0 auto;
}
</style>
