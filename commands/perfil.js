const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const Canvas = require('canvas')
const { readFile } = require('fs/promises');
const { request } = require('undici');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('perfil')
		.setDescription('Mostre seu perfil para todo mundo ver!')
        .addUserOption(option => option.setName('usuário').setDescription('Mencione o usuário.').setRequired(false)),
	async execute(interaction) {
        const user = interaction.options.getUser('usuário') || interaction.user
        const canvas = Canvas.createCanvas(160, 300);
		const context = canvas.getContext('2d');

        const background = await readFile('../img/background.png');
		const backgroundImage = new Image();
		backgroundImage.src = background;
		context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'profile-image.png' });
		await interaction.reply({ files: [attachment]});
	},
};