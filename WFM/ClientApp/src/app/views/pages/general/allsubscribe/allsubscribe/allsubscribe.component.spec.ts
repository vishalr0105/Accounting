import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AllSubscription } from './allsubscribe.components';


describe('BlankComponent', () => {
  let component: AllSubscription;
  let fixture: ComponentFixture<AllSubscription>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSubscription ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSubscription);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
