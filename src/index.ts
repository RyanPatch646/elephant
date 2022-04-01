import {Client} from 'discord.js'
import interactionCreate from './listeners/interactionCreate'
import ready from './listeners/ready'
import {readSavedContent} from './randomContentPicker/Content'
import {DOT_ENV} from './DotEnv'

console.log('Bot is starting...')

const client: Client = new Client({intents: [], http: {host: process.env.HTTP_HOST}})

DOT_ENV.config()

readSavedContent()
ready(client)
interactionCreate(client)

client
   .login(process.env.OAUTH_TOKEN)
   .then(_ => console.log('login successful'))
