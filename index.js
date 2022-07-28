// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const mongoose = require('mongoose')
const dotenv = require('dotenv')

mongoose.connect("mongodb+srv://robrodric:50323432@cluster0.cko7y.mongodb.net/Robrocord?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true     });


// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const button = new ActionRowBuilder()
			.addComponents(				
        new ButtonBuilder()
				  .setCustomId('Criar')
				  .setLabel('Abrir Ticket')
					.setStyle(ButtonStyle.Primary)
          .setEmoji('➕'),
	);

	const filter = i => i.values === 'Den' || 'Sug' || 'Bug' || 'Duv' || 'Par' || 'Res' || 'Out'

const collector = interaction.channel.createMessageComponentCollector({ filter});

collector.on('collect', async i => {
	  let ab = i.values[0]
    i.deferUpdate()

    if (ab === "Sug") {

    if (interaction.guild.channels.cache.find(c => c.name === `💡-${interaction.user.id}`)) {
let c = interaction.guild.channels.cache.find(c => c.name === `💡-${interaction.user.id}`)
interaction.followUp(`Você já tem um ticket aberto ${c}`)
} else {
interaction.guild.channels.create(`💡-${interaction.user.id}`, {
 type: "GUILD_TEXT"})
    }
 
    await interaction.followUp({ content: "Aperte em **Abrir Ticket** para conseguir mandar sua sugestão.", components: [button], ephemeral: true});
    }
  if (ab === "Res") {
    await interaction.followUp({ content: "Aperte em **Abrir Ticket** para conseguir resgatar suas recompensas.", components: [button], ephemeral: true});
              }
});

collector.on('collect', async b => {
    let but = b.customId[0]
    b.deferUpdate()

    if (but === "CriarSug") {
if (interaction.guild.channels.cache.find(c => c.name === `👀-${interaction.user.id}`)) {
let c = interaction.guild.channels.cache.find(c => c.name === `👀-${interaction.user.id}`)
interaction.channel.send(`Você já tem um ticket aberto ${c}`)
} else {
interaction.guild.channels.create(`💡-${interaction.user.username}`, {
 type: "GUILD_TEXT"})
}
    }
});

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Login to Discord with your client's token
client.login(process.env.TOKEN);