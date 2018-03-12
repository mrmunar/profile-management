import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterToogleComponent } from './filter-toogle.component';

describe('FilterToogleComponent', () => {
  let component: FilterToogleComponent;
  let fixture: ComponentFixture<FilterToogleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterToogleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterToogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
