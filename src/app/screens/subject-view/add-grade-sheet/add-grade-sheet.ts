import { Component, inject, Inject, model, OnInit } from '@angular/core';
import { Grade, StorageService } from '../../../storage-service';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { formatDate, formatNumber } from '@angular/common';

@Component({
  selector: 'app-add-grade-sheet',
  standalone: false,
  templateUrl: './add-grade-sheet.html',
  styleUrl: './add-grade-sheet.scss'
})
export class AddGradeSheet implements OnInit {
  name = model("")
  grade = 1
  weight = 1
  incrementValue = 0.5

  editMode = false

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {subjectid?: number, grade?: Grade},
    private storage:StorageService
  ) {}

  private _bottomSheetRef =
    inject<MatBottomSheetRef<AddGradeSheet>>(MatBottomSheetRef);

  ngOnInit(): void {
    if (this.data.grade) {
      this.editMode  = true
      this.name.set(this.data.grade.name ?? "")
      this.grade = this.data.grade.grade
      this.weight = this.data.grade.weight
    }
  }

  gradeInput(event:Event) {
    var input = event.target as HTMLInputElement
    this.grade = 0
    this.grade = this.clampValue(this.formatNumber(input.value))
    input.value = formatNumber(this.grade, "en", "1.1-1")
  }

  modifyWeight(by:number) {
    this.weight = this.clampValue( this.weight + by);

  }

  modifyGrade(by:number) {
    this.grade = this.clampValue( this.grade + by);

  }

  clampValue(value:number):number {
    if (value <= 0) {
      return this.incrementValue
    }
    return value
  }

  weightInput(event:Event) {
    var input = event.target as HTMLInputElement
    this.weight = 0
    this.weight = this.clampValue(this.formatNumber(input.value))
    input.value = formatNumber(this.weight, "en", "1.1-1")
  }

  formatNumber(text:string): number {
    let value = text.replace(/[^0-9.]/g, '');

    // Convert to a number and format to 2 decimal places
    const numberValue = parseFloat(value);
    if (!isNaN(numberValue)) {
        return numberValue
    } else {
        return 0
    }
  }

  addGrade() {
    var name = null
    if (this.name().trim() != "") {
      name = this.name().trim() 
    } else {
      name = formatDate(Date.now(), "dd.MM", "en")
    }
    if (this.data.subjectid) {
      this.storage.addGrade(this.data.subjectid,this.grade,this.weight,name)
    } else if (this.data.grade) {
      this.storage.editGrade(this.data.grade.id,name,this.grade,this.weight)
      this._bottomSheetRef.dismiss()
    }

    this.grade = 1
    this.weight = 1
    this.name.set("")
  }

  close() {
    this._bottomSheetRef.dismiss()
  }
}
