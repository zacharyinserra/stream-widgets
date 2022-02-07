import tmi from 'tmi.js';
import { botCredentials } from './vars.js';

// Define configuration options
const opts = {
    identity: {
        username: botCredentials.bot_username,
        password: botCredentials.oauth_token
    },
    channels: [
        botCredentials.channel_name
    ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();

    // If the command is known, let's execute it
    if (commandName === '!bonk') {
        client.say(target, 'go to horny jail');
    } else {
        console.log(`* Unknown command ${commandName}`);
    }
}

// Function called when the "dice" command is issued
function rollDice() {
    const sides = 6;
    return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}