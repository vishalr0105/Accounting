import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentedProgressBarComponent } from './segmented-progress-bar.component';

describe('SegmentedProgressBarComponent', () => {
  let component: SegmentedProgressBarComponent;
  let fixture: ComponentFixture<SegmentedProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmentedProgressBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegmentedProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
