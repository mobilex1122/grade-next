import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGrade } from './create-grade';

describe('CreateGrade', () => {
  let component: CreateGrade;
  let fixture: ComponentFixture<CreateGrade>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGrade]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGrade);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
