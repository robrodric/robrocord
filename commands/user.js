const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('[📜 » Informações] - Mostra as informações do usuário.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('info')
                .setDescription('[📜 » Informações] - Mostra as informações do usuário.')
                .addUserOption(option => option.setName('usuário').setDescription('Mencione o usuário.').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('avatar')
                .setDescription('[📜 » Informações] - Mostra o avatar do usuário.')
                .addUserOption(option => option.setName('usuário').setDescription('Mencione o usuário.').setRequired(true))),
	async execute(interaction, client) {
		const info = new EmbedBuilder()
		.setColor('#005fff')
	    .setTitle(`Informações de ${user.username}`)
        .addField("🚀 Nome", `\`${user.username}\``, true)
        .addField("🆔 ID:", `\`${user.id}\``, true)
        .addField("🚀 Criado em:", `\`<t:${user.createdTimestamp}>, <t:${user.createdTimestamp}:D>\``)
        .addField("💬 Entrou em:", `\`<t:${member.joinedTimestamp}>, <t:${member.joinedTimestamp}:D>\``)
         .setThumbnail(user.displayAvatarURL())
         .setFooter("Pagina 1/2")
         .setTimestamp()

        const info2 = new EmbedBuilder()
	.setColor('#005fff')
	.setTitle(`Informações de ${user.username}`)
    .addField("Cargos", `${member.roles.cache.map(r => r).join(`, `).replace("@everyone", " ")}`
     )
    .setThumbnail(user.displayAvatarURL())
    .setFooter("Pagina 1/2")
     .setTimestamp()
		
     const avatar = new EmbedBuilder()
     .setColor('#005fff')
     .setTitle(`Avatar de ${user.username}r`)
   .setDescription(`**Clique [aqui](${user.avatarURL()}) para baixar.**`)
   .setImage(`${user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })}`)
 
   const filter = i => i.customId === 'AvançarUser' || 'VoltarUser'
 
 const collector = interaction.channel.createMessageComponentCollector({ filter, time: 1500000 });
 
 collector.on('collect', async i => {
     if (i.customId === 'AvançarUser') {
         await i.update({ embeds: [info2], components: [row2] });
     }
 });
 
 collector.on('collect', async i => {
     if (i.customId === 'VoltarUser') {
         await i.update({ embeds: [info], components: [row] });
     }
 });
 
   if (interaction.options.getSubcommand() === 'info') {
 
             if (user) {
                 await interaction.reply({embeds: [info], components: [row]});
             } else {
                 await interaction.reply({embeds: [info], components: [row]});
             }
         } else if (interaction.options.getSubcommand() === 'avatar') {
     if (user) {
             await interaction.reply({embeds: [avatar]});
 } else {
       await interaction.reply({embeds: [avatar]});
 }
   }	
       }
     }