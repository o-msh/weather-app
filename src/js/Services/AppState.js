class AppState {
    constructor() {
        this.watchers = {};
    }

    watch(entity, handler) {
        if (!Array.isArray(handler)) {
            handler = [handler];
        }
        if (this.watchers[entity]) {
            this.watchers[entity].push(...handler)
        } else {
            this.watchers[entity] = handler;
        }
    }

    update(entity, newValue) {
        this.watchers[entity] && this.watchers[entity].forEach(handler => handler(newValue));
    }
}

export default new AppState();
