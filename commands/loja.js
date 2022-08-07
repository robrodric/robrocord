const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, Client, Collection, Intents, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const schema = require("../database/Schemas/member-schema.js")
const discord = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('loja')
		.setDescription('[💸 » Economia] - Comando para mostrar os itens da loja que podem ser comprados com robrocoins.')
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

const button = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('abrirLoja')
					.setLabel(' ')
					.setStyle(ButtonStyle.Primary)
                    .setEmoji('🛒'),
			);
			
const compra = new ActionRowBuilder()
.addComponents(
	new ButtonBuilder()
		.setCustomId('VoltarInicio')
		.setLabel('Voltar')
		.setEmoji('1005676594725142569')
		.setStyle(ButtonStyle.Danger),
)
           .addComponents(
			    new ButtonBuilder()
				    .setCustomId('abrirVIP')
					.setLabel(' ')
					.setStyle(ButtonStyle.Primary)
					.setEmoji('💎')
		   )
		   .addComponents(
			new ButtonBuilder()
				.setCustomId('abrirCaixa')
				.setLabel(' ')
				.setStyle(ButtonStyle.Primary)
				.setEmoji('📦')
	   )

const menuLoja = new EmbedBuilder()
	.setColor('#005fff')
	.setTitle(`Loja do ${interaction.guild.name}`)
  .setDescription(`Seja bem vindo a loja do **${interaction.guild.name}**, aqui você pode comprar **items exclusivos** para utilizar no servidor!
  
  Clique em :shopping_cart: para acessar a loja!`)
  .setThumbnail(interaction.guild.iconURL())

  const escolhaLoja = new EmbedBuilder()
	.setColor('#005fff')
	.setTitle(`Loja do ${interaction.guild.name}`)
  .setDescription(`
  Clique em :gem: para comprar **VIPs**.
  Clique em :package: para comprar **Caixas**.`)
  .setThumbnail(interaction.guild.iconURL())

  const escolhaCaixa = new EmbedBuilder()
	.setColor('#005fff')
	.setTitle(`Loja do ${interaction.guild.name}`)
  .setDescription(`
  Caixa **Comum**: 10000 <:robrocoins:1004995682387632159>.
  Caixa **Incomum**: 15000 <:robrocoins:1004995682387632159>.
  Caixa **Rara**: 20000 <:robrocoins:1004995682387632159>.
  Caixa **Épica**: 25000 <:robrocoins:1004995682387632159>.
  Caixa **Lendária**: 30000 <:robrocoins:1004995682387632159>.`)
  .setThumbnail(interaction.guild.iconURL())

  const escolhaVip = new EmbedBuilder()
	.setColor('#005fff')
	.setTitle(`Loja do ${interaction.guild.name}`)
  .setDescription(`
  VIP **Comum**: 10000 <:robrocoins:1004995682387632159>.
  VIP **Premium**: 200000 <:robrocoins:1004995682387632159>.
  VIP **Diamante**: 30000 <:robrocoins:1004995682387632159>.
  `)
  .setThumbnail(interaction.guild.iconURL())

  const filter = i => i.customId === 'abrirLoja' || 'abrirCaixa' || 'abrirVip';

  const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

  collector.on('collect', async i => {
	if (customId == 'abrirLoja') {
	    await i.update({ embeds: [escolhaLoja], components: [compra] });
	}

	if (customId == 'abrirCaixa') {
		await i.update({ embeds: [escolhaCaixa], components: [compra] });
		}
	if (customId == 'abrirVip') {
		await i.update({ embeds: [escolhaVip], components: [compra] });
			}
});

  await interaction.reply({embeds: [menuLoja], components: [button]});
	},
}