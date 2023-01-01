const {
  Client,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ChannelType,
} = require("discord.js");
const guessthenumber = require("../../Schemas/GuessTheNumber/GuessTheNumber");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("gtn")
    .setDescription("Setup the gtn event. (Guess The Number)")
    .addChannelOption((options) =>
      options
        .setName("channel")
        .setDescription("The channel to start gtn.")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addIntegerOption((options) =>
      options
        .setName("number")
        .setDescription("The number to be guessed.")
        .setRequired(true)
    ),

  /**
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const { options, guild, user } = interaction;

    const Channel = options.getChannel("channel");
    const Number = options.getInteger("number");

    const data = await guessthenumber
      .findOne({ Guild: guild.id })
      .catch((err) => {});
    if (!data) {
      await guessthenumber
        .create({ Guild: guild.id, Channel: Channel.id, number: Number })
        .catch((err) => {});
    }

    await interaction.reply({
      content: `Successfully started the gtn event! Channel: ${Channel} | Number: ${Number}.`,
      ephemeral: true,
    });
  },
};
