const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, SelectMenuBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ticket')
		.setDescription('[🔒 » ADMIN] - Comandpara setar o menu de suporte.'),
	async execute(interaction) {

 

const embed = new EmbedBuilder()
.setTitle('Central de Suporte do Robrocord 🌎')
.setColor("#005fff")
.setDescription('Aqui você poderá tirar suas dúvidas, fazer sugestões e muito mais... \nLeia cuidadosamente cada opção para não se confundir!')
.setImage("https://media.discordapp.net/attachments/776932715022254160/983249648858849280/ROBROCORD_SUPORTE-1.png")
    
const row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('select')
					.setPlaceholder('Selecione uma opção...')
					.addOptions([
						{
							label: 'Fazer uma denúncia',
							value: 'Den',
              emoji: '🚨',
						},
						{
							label: 'Mandar uma sugestão',
							value: 'Sug',
              emoji: '💡',
						},
            {
							label: 'Relatar um bug',
							value: 'Bug',
              emoji: '🔎',
						},
            {
							label: 'Tirar dúvidas',
							value: 'Duv',
              emoji: '❔',
						},
            {
							label: 'Pedido de parceria',
							value: 'Par',
              emoji: '🤝',
						},
            {
							label: 'Resgatar recompensas',
							value: 'Res',
              emoji: '🎉',
						},
            {
							label: 'Outros...',
							value: 'Out',
              emoji: '🚀',
						},
					]),
			);
            
    
		await interaction.channel.send({embeds: [embed], components: [row]}),
    await interaction.reply('painel criado.')
	}
}