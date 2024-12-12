import { Observable } from '@nativescript/core';

export class BaseViewModel extends Observable {
    private _isLoading: boolean = false;

    constructor() {
        super();
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    set isLoading(value: boolean) {
        if (this._isLoading !== value) {
            this._isLoading = value;
            this.notifyPropertyChange('isLoading', value);
        }
    }

    protected setProperty<T>(propertyName: string, value: T, oldValue?: T): boolean {
        if (oldValue !== value) {
            this.set(propertyName, value);
            return true;
        }
        return false;
    }
}