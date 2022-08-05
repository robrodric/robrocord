const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, Client, Collection, Intents } = require('discord.js');
const schema = require("../database/Schemas/member-schema.js")
const discord = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('banco')
		.setDescription('[💸 » Economia] - Mostra todos os robrocoins na sua conta bancária.')
    .addUserOption(option => option.setName('usuário').setDescription('Mencione o usuário.').setRequired(false))
  ,
  
	async execute(interaction, client) {

const user = interaction.options.getUser('usuário') || interaction.user

const target = interaction.guild.members.fetch(interaction.targetId);

  let data;
try {
data = await schema.findOne({ guildId: interaction.guild.id, userId: user.id})
if(!data) data = await schema.create({ guildId: interaction.guild.id, userId: user.id})
}catch(e) {
console. log(e)
}

const exampleEmbed = new EmbedBuilder()
	.setColor('#005fff')
	.setTitle(`🏦 Banco de ${user.tag}`)
  .setDescription(`**${user.username}** tem **${data.coins}** :robrocoins:!`)
  .setThumbnail(user.displayAvatarURL())
  .setFooter({text: "Dica: Use /trabalhar para conseguir robrocoins!"})

			if (user) {
	await interaction.reply({embeds: [exampleEmbed]});
			} else {
  await interaction.reply({embeds: [exampleEmbed]});
      }
	},
}