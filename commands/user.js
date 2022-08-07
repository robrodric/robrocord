const { SlashCommandBuilder, EmbedBuilder, ButtonStyle, ActionRow, ActionRowBuilder, ButtonBuilder, ButtonComponent } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('[📜 » Informações] - Mostra as informações do usuário.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('info')
                .setDescription('[📜 » Informações] - Mostra as informações do usuário.')
                .addUserOption(option => option.setName('usuário').setDescription('Mencione o usuário.').setRequired(false)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('avatar')
                .setDescription('[📜 » Informações] - Mostra o avatar do usuário.')
                .addUserOption(option => option.setName('usuário').setDescription('Mencione o usuário.').setRequired(false))),
	async execute(interaction, client) {

        const user = interaction.options.getUser('usuário') || interaction.user
        const member = interaction.guild.members.cache.get(user.id)
        const fetched = await member.fetch()
        console.log(fetched.joinedTimestamp)
        

        const userTime = user.createdTimestamp.toString()
        const ut = userTime.substr(-13, 10)
        const memberTime = member.joinedTimestamp.toString()
        const mt = memberTime.substr(-13, 10)
        console.log(userTime.substr(-13, 10))

		const info = new EmbedBuilder()
		.setColor('#005fff')
	    .setTitle(`<:members:1005676574768627712> ${user.username}`)
        .addFields([{
            name:"<:DMicon:1005676498079985705> Nome:",
            value:`\`\`\`${user.tag}\`\`\``,
            inline: true
                    },
                    {
            name:"<:id:1005676532674601033> ID:",
            value:`\`\`\`${user.id}\`\`\``,
            inline: true
                    },
                    {
            name:"<:pencil:1005676607387729940> Apelido:",
            value:`\`\`\`${member.nickname || 'Nenhum'}\`\`\``,
                    },
                    {
            name:"<:stopwatch:1005677018312089610> Criado em:",
            value:`<t:${ut}>, <t:${ut}:D>`
                    },
                    {
            name:"<:stopwatch:1005677018312089610> Entrou em:",
            value:`<t:${mt}>, <t:${mt}:D>`
                    }])
         .setThumbnail(user.displayAvatarURL())
         .setFooter({text: `${interaction.guild.name}`})
         .setTimestamp()

        const info2 = new EmbedBuilder()
	.setColor('#005fff')
	.setTitle(`<:members:1005676574768627712> ${user.username}`)
    .addFields([{
            name:"Maior cargo:",
            value:`${user.flags.FLAGS}`
                },
                {
            name:"Cargos",
            value:`${user.id}`}
                ])
    .setThumbnail(user.displayAvatarURL())
    .setFooter({text:"Pagina 2/2"})
     .setTimestamp()
		
     const avatar = new EmbedBuilder()
     .setColor('#005fff')
     .setTitle(`Avatar de ${user.username}`)
   .setDescription(`**Clique [aqui](${user.avatarURL()}) para baixar.**`)
   .setImage(`${user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })}`)

   let row = new ActionRowBuilder()
			.addComponents(				
        new ButtonBuilder()
				.setCustomId('NextUser')
                .setEmoji('1005676594725142569')
				.setStyle(ButtonStyle.Primary),
	);

    let row2 = new ActionRowBuilder()
			.addComponents(
        new ButtonBuilder()
				.setCustomId('VoltarUser')
                .setEmoji('1005676625930760212')
				.setStyle(ButtonStyle.Danger),				
  );
 
   const filter = i => i.customId === 'NextUser' || 'VoltarUser'
 
 const collector = interaction.channel.createMessageComponentCollector({ filter, time: 1500000 });
 
 collector.on('collect', async i => {
     if (i.customId == 'NextUser') {
         await i.update({ embeds: [info2], components: [row2] });
     }
 });
 
 collector.on('collect', async i => {
     if (i.customId == 'VoltarUser') {
         await i.update({ embeds: [info], components: [row] });
     }
 });
 
   if (interaction.options.getSubcommand() === 'info') {
 
             if (user) {
                 await interaction.reply({embeds: [info]});
             } else {
                 await interaction.reply({embeds: [info]});
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