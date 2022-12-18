const fs = require("fs");

module.exports.run = (client, msg, args) => {
    let commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js") )
    commands.forEach((str, index) => { commands[index] = str.slice(0, str.length-3)});
    msg.channel.send("List of commands: `" + commands  + "`");
}