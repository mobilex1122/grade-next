import { Component, inject, model, ModelSignal } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { State } from '../../state';


export interface RenameDialogData {
  value: string;
}

@Component({
  selector: 'app-rename-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './rename.html',
  styleUrl: './rename.scss'
})
export class RenameDialog {
  readonly dialogRef = inject(MatDialogRef<RenameDialogData>);
  readonly data = inject<RenameDialog>(MAT_DIALOG_DATA);
  readonly value: any = model(this.data.value);
  readonly valuestat = this.data.value;

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
