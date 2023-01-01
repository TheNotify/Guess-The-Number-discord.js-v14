const { Client, Message } = require("discord.js");
const guessthenumber = require("../../Schemas/GuessTheNumber/GuessTheNumber");

module.exports = {
  name: "messageCreate",

  /**
   * @param {Message} message
   * @param {Client} client
   */
  async execute(message, client) {
    const Data = await guessthenumber
      .findOne({ Guild: message.guild.id })
      .catch((err) => {});
    if (!Data) return;

    const guess = {
      Channel: Data.Channel,
      number: Data.number,
    };
    if (
      Number.isInteger(parseInt(message.content)) &&
      parseInt(message.content) == guess.number &&
      message.channel.id == guess.Channel
    ) {
      message.pin().catch((err) => {});
      message.react("✅").catch((err) => {});
      message
        .reply({ content: `Congratulation! This user has guessed the correct number.` })
        .catch((err) => {});
      await Data.delete();
    }
  },
};
