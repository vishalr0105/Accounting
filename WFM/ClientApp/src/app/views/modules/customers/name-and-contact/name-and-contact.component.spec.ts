import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameAndContactComponent } from './name-and-contact.component';

describe('NameAndContactComponent', () => {
  let component: NameAndContactComponent;
  let fixture: ComponentFixture<NameAndContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameAndContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameAndContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
