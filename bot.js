require("dotenv").config();

const axios = require("axios");

const options = {
  method: "GET",
  url: "https://dad-jokes.p.rapidapi.com/random/joke",
  headers: {
    "X-RapidAPI-Key": "c08cf56be4msh5852c60ae7918fcp1d8fe7jsncd6bf06516f3",
    "X-RapidAPI-Host": "dad-jokes.p.rapidapi.com",
  },
};

const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE"],
});

const BOT_PREFIX = "!";
const MOD_ME_COMMAND = "mod-me";

client.on("ready", () => {
  console.log("Our bot is ready to go!!!!");
});

client.on("messageDelete", (msg) => {
  msg.channel.send("Stop deleting messages");
});

client.on("message", (msg) => {
  if (msg.content == "fuck you") {
    msg.react("❤️");
  }

  if (msg.content === `${BOT_PREFIX}${MOD_ME_COMMAND}`) {
    modUser(msg.member);
  }
  if (msg.content == "dad") {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        console.log("setup:", response.data.body[0].setup);
        msg.reply(`${response.data.body[0].setup}`);
        setTimeout(() => {
          msg.reply(`${response.data.body[0].punchline}`);
        }, 3000);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
});

function modUser(member) {
  member.roles.add("783084095223234590");
}

client.login(process.env.BOT_TOKEN);
