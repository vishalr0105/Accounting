import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringPaymentNewComponent } from './recurring-payment-new.component';

describe('RecurringPaymentNewComponent', () => {
  let component: RecurringPaymentNewComponent;
  let fixture: ComponentFixture<RecurringPaymentNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecurringPaymentNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringPaymentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
