<template>
  <div class="randomUserButton">
    <button @click="getRandomUser">Get random user</button>
  </div>
</template>

<script>
export default {
  name: 'GetRandomUser',
  methods: {
    getRandomUser() {
      this.$emit('choosing-random-user');
    },
  },
};
</script>

<style></style>
