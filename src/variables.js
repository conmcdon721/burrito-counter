import dotenv from 'dotenv'
dotenv.config();

const varObj = {
	twitchOp: {
		options: { debug: true, messagesLogLevel: "info" },
		connection: {
			reconnect: true,
			secure: true
		},
		identity: {
			username: process.env.USERNAME,
			password: process.env.OAUTH
		},
		channels: [ process.env.CHANNEL_TO_JOIN ]
	},
}

export default varObj;