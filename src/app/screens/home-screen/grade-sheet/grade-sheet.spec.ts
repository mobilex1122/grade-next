import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeSheet } from './grade-sheet';

describe('GradeSheet', () => {
  let component: GradeSheet;
  let fixture: ComponentFixture<GradeSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GradeSheet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeSheet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
