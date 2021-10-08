<template>
  <div>
    <Header />
    <br />
    <Body :emoteCount="emoteCount" :listOfUsers="listOfUsers"/>
    <br />
    <ResetButton @resetTotal="resetTotal" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Body from "./components/Body.vue";
import ResetButton from "./components/ResetButton.vue";

import tmi from "tmi.js";
import dotenv from "dotenv";
dotenv.config();

export default {
  name: "App",

  components: {
    Header,
    Body,
    ResetButton,
  },

  data() {
    return {
      emoteCount: "",
      listOfUsers: this.getListOfUsers()
    };
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
          this.emoteCount += 1;
        }
      });
    },

    async getListOfUsers() {
      console.log("Getting list of users...")
      const response = await fetch('https://tmi.twitch.tv/group/user/flutten/chatters', {
        headers: {
          'Client-Id': 'hqka95ou763uvr0cabtm9lcnsaoxtc',
          'Authorization': 'Bearer ' + 'ruz600pwelf8xkbrnnekdb8wuzpb0a',
        },
      }).then(res => { console.log(res.json()) })/* .then(data => console.log(data.viewers)) */
      return response
    },

    thresholdReached() {
      if((this.emoteCount % 5) === 0) {
        console.log("We hit the threshold!!")
      }
    },

    resetTotal() {
      this.emoteCount = 0;
    },
  },

  async created() {
		this.emoteCount = 0;
    await this.emoteListener();
    await this.getListOfUsers();
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
