const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, MessageActionRow, MessageButton } = require('discord.js')
const schema = require("./../database/Schemas/member-schema")
module.exports = {
	data: new SlashCommandBuilder()
		.setName('rank')
		.setDescription('[💸 » Economia] - Comando para mostrar as 10 pessoas com mais robrocoins no servidor.'),
	async execute(interaction, client) {
  try{
    let data = await schema.find({})
    let members = []
for (let obj of data) {
 if (interaction.guild.members.cache
.map((member) => member.id)
.includes(obj.userId)) members.push(obj)
}

const embed = new EmbedBuilder().setTitle("Leaderboard").setColor("#005FFF").setFooter({text: "Você ainda não está no rank"})

members = members.sort(function (b, a) {
return a.coins - b.coins
})

members = members.filter(function BigEnough(value) {
return value.coins > 0
})

let pos = 0
for( let obj of members) {
pos++
if(obj.userId == interaction.user.id) {
embed.setFooter({text: `Você está na posição #${pos} no rank`})
}
}

members = members.slice(0, 10)
let desc = ""

for (let i = 0; i < members.length; i++) {
let user = client.users.cache.get(members[i].userId)
if(!user) return
let bal = members[i].coins
desc += `${i + 1}. ${user.tag} - ${bal}\n`
}

embed.setDescription(`${desc}`)
interaction.reply({embeds: [embed]})
}catch(e) {
console. log(e)
}
  }
}