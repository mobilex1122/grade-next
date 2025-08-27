import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export type AdvancedListButton = {
  id: string,
  icon: string
}

@Component({
  selector: 'app-advanced-list-item',
  imports: [MatRippleModule, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './advanced-list-item.html',
  styleUrl: './advanced-list-item.scss'
})
export class AdvancedListItem {

  @Input() leftText: string | null = ""
  @Input() rightText: string | null = ""
  @Input() timeOut = 500
  @Input() menuItems:string[]= []
  @Input() iconButtons:AdvancedListButton[]= []


  @Output("onClick") onClickEvent = new EventEmitter<void>();;
  @Output("onHold") onHoldEvent = new EventEmitter<void>();
  @Output("onMenuClick") onMenuEvent = new EventEmitter<string>();
  @Output("onButtonClick") onButtonEvent = new EventEmitter<string>();



  private openNormaly = false;
  private timer:number | undefined = undefined;
  public startTimer() {
    clearTimeout(this.timer)
    this.openNormaly = true

    this.timer = setTimeout(() => {
      this.openNormaly = false;
      this.onHoldEvent.emit()
    },this.timeOut)
  }


  public stopTimer() {
    if (this.openNormaly) {
      clearTimeout(this.timer)
      this.onClickEvent.emit()
    }
  }

  public cancelTimer() {
    if (this.timer) {
      this.openNormaly = false
      clearTimeout(this.timer)
      this.timer = undefined
    }
  }
}
