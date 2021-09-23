const fetch = require('node-fetch');
var config = require('../configd.json')
const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');

module.exports = {
    name: 'complain',
    data: new SlashCommandBuilder()
    .setName(`complain`)
    .setDescription(`Complain to the developer! Do it! Any issue!`)
    .addStringOption(option => option.setName(`complaint`).setDescription(`Anything and everything!`).setRequired(true)),
    async execute(interaction) {

        const webhookClient = new discord.WebhookClient({ id: config.botuser.webhookId, token: config.botuser.webhookToken })
        var complaint = interaction.options.getString('complaint')

        const complaintEmbed = new discord.MessageEmbed()
        .setAuthor(`Complaint from ${interaction.user.tag}`, `${interaction.user.avatarURL()}`)
        .setDescription(`${complaint}`)

        await webhookClient.send({
            username: 'Splitstat - Complaint',
            avatarURL: 'https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png',
            embeds: [complaintEmbed],
        });

        return await interaction.reply('Got it! I sent that to the developer of this bot!\nYour complaint: `' + complaint + '`')
    }
}