import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AminitiesAddEditComponent } from './aminities-add-edit.component';

describe('AminitiesAddEditComponent', () => {
  let component: AminitiesAddEditComponent;
  let fixture: ComponentFixture<AminitiesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AminitiesAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AminitiesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
