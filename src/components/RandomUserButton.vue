<template>
  <button @click="$emit('randomUserButton')">Get New Random User</button>
</template>

<script>
export default {
  name: "RandomUserButton",
};
</script>

<style scoped>
button {
  display: block;
  margin: 0 auto;
}
</style>