import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeScreen } from './home-screen';

describe('HomeScreen', () => {
  let component: HomeScreen;
  let fixture: ComponentFixture<HomeScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
