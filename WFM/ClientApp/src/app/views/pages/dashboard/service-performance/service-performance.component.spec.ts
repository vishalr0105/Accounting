import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePerformanceComponent } from './service-performance.component';

describe('ServicePerformanceComponent', () => {
  let component: ServicePerformanceComponent;
  let fixture: ComponentFixture<ServicePerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicePerformanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicePerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
