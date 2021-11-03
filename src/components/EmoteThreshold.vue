<template>
  <div class="emoteThreshold">
    <h4>{{ emoteThreshold }} emotes required for reward.</h4>
    <form @submit="submitThreshold">
      <label>New emote threshold: </label>
      <input
        type="number"
        v-model="newThreshold"
        name="newThreshold"
        placeholder="Number"
      />
      <input type="submit" />
    </form>
  </div>
</template>

<script>
export default {
  name: "EmoteThreshold",
  data() {
    return {
      newThreshold: Number,
    };
  },
  props: {
    emoteThreshold: Number,
  },
  methods: {
    submitThreshold(e) {
      e.preventDefault();

      if (!this.newThreshold) {
        alert("Please enter a new number.");
        return;
      }

      const newThreshold = Number(this.newThreshold);

      this.$emit("update-threshold", newThreshold);

      this.newThreshold = "";
    },
  },
};
</script>