import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCtegoryaddEditComponent } from './sub-ctegoryadd-edit.component';

describe('SubCtegoryaddEditComponent', () => {
  let component: SubCtegoryaddEditComponent;
  let fixture: ComponentFixture<SubCtegoryaddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCtegoryaddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCtegoryaddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
