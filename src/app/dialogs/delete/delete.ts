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

@Component({
  selector: 'app-delete-dialog',
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
  templateUrl: './delete.html',
  styleUrl: './delete.scss'
})
export class DeleteDialog {
  readonly dialogRef = inject(MatDialogRef);
  readonly data = inject<DeleteDialog>(MAT_DIALOG_DATA);
  readonly value: any = model(this.data.value);
  readonly valuestat = this.data.value;
  
    constructor(private state:State) {}
  
    onNoClick(): void {
      this.dialogRef.close(false);
    }
  
    onDone() {

      this.dialogRef.close(true)
      
    }
}
