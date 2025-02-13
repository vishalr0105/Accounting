import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualLicenseSubtypeComponent } from './individual-license-subtype.component';

describe('IndividualLicenseSubtypeComponent', () => {
  let component: IndividualLicenseSubtypeComponent;
  let fixture: ComponentFixture<IndividualLicenseSubtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualLicenseSubtypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualLicenseSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
