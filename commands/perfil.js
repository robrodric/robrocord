const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const Canvas = require('canvas')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('perfil')
		.setDescription('Mostre seu perfil para todo mundo ver!')
        .addUserOption(option => option.setName('usuário').setDescription('Mencione o usuário.').setRequired(false)),
	async execute(interaction) {
        const user = interaction.options.getUser('usuário') || interaction.user
        const canvas = Canvas.createCanvas(160, 300);
		const context = canvas.getContext('2d');

        const background = await Canvas.loadImage('/imagens/backgroung.png');
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
		await interaction.reply({ files: [attachment]});
	},
};