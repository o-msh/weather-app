export const bindScope = (scope, methods) => {
    if (!Array.isArray(methods)) {
        methods = [methods];
    }
    methods.forEach(methodName => {
        if (typeof scope[methodName] === 'function') {
            scope[methodName] = scope[methodName].bind(scope);
        }
    });
};

export const debounce = (fn, time) => {
    let timeout;

    return function() {
        const functionCall = () => fn.apply(this, arguments);

        clearTimeout(timeout);
        timeout = setTimeout(functionCall, time);
    };
};
