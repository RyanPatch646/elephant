import {Command} from './Command'
import {Hello} from './commands/Hello'
import {Add, GetAll, Pick, Remove} from './commands/RandomContentPicker'

export const Commands: Command[] = [
   Hello,
   Add,
   GetAll,
   Pick,
   Remove
]
