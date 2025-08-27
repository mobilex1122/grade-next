import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Component, inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { BehaviorSubject } from 'rxjs';
import { SubjectView } from './screens/subject-view/subject-view';
import { NgxBackButtonService } from 'ngx-back-button';
import { Router } from '@angular/router';

export type AppMsg = {
  type: "error" | "success" | "info"
  msg: string
}

export type AppSuccess = {
  msg: string
}

@Injectable({
  providedIn: 'root'
})
export class State {

  dialog = inject(MatDialog);

    
  ngxBackButtonService = inject(NgxBackButtonService)


  constructor(private router:Router) {
    window.addEventListener("popstate",(event:PopStateEvent)=> {
      if (event.state.data && event.state.data.type && event.state.data.type == "fullscreen") {
        console.log("Change")
        event.preventDefault()
        var dialogref = this.dialog.getDialogById(event.state.data.id)
        if (dialogref) {
            dialogref.close()
        }
      }
    })
  }

  private title = "<>"

  private msgsSubject = new BehaviorSubject<AppMsg | null>(null);
  private portalMassages = new BehaviorSubject<ComponentPortal<any> | null | number>(null);



  openSubScreen(c:ComponentType<any>,data = {}) {
    setTimeout(() => {
      const ref = this.dialog.open(c, {panelClass:"fullscreen-dialog", data:data, width:"100%", height: "100%", disableClose: true, autoFocus: false})
    
      history.pushState({type: "fullscreen", id:ref.id},"")
    },50)
    
  }
  closeSubScreen(count:number = 1) {
    this.portalMassages.next(count)
  }

  getSubScreenObserver() {
    return this.portalMassages.asObservable()
  }

  error( msg: string) {
    this.msgsSubject.next({
      type: "error",
      msg: msg
    })
  }

  info( msg: string) {
    this.msgsSubject.next({
      type: "info",
      msg: msg
    })
  }

  success( msg: string) {
    this.msgsSubject.next({
      type: "success",
      msg: msg
    })
  }

  getMsgObserver() {
    return this.msgsSubject.asObservable()
  }

  public setTite(title:string) {
    document.title = title
    this.title = title
    const appWindow = getCurrentWindow();

    appWindow.setTitle("Grade Next - " + title)
  }
  public getTitle() {return this.title}
}
