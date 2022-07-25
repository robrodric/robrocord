const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, Modal, TextInputComponent, MessageActionRow } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pergunta')
		.setDescription('[😂 » Diversão] - Faça uma pergunta ao Robrocord.')
    .addStringOption(option => option.setName('frase').setDescription('Escreva sua pergunta.').setRequired(true)),
  
  
	async execute(interaction) {

  const frase = interaction.options.getString('frase');

  const user = interaction.user

  var myArray = [
    "Não",
    "Sim",
    "Talvez",
    "Quem sabe né?",
    "Um dia talvez?",
    "Eu confio que sim",
    "Nunca"
  ];
  
  
  var respostas = myArray[Math.floor(Math.random()*myArray.length)];

const pergunta = new EmbedBuilder()
	.setColor('#005FFF')
	.setTitle(`${frase}`)
   .setDescription(`${respostas}`)
  .setFooter({text: `${interaction.user.tag}` , iconURL: `${interaction.user.displayAvatarURL()}`})
 .setTimestamp()
    
 

    await interaction.reply({embeds: [pergunta]})


  }
      }
