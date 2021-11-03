<template>
  <div class="emotingUsers">
    <h2>Emoting users:</h2>
    <div class="userRow" :key="user.displayName" v-for="user in emotingUsers">
      <h3>
        {{ user.displayName }}
      </h3>
      <h3>
        {{ user.userEmoteCount }}
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmotingUsers',
  props: {
    emotingUsers: Array,
  },
};
</script>
