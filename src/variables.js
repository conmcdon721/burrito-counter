import dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import tmi from 'tmi.js'

// import puppeteer from 'puppeteer';

const varObj = {
	tmi: tmi,
	express: express,
	// puppeteer: puppeteer,
	
	emoteArray: ['catjam', 'ez', 'hackermans'],

	emoteCounter: {
        catjam: 0,
        ez: 0,
        hackermans: 0,
    },

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

	postOptions: {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		}
	},
}

export default varObj;