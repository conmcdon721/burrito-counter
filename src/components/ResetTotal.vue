<template>
  <div class="resetButton">
    <button @click="resetTotal">Reset total emote count</button>
  </div>
</template>

<script>
export default {
  name: 'ResetTotal',
  methods: {
    resetTotal() {
      this.$emit('resetting-total');
    },
  },
};
</script>

<style></style>
