const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ajuda')
		.setDescription('[📜 » Informações] - Mostra os comandos do Robrocord.'),
  
	async execute(interaction) {
const exampleEmbed = new EmbedBuilder()
	.setColor('#005FFF')
	.setTitle(`Central de Ajuda`)
  .setDescription(`Olá, a seguir serão mostrados os meus comandos que você pode utilizar!`)
  .setThumbnail(`${interaction.guild.iconURL()}`)
  .addFields( [
            { 
              name: "📜 » Informações",
              value: "`/ping`.",
            },
            {
              name: "😂 » Diversão",
              value: "`/pergunta`.",
            },
            {
      name: "💸 » Economia",
      value: "`/banco`, `/loja`, `/trabalhar`",
            },
          ]
        )
    .setFooter({text: `${interaction.user.tag}` , iconURL: `${interaction.user.displayAvatarURL()}`})

  await interaction.reply({embeds: [exampleEmbed]});
			
      }
	}
