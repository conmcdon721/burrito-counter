<template>
  <div>
    <EmoteTotal :emoteCount="emoteCount" />
    <ListOfUsers :listOfUsers="listOfUsers" />
  </div>
</template>

<script>
import EmoteTotal from "./EmoteTotal.vue";
import ListOfUsers from "./ListOfUsers.vue"

export default {
  name: "Body",

  components: {
    EmoteTotal,
    ListOfUsers
  },

  props: {
    emoteCount: Number,
    ListOfUsers: Object
  },
};
</script>

<style>
</style>