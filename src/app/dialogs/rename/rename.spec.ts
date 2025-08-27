import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rename } from './rename';

describe('Rename', () => {
  let component: Rename;
  let fixture: ComponentFixture<Rename>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rename]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rename);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
