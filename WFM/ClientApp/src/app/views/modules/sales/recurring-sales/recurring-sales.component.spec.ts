import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringSalesComponent } from './recurring-sales.component';

describe('RecurringSalesComponent', () => {
  let component: RecurringSalesComponent;
  let fixture: ComponentFixture<RecurringSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecurringSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
