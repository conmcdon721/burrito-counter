import varObj from './variables.js'

export default (async () => {
    // NEED .env VARIABLES WITH TOKEN FOR TWITCH APP
    const client = new varObj.tmi.Client(varObj.twitchOp);
    client.connect().catch(console.error);

    client.on('message', (channel, tags, message, self) => {
        if(varObj.emoteArray.includes(message.toLowerCase())) {
            console.log("Got it")
        }
    });
})();