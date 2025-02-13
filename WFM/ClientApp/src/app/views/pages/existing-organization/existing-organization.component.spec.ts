import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingOrganizationComponent } from './existing-organization.component';

describe('ExistingOrganizationComponent', () => {
  let component: ExistingOrganizationComponent;
  let fixture: ComponentFixture<ExistingOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingOrganizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistingOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
