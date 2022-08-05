const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, Client, Collection, Intents } = require('discord.js');
const schema = require("../database/Schemas/member-schema.js")
const discord = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('robrocoins')
		.setDescription('[🔒 » Admin] - Comando pra adicionar, remover ou setar robrocoins.')
    .addSubcommand(subcommand =>
		subcommand
			.setName('adicionar')
			.setDescription('[🔒 » Admin] - Comando para adicionar robrocoins.')
      .addUserOption(option => option.setName('usuário').setDescription('Mencione o usuário').setRequired(true))
      .addIntegerOption(option => option.setName('quantidade').setDescription('Quantidade de robrocoins que você quer adicionar.').setRequired(true))
       )
    
	.addSubcommand(subcommand =>
		subcommand
			.setName('remover')
			.setDescription('[🔒 » Admin] - Comando para remover robrocoins.')
      .addUserOption(option => option.setName('usuário').setDescription('Mencione o usuário').setRequired(true)) 
      .addIntegerOption(option => option.setName('quantidade').setDescription('Quantidade de robrocoins que você quer remover.').setRequired(true))
       )
    
   .addSubcommand(subcommand =>
		subcommand
			.setName('setar')
			.setDescription('[🔒 » Admin] - Comando para setar robrocoins.')
     .addUserOption(option => option.setName('usuário').setDescription('Mencione o usuário').setRequired(true))
      .addIntegerOption(option => option.setName('quantidade').setDescription('Quantidade de robrocoins que você quer setar.').setRequired(true))
       ),
  
	async execute(interaction, client) {

const user = interaction.options.getUser('usuário') || interaction.user;

const quantidade = interaction.options.getInteger('quantidade')
const subcommand = interaction.options.getSubcommand()

const target = interaction.guild.members.fetch(interaction.targetId);

  let data;
try {
data = await schema.findOne({ guildId: interaction.guild.id, userId: user.id})
if(!data) data = await schema.create({ guildId: interaction.guild.id, userId: user.id})
}catch(e) {
console. log(e)
}

const exampleEmbedA = new EmbedBuilder()
	.setColor('#005fff')
	.setTitle(`🏦 Banco de ${user.tag}`)
  .setDescription(`Foi adicionado ${quantidade} <:robrocoins:1004995682387632159> ao banco de ${user.username}!`)
.setThumbnail(user.displayAvatarURL())

const exampleEmbedR = new EmbedBuilder()
	.setColor('#005fff')
	.setTitle(`🏦 Banco de ${user.tag}`)
  .setDescription(`Foi removido ${quantidade} <:robrocoins:1004995682387632159> do banco de ${user.username}!`)
.setThumbnail(user.displayAvatarURL()) 


const exampleEmbedS = new EmbedBuilder()
	.setColor('#005fff')
	.setTitle(`🏦 Banco de ${user.tag}`)
  .setDescription(`Foi setado ${quantidade} <:robrocoins:1004995682387632159> ao banco de ${user.username}!`)
.setThumbnail(user.displayAvatarURL())
 
if (interaction.user.id === '655176205171163138'){
			if (subcommand == 'adicionar') {
	data.coins += quantidade
        await data.save()
        return interaction.reply({embeds: [exampleEmbedA]})
			} else if (subcommand == 'remover') {
  if(quantidade > data.coins) return interaction.reply('A quantidade pedida é maior do que os robrocoins que o usuário tem, atualmente ele tem ${data.coins}')
  data.coins -= quantidade
        await data.save()
        return interaction.reply({embeds: [exampleEmbedR]})
      } else if (subcommand == 'setar') {
      if(quantidade < 1) return interaction.reply('A quantidade mínima de robrocoins para setar é de 1 robrocoin')
      data.coins = quantidade
        await data.save()
        return interaction.reply({embeds: [exampleEmbedS]})
      }
    }
	},
  }