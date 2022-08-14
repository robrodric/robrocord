const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const Canvas = require('canvas')
const { loadImage, registerFont } = require('canvas')
const { readFile } = require('fs/promises');
const schema = require("../database/Schemas/member-schema.js")
registerFont('./fonts/FredokaOne-Regular.ttf', { family: 'Fredoka One' })
const { request } = require('undici');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('perfil')
		.setDescription('[😂 » Diversão] - Mostre seu perfil para todo mundo ver!')
        .addUserOption(option => option.setName('usuário').setDescription('Mencione o usuário.').setRequired(false))
		.addStringOption(option => option.setName('sobre-mim').setDescription('Conte sobre você, isso aparecerá no seu perfil!').setRequired(false).setMaxLength(40)),
	async execute(interaction) {
        const user = interaction.options.getUser('usuário') || interaction.user;
		const sobre = interaction.options.getString('sobre-mim');
		const avatarURL = `${user.displayAvatarURL({extension: "jpeg", dynamic: false, size: 256})}`

		let data;
		try {
	data = await schema.findOne({ guildId: interaction.guild.id, userId: user.id})
		if(!data) data = await schema.create({ guildId: interaction.guild.id, userId: user.id})
	}catch(e) {
		console. log(e)
	}

		const fetched = await user.fetch(user.hexAccentColor)
		console.log(fetched)
		var canvas = {}
		canvas.create = Canvas.createCanvas(600, 820)
		canvas.context = canvas.create.getContext('2d')
		canvas.context.fillStyle = `${user.hexAccentColor}`
		canvas.context.fillRect(0,0, 600, 120)
		canvas.context.fillStyle = '#18191c'
        canvas.context.fillRect(0,120, 600, 700)
        canvas.context.arc(124, 120, 92, 0, 2 * Math.PI)
		canvas.context.fill('#18191c')

		canvas.context.font = '40px Fredoka One'
		canvas.context.fillStyle = '#ffffff'
		canvas.context.fillText(user.tag, 50, 240)

		canvas.context.font = '30px Fredoka One'
		canvas.context.fillStyle = '#ffffff'
	 	canvas.context.fillText(`${data.coins}`, 110, 360)


		canvas.context.fillStyle = '#282A2D'
        canvas.context.fillRect(50,280, 500, 2)

		const avatar = await Canvas.loadImage(avatarURL)
		const robrocoins = await Canvas.loadImage('./img/robrocoins.png')
		canvas.context.drawImage(robrocoins, 50, 325, 50, 50)

		canvas.context.fillStyle = '#282A2D'
        canvas.context.fillRect(50,400, 500, 2)


		canvas.context.font = '30px Fredoka One'
		canvas.context.fillStyle = '#B9BBBE'
	 	canvas.context.fillText(`SOBRE MIM`, 50, 460)

		if (sobre) {
			if (user == interaction.user) {
		 	data.sobre = sobre
		 	await data.save()
			}
		}

		canvas.context.font = '25px Fredoka One'
		canvas.context.fillStyle = '#ffffff'
		canvas.context.fillText(`${data.sobre}`, 50, 510)

		//Parte de Cargos

		canvas.context.fillStyle = '#282A2D'
        canvas.context.fillRect(50,550, 500, 2)

		canvas.context.font = '30px Fredoka One'
		canvas.context.fillStyle = '#B9BBBE'
	 	canvas.context.fillText(`CONQUISTAS`, 50, 610)

		if (user.id === '655176205171163138') {
			const dono = await Canvas.loadImage('./img/owner.png')
		canvas.context.drawImage(dono, 50, 660, 50, 50)
		} else {
		canvas.context.font = '20px Fredoka One'
		canvas.context.fillStyle = '#ffffff'
		canvas.context.fillText(`Nenhuma por enquanto...`, 50, 660)
		}
		
		canvas.context.beginPath()
		canvas.context.arc(124, 120, 80, 0, 2 * Math.PI)
		canvas.context.closePath()
		canvas.context.clip()
		canvas.context.drawImage(avatar, 44, 40, 160, 160)

        let att = new AttachmentBuilder(canvas.create.toBuffer(), `perfil-${user}.png`)
		await interaction.reply({files: [att]})
	},
};