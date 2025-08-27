import { Component, inject, model, OnDestroy, OnInit, Pipe } from '@angular/core';
import { State } from '../../state';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Grade, StorageService } from '../../storage-service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddGradeSheet } from './add-grade-sheet/add-grade-sheet';
import { formatNumber } from '@angular/common';
import { SelectGradeSheet } from './select-grade-sheet/select-grade-sheet';
import { GradeSheetResult } from '../home-screen/grade-sheet/grade-sheet';
import { AdvancedListButton } from '../../components/advanced-list-item/advanced-list-item';
import { DeleteDialog } from '../../dialogs/delete/delete';
import { RenameDialog } from '../../dialogs/rename/rename';
import { Subscription } from 'rxjs';

export type SubjectViewData = {
  id: number
}


const gradeButtons:AdvancedListButton[] = [
  {id: "edit",icon:"edit"},
  {id: "delete",icon:"delete"},
]

@Component({
  selector: 'app-subject-view',
  standalone: false,
  templateUrl: './subject-view.html',
  styleUrl: './subject-view.scss'
})
export class SubjectView implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  public readonly dialogRef = inject(MatDialogRef);
  readonly data = inject<SubjectViewData>(MAT_DIALOG_DATA);
  constructor(public state:State, public storage:StorageService) {}
  

  sub: Subscription | undefined;
  gradeButtons = gradeButtons;

  private _bottomSheet = inject(MatBottomSheet);

  newName = model("")
  incrementValue = 0.5

  newGrade = {
    grade: 0,
    weight: 1,
  }
  
  average = 0;
  name = "Subject"
  id = 0;
  grades:Grade[] = []

  ngOnInit(): void {
    this.sub = this.storage.getChangeObserver().subscribe(()=> {
      this.storage.getSubject(this.data.id).subscribe((s)=> {
        if (s) {
          this.name = s.name
          this.id = s.id
          this.grades = s.grades

          var gsum = 0
          var weightSum = 0 
          s.grades.forEach((g) => {
            gsum += g.grade * g.weight
            weightSum += g.weight
          })
          if (weightSum == 0) {
            this.average = 0
          } else if (this.grades.length == 0 ) {
            this.average = 0
          } else {
            this.average = gsum / weightSum
          }
        }
      })
    })
    
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }

  makeReadableGrade(grade:Grade) {
    var g = formatNumber(grade.grade ?? 0, "en", '1.0-1')
    var w = formatNumber(grade.weight ?? 0,"en",'1.0-1')
    return g + '/' + w
  }



  addGrade() {
    this._bottomSheet.open(AddGradeSheet, {disableClose: true, data: {subjectid: this.id}, autoFocus: false})
    // this.storage.addGrade(this.id,this.newGrade.grade,this.newGrade.weight, this.newName())
    // this.newGrade = {
    //   grade: 0,
    //   weight: 1,
    // }
    // this.newName.set("")
  }

  selectGrade(grade:Grade, action:string) {
    var name = grade.name ?? "Grade"

    name += " " + this.makeReadableGrade(grade)



    if (action == "delete") {
      var delref = this.dialog.open(DeleteDialog, {data: {value: "grade: '" + name + "'"}})

      delref.afterClosed().subscribe((res) => {
        if (res == true) {
          this.storage.deleteGrade(grade.id)
        }
      })
    }

    if (action == "edit") {
      var editRef = this._bottomSheet.open(AddGradeSheet, {disableClose: true, data: {grade: grade}})

      editRef.afterDismissed().subscribe((res) => {
        if (res != "" && res) {
          this.storage.renameGrade(grade.id,res)
        }
      })
    }
  }


}
