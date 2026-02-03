import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RFIDCardComponent as RFIDCardComponent } from './rfid-card.component';

describe('RFIDCardComponent', () => {
  let component: RFIDCardComponent;
  let fixture: ComponentFixture<RFIDCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RFIDCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RFIDCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
