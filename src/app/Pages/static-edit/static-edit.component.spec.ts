import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticEditComponent } from './static-edit.component';

describe('StaticEditComponent', () => {
  let component: StaticEditComponent;
  let fixture: ComponentFixture<StaticEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
