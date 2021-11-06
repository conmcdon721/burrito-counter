module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "Gloriousburrito Emote Counter",
        win: {
          target: ["nsis"],
          icon: "public/favicon.png",
        },
      },
    },
  },
};
