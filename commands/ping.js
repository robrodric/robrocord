const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction, client) {
		const ping = new EmbedBuilder()
		.setTitle(`Pong!`)
		.setDescription(`Pong`)
		await interaction.reply('Pong!');
	},
};