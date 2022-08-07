const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('eval')
		.setDescription('[⚠️ - Dono] apenas o dono do bot.')
    .addStringOption(option => option.setName('code').setDescription('Escreva seu eval.').setRequired(true)),
   
	async execute(interaction, client) {
    const user = interaction.options.getUser('usuário') || interaction.user
    const member = interaction.guild.members.cache.get(user.id)
    
    if(interaction.user.id != "655176205171163138") return interaction.reply('Comando permitido apenas para desenvolvedores do bot.')
    try {
      const output = eval(interaction.options.getString('code'))
      return interaction.reply({ephemeral: true, content: `**Output:** \`\`\`js\n${output.substr(0, 1950)}\`\`\``})
    } catch(err) {
      return interaction.reply({ephemeral: true, content: `**Error:** \`\`\`js\n${err.stack}\`\`\``})
    }
	},
};