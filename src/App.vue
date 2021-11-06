<template>
  <div class="container">
    <EmoteThreshold
      @update-threshold="updateThreshold"
      :emoteThreshold="emoteThreshold"
    />
    <EmoteTotal :emoteTotal="emoteTotal" />
    <!-- <h1>{{ usersInChat }}</h1> -->
    <EmotingUsers :emotingUsers="emotingUsers" />
    <div class="buttonContainer">
      <ResetTotal @resetting-total="resetTotal" />
      <GetRandomUser @choosing-random-user="getRandomUser" />
    </div>
  </div>
</template>

<script>
import EmoteThreshold from "./components/EmoteThreshold.vue";
import EmoteTotal from "./components/EmoteTotal.vue";
import EmotingUsers from "./components/EmotingUsers.vue";
import ResetTotal from "./components/ResetTotal.vue";
import GetRandomUser from "./components/GetRandomUser.vue";

import tmi from "tmi.js";
import dotenv from "dotenv";
dotenv.config();

class newEmotingUser {
  constructor(displayName, userEmoteCount) {
    this.displayName = displayName;
    this.userEmoteCount = userEmoteCount;
  }
}

class potentialSpammer {
  constructor(displayName, spamCount) {
    this.displayName = displayName;
    this.spamCount = spamCount;
  }
}

export default {
  name: "App",

  components: {
    EmoteThreshold,
    EmoteTotal,
    EmotingUsers,
    ResetTotal,
    GetRandomUser,
  },

  data() {
    return {
      emoteThreshold: 10,
      emoteTotal: 0,
      usersInChat: [],
      emotingUsers: [],
      spamWatch: [],
      randomUser: "",
    };
  },

  methods: {
    async twitchListen() {
      const client = new tmi.Client({
        options: { debug: true },
        identity: {
          username: process.env.USERNAME,
          password: process.env.OAUTH,
        },
        channels: ["gloriousburrito"],
      });

      await client.connect();

      client.on("join", (channel, username, self) => {
        if (self) return;
        if (this.usersInChat.includes(username)) {
          return;
        }
        this.usersInChat.push(username);
      });

      client.on("message", (channel, tags, message, self) => {
        if (self) return;

        if (message.toLowerCase().includes("pogchamp")) {
          this.emoteTotal += 1;

          if (
            this.emotingUsers.find(
              (user) => user.displayName === tags.username
            ) === undefined
          ) {
            let emotingUser = new newEmotingUser(tags.username, 1);
            this.emotingUsers.push(emotingUser);
          } else {
            this.emotingUsers.find(
              (user) => user.displayName === tags.username
            ).userEmoteCount += 1;
          }

          if (
            this.spamWatch.find(
              (user) => user.displayName === tags.username
            ) === undefined
          ) {
            let spammingUser = new potentialSpammer(tags.username, 1);
            this.spamWatch.push(spammingUser);
            setTimeout(() => {
              this.spamWatch.splice(
                this.spamWatch.indexOf(
                  this.spamWatch.find(
                    (user) => user.displayName === tags.username
                  )
                ),
                1
              );
            }, 15000);
          } else {
            this.spamWatch.find(
              (user) => user.displayName === tags.username
            ).spamCount += 1;
            if (
              this.spamWatch.find((user) => user.displayName === tags.username)
                .spamCount > 5
            ) {
              client
                .timeout(
                  channel,
                  tags.username,
                  5,
                  "Too many emotes too quickly."
                )
                .then(() => {
                  console.log("Successfully timed out");
                  client.say(
                    channel,
                    `Hey @${tags.username}! You've been sending a lot of PogChamps. I appreciate it, but please slow down just a little bit (no more than 5 in 15 seconds).`
                  );
                })
                .catch((err) => {
                  console.log(`Unsuccessfully timed out. The error was ${err}`);
                });
            }
          }
        }
      });

      client.on("part", (channel, username, self) => {
        if (self) return;
        if (
          this.emotingUsers.find((user) => user.displayName === username) !==
          undefined
        ) {
          this.emotingUsers.splice(
            this.emotingUsers.findIndex(
              (user) => user.displayName === username
            ),
            1
          );
        }
        this.usersInChat.splice(this.usersInChat.indexOf(username), 1);
      });
    },

    updateThreshold(emoteThreshold) {
      this.emoteThreshold = emoteThreshold;
    },

    checkForEmoteThreshold() {
      if (
        this.emoteTotal % this.emoteThreshold === 0 &&
        this.emoteTotal !== 0
      ) {
        this.randomUser =
          this.emotingUsers[
            Math.floor(Math.random() * this.emotingUsers.length)
          ].displayName;
        window.alert(
          `Threshold reached! The lucky winner is... ${this.randomUser}!`
        );
      }
    },

    resetTotal() {
      if (confirm("Are you sure you want to reset the emote total?")) {
        this.emoteTotal = 0;
        this.emotingUsers = [];
        this.randomUser = "";
      }
    },

    getRandomUser() {
      if (this.emotingUsers.length === 0) {
        window.alert(`It doesn't look like anyone's used the emote yet.`);
      } else {
        this.randomUser =
          this.emotingUsers[
            Math.floor(Math.random() * this.emotingUsers.length)
          ].displayName;
        window.alert(`The lucky winner is... ${this.randomUser}!`);
      }
    },
  },

  created() {
    console.log(process.env);
    this.twitchListen();
  },

  updated() {
    this.checkForEmoteThreshold();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu&display=swap");
@import "../public/styles.css";
</style>
