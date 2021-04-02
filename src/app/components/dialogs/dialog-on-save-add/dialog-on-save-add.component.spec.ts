import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOnSaveAddComponent } from './dialog-on-save-add.component';

describe('DialogOnSaveAddComponent', () => {
  let component: DialogOnSaveAddComponent;
  let fixture: ComponentFixture<DialogOnSaveAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOnSaveAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOnSaveAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
