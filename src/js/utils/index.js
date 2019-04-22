export const bindScope = (scope, methods) => {
    methods.forEach(methodName => {
        if (typeof scope[methodName] === 'function') {
            scope[methodName] = scope[methodName].bind(scope);
        }
    })
}
