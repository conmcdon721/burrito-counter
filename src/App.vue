<template>
  <div>
    <EmoteTotal :emoteTotal="emoteTotal" />
    <EmotingUsers :emotingUsers="emotingUsers" />
    <br />
    <RandomUserButton @randomUserButton="randomUserButton" />
    <ResetButton @resetTotal="resetTotal" />
  </div>
</template>

<script>
import EmoteTotal from "./components/EmoteTotal.vue"
import EmotingUsers from "./components/EmotingUsers.vue"
import RandomUserButton from "./components/RandomUserButton.vue"
import ResetButton from "./components/ResetButton.vue";

import tmi from "tmi.js";
import dotenv from "dotenv";
dotenv.config();

export default {
  name: "App",

  components: {
    EmoteTotal,
    EmotingUsers,
    RandomUserButton,
    ResetButton,
  },

  data() {
    return {
      emoteTotal: 0,
      emotingUsers: [],
      randomUser: ""
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

      client.on("message", (tags, message) => {
        if (message.toLowerCase() === "pogchamp") {
          // Totals
          this.emoteTotal += 1;

          // Per user
          const username = tags.username.toString();
          const alreadyEmoted = this.emotingUsers.find(user => user.name === username)
          if (!alreadyEmoted) {
            const newUser = {
              "name": username,
              "count": 1,
            }

            this.emotingUsers.push(newUser)
          } else {
            this.emotingUsers.find(user => user.name === username).count += 1;
          }
        }
      });
    },

    thresholdReached() {
      if (this.emoteTotal % 5 === 0 && this.emoteTotal !== 0) {
        console.log("We hit the threshold!!")
        console.log("The random user is... " + this.emotingUsers[Math.floor(Math.random() * this.emotingUsers.length)].name)
      }
    },

    randomUserButton() {
      console.log("The random user is... " + this.emotingUsers[Math.floor(Math.random() * this.emotingUsers.length)].name)
    },

    resetTotal() {
      this.emoteTotal = 0;
      this.emotingUsers = [];
    },
  },

  async created() {
    this.emoteTotal = 0;
    this.emotingUsers = [];
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
