const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, Client, Collection, Intents } = require('discord.js');
const schema = require("../database/Schemas/member-schema.js")
const discord = require('discord.js')
const ms = require('parse-ms-2')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('trabalhar')
		.setDescription('[💸 » Economia] - Comando para trabalhar e ganhar robrocoins.'),
  
	async execute(interaction, client) {

const quantidade = interaction.options.getInteger('quantidade')

var myArray = [
  "Programacão",
  "Engenhearia",
  "Ciência",
  "Desenho",
  "Arquitetura",
  "Jornalismo",
  "Produção Musical",
  "Advocacia",
];


var emprego = myArray[Math.floor(Math.random()*myArray.length)];


const user = interaction.user

  let data;
try {
data = await schema.findOne({ guildId: interaction.guild.id, userId: user.id})
if(!data) data = await schema.create({ guildId: interaction.guild.id, userId: user.id})
} catch(error) {
console.log(error)
}

let timeout =  120000
let randomAmount = Math.floor(Math.random() * 4000) + 1000

if(timeout - (Date.now() - data.daily) > 0 ) {
let timeleft = ms(timeout - (Date.now() - data.daily))

const exampleEmbedA = new EmbedBuilder()
	.setColor('#005fff')
	.setTitle(`💸 Salário de ${user.tag}`)
  .setDescription(`Você já trabalhou hoje, tente novamente em:\n**${timeleft.hours} horas**, **${timeleft.minutes} minutos** e **${timeleft.seconds} segundos.**`)
.setThumbnail(user.displayAvatarURL())
  
return interaction.reply({embeds: [ exampleEmbedA
  //{
  //"title": `💸 Salário de ${user.tag}`,
  //"description": `Você já trabalhou hoje, tente novamente em:\n **${timeleft.minutes} minutos e ${timeleft.seconds} segundos**`,
  //"color": 24575,
  //"thumbnail": `${user.displayAvatarURL()}`
  //}
]})
}

    data.daily = Date.now()
data.coins += randomAmount
await data.save() 
const exampleEmbedR = new EmbedBuilder()
	.setColor('#005fff')
	.setTitle(`💸 Salário de ${user.tag}`)
  .setDescription(`Você trabalhou na área de **${emprego}** e ganhou ${randomAmount} robrocoins!`)
.setThumbnail(user.displayAvatarURL())
.setFooter({text: "Dica: Use robrocoins para comprar itens na /loja"})
interaction.reply({embeds: [ exampleEmbedR
  //{
  //"title": `💸 Salário de ${user.tag}`,
  //"description": `Você trabalhou de Gerente e ganhou ${randomAmount} robrocoins!`,
  //"color": 24575,
  //"thumbnail": `${user.displayAvatarURL()}`
  //}
]})

                   }                                     }