import {BaseCommandInteraction, Client} from 'discord.js'
import {Command} from '../Command'

export const Hello: Command = {
   name: 'hello',
   description: 'Returns a greeting',
   type: 'CHAT_INPUT',
   run: async (client: Client, interaction: BaseCommandInteraction) => {
      const user = interaction.user.username
      const response: string = `Hello ${user}!`
      await interaction.followUp({
         ephemeral: true,
         content: response
      })
   }
}
