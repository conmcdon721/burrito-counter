<template>
  <div class="emoteTotal">
    <h2>Emote total:</h2>
    <h1>{{ emoteTotal }}</h1>
  </div>
</template>

<script>
export default {
  name: 'EmoteTotal',
  props: {
    emoteTotal: Number,
  },
};
</script>
