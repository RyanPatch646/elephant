import {readFile} from 'fs'
import {writeFile} from 'fs/promises'
import {randomInt} from 'crypto'
import {DOT_ENV} from '../DotEnv'

DOT_ENV.config()
const savedContentPath: string = process.env.SAVED_CONTENT_PATH ? process.env.SAVED_CONTENT_PATH : 'missing config for SAVED_CONTENT_PATH';

// serverId to contend name added
const ContentMap: Map<string, string[]> = new Map()

// called once on startup
function readSavedContent() {
   function fillContentMap(err: NodeJS.ErrnoException | null, data: string): void {
      if (err) console.log(err)
      else {
         const parsed = JSON.parse(data)
         if (parsed) {
            for (const key in parsed)
               ContentMap.set(key, parsed[key])
         }
      }
   }

   readFile(savedContentPath, 'utf8', fillContentMap)
}

function pickContent(id: string): string {
   const contentArr: string[] | undefined = ContentMap.get(id)
   if (contentArr && contentArr.length != 0) {
      const idx = randomInt(0, contentArr.length)
      const pick: string | undefined = contentArr.at(idx)
      return pick ? pick : 'sorry, something went wrong.'
   } else {
      return 'this server does not have content to pick from yet.'
   }
}

function addContent(id: string, content: string): string {
   let contentArr: string[] | undefined = ContentMap.get(id)
   if (contentArr == undefined || contentArr.length == 0) {
      contentArr = []
      ContentMap.set(id, contentArr)
   } else if (contentArr.includes(content)) {
      return `'${content}' already exists.`
   }

   contentArr.push(content)
   save()
   return `'${content}' added to the list.`
}

const getContent = (id: string): string => {
   const arr: string[] | undefined = ContentMap.get(id)
   return arr ? `• ${arr.join('\n• ')}` : 'this server does not have content to pick from yet.'
}

function save() {
   writeFile(savedContentPath, JSON.stringify(Object.fromEntries(ContentMap)))
      .catch(err => console.log(err))
}

function removeContent(id: string, content: string): string {
   const contentArr: string[] | undefined = ContentMap.get(id)
   let message: string
   if (!contentArr || contentArr.length === 0)
      message = 'this server has no content to remove'
   else {
      const idx: number = contentArr.indexOf(content)
      if (idx === -1)
         message = `list did not contain '${content}'.`
      else {
         const removed = contentArr.splice(idx, 1).at(0)
         message = `'${removed}' removed from the list.`
         save()
      }
   }

   return message
}

export {
   pickContent,
   addContent,
   getContent,
   readSavedContent,
   removeContent
}
