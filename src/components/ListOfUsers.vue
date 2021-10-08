<template>
  <div>
    <h2>{{ listOfUsers }}</h2>
  </div>
</template>

<script>

export default {
  name: "ListOfUsers",

  props: {
    listOfUsers: Object,
  },
};
</script>

<style>
</style>