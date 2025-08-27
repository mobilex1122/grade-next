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

  done() {
    this.settings.setKey("welcomeSeen", "true")
    this.dialogRef.close()
  }
}
