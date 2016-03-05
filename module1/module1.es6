var moduleOneHandler = function(){
    console.log('module 1 reporting for duty');
};

var anotherOneHandler = function() {
    console.log('another handler');
};

// there can only be one default export per module
// but there does not need to be a default
export default moduleOneHandler;

// exports can rename the exported module
export { moduleOneHandler as renamedModuleOneHandler }

// using ES6 object initialiser, there is no need to provide the property and value if they match
// so { moduleOneHandler: moduleOneHandler, anotherOneHandler: anotherOneHandler } would become :
export {
    moduleOneHandler,
    anotherOneHandler
}