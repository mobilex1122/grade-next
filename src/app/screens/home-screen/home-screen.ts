import { Component, inject, OnInit } from '@angular/core';
import { State } from '../../state';
import { SimpleSubject, StorageService, Subjects } from '../../storage-service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { GradeSheet, GradeSheetResult } from './grade-sheet/grade-sheet';
import {
  MatDialog,
} from '@angular/material/dialog';
import { RenameDialog } from '../../dialogs/rename/rename';
import { Router } from '@angular/router';
import { DeleteDialog } from '../../dialogs/delete/delete';
import { SubjectView } from '../subject-view/subject-view';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-home-screen',
  standalone: false,
  templateUrl: './home-screen.html',
  styleUrl: './home-screen.css'
})
export class HomeScreen implements OnInit {
  dialog = inject(MatDialog);

  private _bottomSheet = inject(MatBottomSheet);

  constructor(public state:State, private storage:StorageService, private router:Router) {}

  public subjects:Subjects = []

  public globalavrage = 0;

  ngOnInit(): void {
    

    this.state.setTite("Summary")

    this.storage.getSubjectsObserver().subscribe((r)=> {
      console.log("New Subjects")
      console.log(r)
      this.subjects = r

      var count = 0
      this.globalavrage = 0
      r.forEach((s) => {
        if (s.average) {
          this.globalavrage += s.average
          count++;
        }
      })
      if (count == 0 ) {
        this.globalavrage = 0
      } else {
        this.globalavrage =  this.globalavrage / count;
      }
    })
  }

  public openSubjectMenu(subjectID:number, name:string) {
    var ref = this._bottomSheet.open(GradeSheet,{data: {id: subjectID, name:name,dialog: this.dialog}});

    ref.afterDismissed().subscribe((result) => {
      if (result == GradeSheetResult.rename) {
        var refd = this.dialog.open(RenameDialog, {data:{value: name}, disableClose: true})

        refd.afterClosed().subscribe((res) => {
          if (res) {
            console.log("Renaimg")
            this.storage.renameSubject(subjectID,res)
          }
        })
      } else if (result == GradeSheetResult.open) {
        //this.router.navigateByUrl("s/"+subjectID)

        this.state.openSubScreen(SubjectView, {id: subjectID})

      } else if (result == GradeSheetResult.delete) {
        var refdd = this.dialog.open(DeleteDialog, {data:{value: name}, disableClose: true})

        refdd.afterClosed().subscribe((res) => {
          if (res == true) {
            console.log("Deleting")
            this.storage.deleteSubject(subjectID)
          }
        })
      }
    })
  }
  public bybest(a:SimpleSubject, b:SimpleSubject) {
    return (a.average ?? 99999) - (b.average ?? 99999)
  }

  onClick(id:number) {
    this.state.openSubScreen(SubjectView, {id: id})
  }

  onHold(id:number, name: string) {
    this.openSubjectMenu(id, name)
  }
}
