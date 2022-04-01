import {BaseCommandInteraction, Client} from 'discord.js'
import {Command} from '../Command'
import {addContent, getContent, pickContent, removeContent} from '../randomContentPicker/Content'

const Pick: Command = {
   name: 'pick',
   description: 'Returns a random string from saved list',
   type: 'CHAT_INPUT',
   run: async (client: Client, interaction: BaseCommandInteraction) => {
      const serverId = interaction.guild?.id ? interaction.guild.id : ''
      const message = pickContent(serverId)
      await interaction.followUp({
         ephemeral: false,
         content: message
      })
   }
}

const GetAll: Command = {
   name: 'get',
   description: 'Returns current options',
   type: 'CHAT_INPUT',
   run: async (client: Client, interaction: BaseCommandInteraction) => {
      const serverId = interaction.guild?.id ? interaction.guild.id : ''
      const message = getContent(serverId)
      await interaction.followUp({
         ephemeral: false,
         content: message
      })
   }
}

const Add: Command = {
   name: 'add',
   description: 'Add an option',
   type: 'CHAT_INPUT',
   options: [
      {
         name: 'option',
         description: 'option to add to the list',
         type: 'STRING',
         required: true
      }
   ],
   run: async (client: Client, interaction: BaseCommandInteraction) => {
      const serverId = interaction.guild?.id ? interaction.guild.id : ''
      // @ts-ignore
      const {value: value} = interaction.options.data.at(0)
      const message = addContent(serverId, value)
      await interaction.followUp({
         ephemeral: false,
         content: message
      })
   }
}

const Remove: Command = {
   name: 'remove',
   description: 'Remove an option',
   type: 'CHAT_INPUT',
   options: [
      {
         name: 'option',
         description: 'option to remove from the list',
         type: 'STRING',
         required: true
      }
   ],
   run: async (client: Client, interaction: BaseCommandInteraction) => {
      const serverId = interaction.guild?.id ? interaction.guild.id : ''
      const value = String(interaction.options.data.at(0)?.value)
      const message = removeContent(serverId, value)
      await interaction.followUp({
         ephemeral: false,
         content: message
      })
   }
}

export {
   Pick,
   GetAll,
   Add,
   Remove
}
