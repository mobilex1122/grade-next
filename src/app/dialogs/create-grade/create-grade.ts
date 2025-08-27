import { Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { State } from '../../state';

export type GradeCreateData = {
  id: number
}

@Component({
  selector: 'app-create-grade',
  imports: [],
  templateUrl: './create-grade.html',
  styleUrl: './create-grade.scss'
})
export class CreateGradeDialog {
  readonly dialogRef = inject(MatDialogRef);
  readonly data = inject<GradeCreateData>(MAT_DIALOG_DATA);
  readonly value: any = model(0);

  constructor(private state:State) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDone() {
    if (this.value() == "") {
      this.state.error("Name is Empty!")
    } else {
      this.dialogRef.close(this.value())
    }
  }
}
