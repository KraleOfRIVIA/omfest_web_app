// src/store/counter.ts
import { makeAutoObservable } from "mobx";

export default class WebAppStore {

    constructor() {
        makeAutoObservable(this);
    }


}
