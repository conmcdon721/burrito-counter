<template>
  <div>
    <EmoteTotal :emoteTotal="emoteTotal" />
    <br />
    <ResetButton @resetTotal="resetTotal" />
  </div>
</template>

<script>
import EmoteTotal from "./components/EmoteTotal.vue"
import ResetButton from "./components/ResetButton.vue";

import tmi from "tmi.js";
import dotenv from "dotenv";
dotenv.config();

export default {
  name: "App",

  components: {
    EmoteTotal,
    ResetButton,
  },

  data() {
    return {
      emoteTotal: 0,
    }
  },

  methods: {
    async emoteListener() {
      const client = new tmi.Client({
        options: { debug: true },
        identity: {
          username: "burritocounter",
          password: "ruz600pwelf8xkbrnnekdb8wuzpb0a",
          // Don't forget to remove later
        },
        channels: ["#conglerbigmac"],
      });

      client.connect();

      client.on("message", (channel, tags, message) => {
        if (message.toLowerCase() === "hackermans") {
          this.emoteTotal += 1;
        }
      });
    },

    thresholdReached() {
      if((this.emoteTotal % 5) === 0) {
        console.log("We hit the threshold!!")
      }
    },

    resetTotal() {
      this.emoteTotal = 0;
    },
  },

  async created() {
    this.emoteTotal = 0;
    await this.emoteListener();
  },

  updated() {
    this.thresholdReached();
  }
};
</script>

<style>
* {
  text-align: center;
}
</style>
