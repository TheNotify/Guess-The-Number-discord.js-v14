const { Client, Message } = require("discord.js");
const guessthenumber = require("../../Schemas/GuessTheNumber/GuessTheNumber");

module.exports = {
  name: "messageCreate",

  /**
   * @param {Message} message
   * @param {Client} client
   */
  async execute(message, client) {
    const data = await guessthenumber
      .findOne({ Guild: message.guild.id })
      .catch((err) => {});
    if (!data) return;

    const environ = {
      channelID: data.Channel,
      number: data.number,
    };
    if (
      Number.isInteger(parseInt(message.content)) &&
      parseInt(message.content) == environ.number &&
      message.channel.id == environ.channelID
    ) {
      message.pin().catch((err) => {});
      message.react("✅").catch((err) => {});
      message
        .reply({ content: `Congratulation! This user has guessed the correct number.` })
        .catch((err) => {});
      data.delete();
    }
  },
};
