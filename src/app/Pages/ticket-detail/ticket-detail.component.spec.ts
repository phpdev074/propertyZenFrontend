import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDEtailComponent } from './ticket-detail.component';

describe('TicketDEtailComponent', () => {
  let component: TicketDEtailComponent;
  let fixture: ComponentFixture<TicketDEtailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketDEtailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketDEtailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
