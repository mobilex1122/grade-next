import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CreateSubjectDialog } from '../../dialogs/create-subject/create-subject';
import { StorageService } from '../../storage-service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable, shareReplay } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-create-subject-button',
  imports: [
    MatIconModule,
    MatButtonModule,
    AsyncPipe
  ],
  templateUrl: './create-subject-button.html',
  styleUrl: './create-subject-button.scss'
})
export class CreateSubjectButton {
  private breakpointObserver = inject(BreakpointObserver);


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  dialog = inject(MatDialog);
  constructor(private storage:StorageService) {}
  createSubject() {
    var ref = this.dialog.open(CreateSubjectDialog)

    ref.afterClosed().subscribe((name) => {
      if (name && name != "") {
        this.storage.addSubject(name)
      }
    })
    
  }
}
