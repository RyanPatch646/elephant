import {Client} from 'discord.js'
import {Commands} from '../Commands'

export default (client: Client): void => {
   client.on(
      'ready',
      async () => {
         if (client.user && client.application)
            client
               .application
               .commands
               .set(Commands)
               .then(_ => console.log(`${client.user?.username} is online`))
      }
   )
}
