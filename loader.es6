// this will load the default and assign it to the variable we define
import defaultExport from './module1/module1'

// and we'll import the CommonJS style export too
import defaultExportCommonJS from './module2'

// or you can just import a named export
import { renamedModuleOneHandler } from './module1/module1'

// or use ES6 destructuring expression to pull a particular export
import { anotherOneHandler } from './module1/module1'

// this won't work!
import { someKindOfFunction } from './module1/module1'

// or even just pull everything into one variable
import * as module1 from './module1/module1'


console.log('default export : ', defaultExport);

console.log('default export commonJs : ', defaultExportCommonJS);

console.log('some kind of function : ', someKindOfFunction)

console.log('renamed module one handler : ', renamedModuleOneHandler);

console.log('destructed load of another one handler : ', anotherOneHandler)

console.log('the whole shebang : ', module1);