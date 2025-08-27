import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubjectButton } from './create-subject-button';

describe('CreateSubjectButton', () => {
  let component: CreateSubjectButton;
  let fixture: ComponentFixture<CreateSubjectButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSubjectButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSubjectButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
