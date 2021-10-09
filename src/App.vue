<template>
  <div>
    <EmoteTotal :emoteTotal="emoteTotal" />
    <Users :allUsers="allUsers" />
    <br />
    <ResetButton @resetTotal="resetTotal" />
  </div>
</template>

<script>
import EmoteTotal from "./components/EmoteTotal.vue"
import Users from "./components/Users.vue"
import ResetButton from "./components/ResetButton.vue";

import tmi from "tmi.js";
import dotenv from "dotenv";
dotenv.config();

export default {
  name: "App",

  components: {
    EmoteTotal,
    Users,
    ResetButton,
  },

  data() {
    return {
      emoteTotal: 0,
      allUsers: {},
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

    async getUserList() {
      const res = await fetch('https://tmi.twitch.tv/group/user/conglerbigmac/chatters', {
        method: "GET",
        header: {
          'Authorization': 'Bearer jfbm43l1kmbpfp2ac1g9hp5ha8ggkl',
          'ClientId': 'hqka95ou763uvr0cabtm9lcnsaoxtc'
        }
      }).then(data => data.json()).then(json => {return json})

      return res
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
    this.allUsers = this.getUserList();
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
