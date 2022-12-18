// Import
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client(
    { 
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ],
    }
);
const fs = require("fs");
const defaultPrefix = ">";
client.commands = new Collection();

// Getting commands
const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))

// Looping through them and storing them
for (file of commands) {
    const name = file.split(".")[0];
    const command = require(`./commands/${name}`);
    client.commands.set(name, command);
}

// Events
client.on("ready", () => {
    client.user.setActivity(`Serving ${client.guilds.cache.size + 4} servers.`);

    setInterval(() => {
        client.user.setStatus("e");
    }, 10000);
})

client.on("messageCreate", (message) => {
     if (message.content.startsWith(defaultPrefix)) {
        const args = message.content.slice(defaultPrefix.length).trim().split(/ + /g);
        const name = args.shift();
        const command = client.commands.get(name)

        if (!command) return message.reply({content: `"${name}" not a valid command. Say >help too get a list of commands.`})
        command.run(client, message, args)
     }
});

// Login
client.login("OTQ3MDQ0MTAwNjM1NTA4ODM2.GBm8CK.jJGJaZd54ZBKRzCzrh3oS6c1cc1ERJrYk413xk")