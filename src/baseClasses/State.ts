interface GetStateFn<T> {
    ():T
};

export default abstract class State <T extends object> {
    private listeners: Function[] = [];
    private _state: T = <T>{};
    private initialized = false;

    constructor(initialState?: T) {
        if (initialState) this._state = { ...initialState };
    };

    protected initializeState = (initialState: T) => {
        let _this = this;
        if (!_this.initialized) {
            _this._state = initialState;
            _this.initialized = true;
        }
    };

    protected triggerListeners = () => {
        console.log('State: ', this._state);
        for (const listenerFn of this.listeners) {
            listenerFn(<T>this._state);
        }
    };

    public getState = (): T => {
        return { ...this._state };
    };

    public addListener = (listenerFn: Function) => {
        this.listeners.push(listenerFn);
        listenerFn(<T>this._state);
    };

    public updateState = (stateChange: Partial<T>) => {
        this._state = {  ...this._state, ...stateChange };
        this.triggerListeners();
    };
};