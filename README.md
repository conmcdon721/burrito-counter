# Emote Counter

## Install
### Windows Explorer
1. Navigate to root file. !(`/glorious-burrito-emote-counter`)
2. Open `dist_electron` folder.
/public/install_instructions1.png
3. Run `Gloriousburrito Emote Counter Setup 1.0.0.exe`.
/public/install_instructions2.png
4. Open `win-unpacked` folder.
/public/install_instructions3.png
5. Run `Gloriousburrito Emote Counter.exe`.
/public/install_instructions4.png
6. (Recommended) Create shortcut to `Gloriousburrito Emote Counter.exe`.
/public/install_instructions5.png

## Features
- Twitch chat emote count
- Emoting user list
- Random user generator
- Updatable emote threshold
- Antispam checker
- Reset button

## Development Summary
In response to their request on Fiverr.com, I created this app to count and display the number of emotes sent in my client's Twitch chat. The app listens for a particular emote, updates a running total, and adds the username of the emote's sender to a list. A user will then be chosen from this list at random once a certain number of emotes have been sent. My client then rewards the user with various prizes including channel points, song requests, other special permissions. My client also requested the app include an antispam feature with a five-second cooldown.

I decided to accept my client's order because it seemed like an appropriate challenge; I already had some experience creating Twitch bots, but my client's requests included functionality with which I was unfamiliar. I began coding the project using HTML, CSS, and Javascript, but quickly realized how inconvenient it would be to update the DOM. Consequently, I decided to use a framework capable of frequently updating the DOM. I had used React in the past, but I had some reservations about using it again: I found it unintuitive, and I generally want to move away from using Facebook products. The basic layout of a Vue app made a lot of sense to me (i.e. template, script, style), so I decided to learn and implement it into my project.

The learning curve was steep, however, and I found myself reorganizing the component hierarchy multiple times before settling on the current file structure. Repeatedly, I referred to Traversy Media's in-depth Vue tutorial (https://www.youtube.com/watch?v=qZXt1Aom3Cs&t=2684s). In previous projects, I could interface with Twitch chat via the tmijs library (https://github.com/tmijs/tmi.js), and I was worried it wouldn't work within Vue. After reading up on Vue's lifecycle events, however, I was happy to find this fear was unfounded. Users in chat cannot be referred to directly through tmijs, so variables like total emote count, user emote count, and the antispam count had to be written within event handlers for each sent message.

Finally, there was the question of web hosting. I wasn't sure whether I should host the app for my client or if I should walk them through setting up their own server through a platform like Heroku or AWS. The client told me they would prefer some form of authorization if the app was public on the web, which I thought was understandable. To address this and the costs of hosting the app on a cloud platform, I decided to use Electron to create a desktop app. This was yet another learning curve as I had no experience with the framework. Between its documentation and the intuitive plugins for Vue, though, I was able to finalize the app.

In summary, I'm happy with the development of this project. I believe I could have completed this work quicker had I planned out a project timeline and intend to do so with my next app. The client originally suggested using a hashmap for this app, but I believe Vue was better for DOM interactions. I learned a lot and enjoyed my time talking to the client and coding the project.
