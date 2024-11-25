import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCtegoryComponent } from './sub-ctegory.component';

describe('SubCtegoryComponent', () => {
  let component: SubCtegoryComponent;
  let fixture: ComponentFixture<SubCtegoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCtegoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCtegoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
