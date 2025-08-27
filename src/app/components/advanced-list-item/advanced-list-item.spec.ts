import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedListItem } from './advanced-list-item';

describe('AdvancedListItem', () => {
  let component: AdvancedListItem;
  let fixture: ComponentFixture<AdvancedListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedListItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
