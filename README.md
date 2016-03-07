# ES6 Module investigations

## Running the example code
You will need to have Node v4.2.x installed and also npm 3..x is advised.

To see the output from the script run the following:
 
    npm install
    npm start

The install will take a long time because we are using babel and the ES2015 presets. Nodejs still does not natively support ES2015, even the latest version with *--harmony* flags is not sufficient - yet.  

## Exports

A module can export a function, a value, or classes which can be exported in two ways - default or named exports.

There can only be one default export per module.

    export default function() { ... };
    
    export default "this is the default string";
    
    export default class { ... };

Also, as expected, you can export functions defined elsewhere

    var doSomething = function() { .. };
    
    export default doSomething;

You can even export an object literal, utilising ES6 object initialiser here

    var doSomething = function() { ... };
    var anotherSomething = function() { ... };
    
    export {
        doSomething,
        anotherSomething
    }

In fact the default export is just a special case of a named export that has the name 'default' as you will see below.

You can even use CommonJS style syntax for default exports, if you really want to.

    export default {
        someFunction: function() { ... },
        someString: "this is the default string",
        someClass: class { ... }
    }

## Imports

In our example [loader.es6](!https://github.com/mlennox/es6-modules-investigation/blob/master/loader.es6) we import the same module a number of times to highlight how the way in which the different exports differ.
 
### Just the default
The default export is the example we provide above. To import it into another module we use the syntax

    import defaultExport from './module1/module1'

Notice that we do not have to provide the file extension. The *module2* module filename is index.es6 and the import will look for an index file by default so we can import module2 like so:

    import module2IsHere from './module2'

You should notice that there is no need to match the name of the module to the target variable for the default import.
 
Again, using this repo as a concrete example 

    import defaultExport from './module1/module1'
    
    console.log(defaultExport);
    
    /* prints out
     { moduleOneHandler: [Function: moduleOneHandler],
       someKindOfFunction: [Function: someKindOfFunction] }
    */

### Named imports
To import a named export all we do is ask for it by name :)

    // module1.es6
    export { moduleOneHandler }
    
    // loader.es6
    import moduleOneHandler from './module1/module1'

Notice the import variable name *must* match the named export.

The same is true for exports the expose a renamed function

    // module1.es6
    export { moduleOneHandler as renamedModuleOneHandler }
    
    // loader.es6
    import renamedModuleOneHandler from './module1/module1'

You can even use the ES6 destructing expression to pull a specific export from a group of named exports

    // module1.es6
    export {
        moduleOneHandler,
        anotherOneHandler
    }
    
    // loader.es6
    import { anotherOneHandler } from './module1/module1'

Note that although it appears you should be able to use a destructing expression to load one fo the modules exposed on the default export, this will not work

    // module1.es6
    export default {
        moduleOneHandler,
        someKindOfFunction
    }
    
    // loader.es6
    import { someKindOfFunction } from './module1/module1'

In this case there will be no error but *someKindOfFunction* will end up being *undefined*

Finally, you can choose to import all exports and assign them to some variable

    // loader.es6
    import * as module1 from './module1/module1'
    
    /* module1 = {
        { default: { moduleOneHandler: [Function: moduleOneHandler],
             someKindOfFunction: [Function: someKindOfFunction] },
          moduleOneHandler: [Function: moduleOneHandler],
          renamedModuleOneHandler: [Function: moduleOneHandler],
          anotherOneHandler: [Function: anotherOneHandler] }
        } 
    */


#### default is a named export

The **default** export is actually a very special case of a named export.

    import default as defaultExport from './module1/module1'
    // can be written directly as 
    import defaultExport from './module1/module1'
