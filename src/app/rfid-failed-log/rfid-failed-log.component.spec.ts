import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RFIDFailedLogComponent as RFIDFailedLogComponent } from './rfid-failed-log.component';

describe('RFIDLogEntryComponent', () => {
  let component: RFIDFailedLogComponent;
  let fixture: ComponentFixture<RFIDFailedLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RFIDFailedLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RFIDFailedLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
