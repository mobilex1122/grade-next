import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { State } from '../state';
import { RouterLink, RouterLinkActive } from  "@angular/router"

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.scss',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive
]
})
export class MainNavComponent {
  private breakpointObserver = inject(BreakpointObserver);

  constructor(public state:State) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe("(max-width: 900px)")
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
