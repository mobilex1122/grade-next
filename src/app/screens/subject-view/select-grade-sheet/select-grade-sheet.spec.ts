import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGradeSheet } from './select-grade-sheet';

describe('SelectGradeSheet', () => {
  let component: SelectGradeSheet;
  let fixture: ComponentFixture<SelectGradeSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectGradeSheet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectGradeSheet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
