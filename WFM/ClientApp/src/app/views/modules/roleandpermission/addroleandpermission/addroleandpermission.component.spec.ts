import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddroleandpermissionComponent } from './addroleandpermission.component';

describe('AddroleandpermissionComponent', () => {
  let component: AddroleandpermissionComponent;
  let fixture: ComponentFixture<AddroleandpermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddroleandpermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddroleandpermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
