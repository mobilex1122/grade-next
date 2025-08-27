import { Component, Inject, inject, Input } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { State } from '../../../state';

export const GradeSheetResult = {
  rename: "rename",
  open: "open",
  delete: "delete",
}

@Component({
  selector: 'app-grade-sheet',
  standalone: false,
  templateUrl: './grade-sheet.html',
  styleUrl: './grade-sheet.scss'
})
export class GradeSheet {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {id: number, name: string, dialog: MatDialog},
    private router:Router,
    private state:State
  ) { }
  private _bottomSheetRef =
    inject<MatBottomSheetRef<GradeSheet>>(MatBottomSheetRef);
  open(event: MouseEvent): void {
    this._bottomSheetRef.dismiss(GradeSheetResult.open);
    event.preventDefault();
  }

  rename(event: MouseEvent): void {

    this._bottomSheetRef.dismiss(GradeSheetResult.rename);
    event.preventDefault();
  }

  delete(event: MouseEvent): void {
    this._bottomSheetRef.dismiss(GradeSheetResult.delete);
    event.preventDefault();
  }
}
