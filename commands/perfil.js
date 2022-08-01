const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const Canvas = require('canvas')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('perfil')
		.setDescription('Mostre seu perfil para todo mundo ver!'),
	async execute(interaction) {
        const canvas = Canvas.createCanvas(160, 300);
		const context = canvas.getContext('2d');

        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
		await interaction.reply({ files: [attachment]});
	},
};