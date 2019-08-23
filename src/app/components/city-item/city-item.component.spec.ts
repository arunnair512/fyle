import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityListItemComponent } from './city-list-item.component';

describe('CityListItemComponent', () => {
  let component: CityListItemComponent;
  let fixture: ComponentFixture<CityListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
