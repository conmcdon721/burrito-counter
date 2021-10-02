import defaultExport from './variables.js'
import fetch from "node-fetch"

export default (async () => {
    const client = new variables.tmi.Client(options);
    client.connect().catch(console.error);

    client.on('message', (channel, tags, message, self) => {
        if(variables.emoteArray.includes(message.toLowerCase())) {
            console.log("Got it")
            emoteCounter[message.toLowerCase()]++
            fetch('/tally', postOptions)
            console.log("Tallied")
        }
    });
})();