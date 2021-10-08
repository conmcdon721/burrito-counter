<template>
  <h1>{{ emoteTotal }}</h1>
</template>

<script>
export default {
  name: "EmoteTotal",

  props: {
    emoteTotal: Number,
  },
};
</script>