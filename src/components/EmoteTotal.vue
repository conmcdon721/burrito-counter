<template>
  <h2>{{ emoteCount }}</h2>
</template>

<script>
export default {
  name: "EmoteTotal",

  props: {
    emoteCount: Number,
  },
};
</script>