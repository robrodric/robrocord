const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, Client, Collection, Intents } = require('discord.js');
const schema = require("../database/Schemas/member-schema.js")
const discord = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pagar')
		.setDescription('[💸 » Economia] - Comando para pagar um usuário.')
        .addUserOption(option => option.setName('usuário').setDescription('Mencione o usuário').setRequired(true))
        .addIntegerOption(option => option.setName('quantidade').setDescription('Quantidade de robrocoins que você quer pagar.').setRequired(true)),
  
	async execute(interaction, client) {

const user = interaction.options.getUser('usuário');

const quantidade = interaction.options.getInteger('quantidade')

const target = interaction.guild.members.fetch(interaction.targetId);

  let data;
  let give;
try {
data = await schema.findOne({ guildId: interaction.guild.id, userId: interaction.user.id})
give = await schema.findOne({ guildId: interaction.guild.id, userId: user.id})
if(!data) data = await schema.create({ guildId: interaction.guild.id, userId: interaction.user.id})
if(!give) data = await schema.create({ guildId: interaction.guild.id, userId: user.id})
}catch(e) {
console. log(e)
}

const pagamento = new EmbedBuilder()
	.setColor('#005fff')
	.setTitle(`💸 Pagamento de ${user.tag}`)
  .setDescription(`${interaction.user} pagou **${quantidade}** <:robrocoins:1004995682387632159> para **${user.username}**!`)
.setThumbnail(user.displayAvatarURL())

 
if (quantidade > 0 ) {
    if (quantidade > data.coins) {
        interaction.reply("Você não tem robrocoins suficientes.")
    }
    if (quantidade < 0) {
        interaction.reply("Você não pode trsferir com esse número.")
    }
data.coins -= quantidade;
give.coins += quantidade;

data.save()
give.save()
await interaction.reply({embeds: [pagamento]})
}
	},
  }