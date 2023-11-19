const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });
const axios = require('axios')
var colors = require('colors/safe');

const configuration = require("./Configuration.json")

function containsNitroGiftLink(text) {
    const nitroGiftRegex = /discord\.gift\/[a-zA-Z0-9]+/;
    return nitroGiftRegex.test(text);
  }
  
client.on('ready', async () => {
    console.log(colors.green(log("GL", "Welcome " + client.user.username + "!")));
})
client.on('messageCreate', async (message) => {
    if (containsNitroGiftLink(message.content)) {
            log("WAR", `Message contains a Discord Nitro gift link: ${message.content}`);
            const nitroRegex = /(discord\.gift|discordapp\.com\/gift)\/\w+/;
            const nitroMatch = nitroRegex.exec(message.content);
  
            const nitroCode = nitroMatch[0].split('/')[1];
            log("GL", `A Nitro code was found: ${nitroCode}!}`)
            axios({
              method: 'POST',
              url: `https://discordapp.com/api/v6/entitlements/gift-codes/${nitroCode}/redeem`,
              headers: {
                'Authorization': configuration.token,
              },
            })
              .then(() => log("GL", `Successfully redeemed a nitro that was found!`))
              .catch(() => log("ERR", `Link is expired, fake, or it's already claimed!`));
    }    
})

function log(type, msg){
    switch (type) {
        case 'ERR':
            console.log(colors.red('[!]', msg));
         break;
    
        case 'WAR':
            console.log(colors.yellow('[?]', msg));
        break;
    
        case 'GL':
          console.log(colors.green('[-]', msg));
        break;
    }
}

async function InitSniper(){
    if (configuration.token == "" && configuration.token == null){
        log("ERR", "No token entered, Please enter token inside configuration.json!")
    }   

    await client.login(configuration.token);
}

InitSniper()