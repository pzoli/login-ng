import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RFIDLogEntryComponent as RFIDLogEntryComponent } from './rfid-log-entry.component';

describe('RFIDLogEntryComponent', () => {
  let component: RFIDLogEntryComponent;
  let fixture: ComponentFixture<RFIDLogEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RFIDLogEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RFIDLogEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
