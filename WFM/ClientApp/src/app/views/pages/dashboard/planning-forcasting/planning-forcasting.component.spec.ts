import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningForcastingComponent } from './planning-forcasting.component';

describe('PlanningForcastingComponent', () => {
  let component: PlanningForcastingComponent;
  let fixture: ComponentFixture<PlanningForcastingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningForcastingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningForcastingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
