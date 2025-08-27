import { Component, inject, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { invoke } from "@tauri-apps/api/core";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { State } from "./state";
import { ScreensModule } from "./screens/screens-module";
import { StorageService } from "./storage-service";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CdkPortal, CdkPortalOutlet, ComponentPortal } from "@angular/cdk/portal";
import { FullscreenOverlayContainer, Overlay, OverlayContainer, OverlayModule } from "@angular/cdk/overlay";
import { SettingsService } from "./settings-service";
import { WelcomeScreen } from "./screens/welcome-screen/welcome-screen";
import { platform } from '@tauri-apps/plugin-os';
import { LocationStrategy } from "@angular/common";



@Component({
  selector: "app-root",
  providers: [{provide: OverlayContainer, useClass: FullscreenOverlayContainer}],
  imports: [RouterOutlet, MainNavComponent,ScreensModule, MatProgressBarModule, CdkPortalOutlet, OverlayModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit{
  private _snackBar = inject(MatSnackBar);
  constructor(public state:State, public storage:StorageService, public settings:SettingsService,private location: LocationStrategy) {
  }
  public  loading = true
  private checkInterval = 0

  

  private loadState = {
    settings: false
  }

  ngOnInit(): void {

    const currentPlatform = platform();


    if (currentPlatform == "android") {

    }

    this.state.setTite("Loading")
  

    this.state.getMsgObserver().subscribe((data) => {
      if (data) {
        this._snackBar.open(data.msg, undefined, {
          duration: 2000,
          panelClass: ["stack-"+data.type]
        });
      }
    })

    this.settings.getReadyObserver().subscribe((state) => {
      this.loadState.settings = state ?? false
      this.checkLoadState()
    })

   this.checkLoadState()

    
  }

  private checkLoadState() {
    Object.values(this.loadState).forEach((v)=>{
      if (v == false) {
        return
      }
    })



    setTimeout(() => {
      this.loading = false

      if (this.settings.getKey("welcomeSeen") != "true") {
        this.state.openSubScreen(WelcomeScreen)
      }
    }, 1000)
  }
}
