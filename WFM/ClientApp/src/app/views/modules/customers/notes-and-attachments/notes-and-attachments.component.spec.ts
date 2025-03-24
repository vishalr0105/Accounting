import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesAndAttachmentsComponent } from './notes-and-attachments.component';

describe('NotesAndAttachmentsComponent', () => {
  let component: NotesAndAttachmentsComponent;
  let fixture: ComponentFixture<NotesAndAttachmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesAndAttachmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesAndAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
