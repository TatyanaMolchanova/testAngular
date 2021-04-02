import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOnSaveEditComponent } from './dialog-on-save-edit.component';

describe('DialogOnSaveEditComponent', () => {
  let component: DialogOnSaveEditComponent;
  let fixture: ComponentFixture<DialogOnSaveEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOnSaveEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOnSaveEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
