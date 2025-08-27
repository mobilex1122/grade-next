import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Settings, SettingsService } from '../../settings-service';

@Component({
  selector: 'app-welcome-screen',
  standalone: false,
  templateUrl: './welcome-screen.html',
  styleUrl: './welcome-screen.scss'
})
export class WelcomeScreen {
  public readonly dialogRef = inject(MatDialogRef);
  constructor(private settings:SettingsService) {}

  stepImages = [
    "assets/welcome/welcome.gif",
    "assets/welcome/weights.gif",
    "assets/welcome/add-subject.gif",
    "assets/welcome/theme.gif",
    "assets/welcome/done.gif"
  ]

  done() {
    this.settings.setKey("welcomeSeen", "true")
    this.dialogRef.close()
  }

  getStepImage(step:number) {
    if (step >= 0 && step < this.stepImages.length) {
      return this.stepImages[step]
    }
    return ""
  }
}
