export const bindScope = (scope, methods) => {
    if (!Array.isArray(methods)) {
        methods = [methods];
    }
    methods.forEach(methodName => {
        if (typeof scope[methodName] === 'function') {
            scope[methodName] = scope[methodName].bind(scope);
        }
    })
}
