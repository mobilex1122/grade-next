import { Component, Inject, inject } from '@angular/core';
import { GradeSheetResult } from '../../home-screen/grade-sheet/grade-sheet';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-select-grade-sheet',
  standalone: false,
  templateUrl: './select-grade-sheet.html',
  styleUrl: './select-grade-sheet.scss'
})
export class SelectGradeSheet {
    constructor(
      @Inject(MAT_BOTTOM_SHEET_DATA) public data: {id: number, name: string, dialog: MatDialog},
    ) {}

    private _bottomSheetRef =
      inject<MatBottomSheetRef<SelectGradeSheet>>(MatBottomSheetRef);

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
