import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGradeSheet } from './add-grade-sheet';

describe('AddGradeSheet', () => {
  let component: AddGradeSheet;
  let fixture: ComponentFixture<AddGradeSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddGradeSheet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGradeSheet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
