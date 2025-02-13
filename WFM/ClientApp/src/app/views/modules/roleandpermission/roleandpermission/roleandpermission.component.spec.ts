import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleandpermissionComponent } from './roleandpermission.component';

describe('RoleandpermissionComponent', () => {
  let component: RoleandpermissionComponent;
  let fixture: ComponentFixture<RoleandpermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleandpermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleandpermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
