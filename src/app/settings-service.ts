import { Injectable } from '@angular/core';
import { load, Store } from '@tauri-apps/plugin-store';
import { BehaviorSubject } from 'rxjs';

export type Settings = {
  welcomeSeen: boolean
}

const defaultSettings:Settings = {
  welcomeSeen: false
}


@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  ready = false;

  private readyObserver = new BehaviorSubject<boolean>(false);

  store:Store | undefined;

  getReadyObserver() {
    return this.readyObserver.asObservable()
  }

  constructor() {
    
    this.readyObserver.next(true)
    this.readyObserver.complete()

  }

  getKey(key:string): string | null {
    return localStorage.getItem(key)
  }

  setKey(key:string, value:string) {
    localStorage.setItem(key,value)
  }
}
