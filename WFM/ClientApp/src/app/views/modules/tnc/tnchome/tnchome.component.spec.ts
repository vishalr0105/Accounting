import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TnchomeComponent } from './tnchome.component';

describe('TnchomeComponent', () => {
  let component: TnchomeComponent;
  let fixture: ComponentFixture<TnchomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TnchomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TnchomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
