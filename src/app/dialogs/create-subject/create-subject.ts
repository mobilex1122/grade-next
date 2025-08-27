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
  selector: 'app-create-subject',
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
  templateUrl: './create-subject.html',
  styleUrl: './create-subject.scss'
})
export class CreateSubjectDialog {
  readonly dialogRef = inject(MatDialogRef);
  readonly data = inject<CreateSubjectDialog>(MAT_DIALOG_DATA);
  readonly value: any = model("");

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
