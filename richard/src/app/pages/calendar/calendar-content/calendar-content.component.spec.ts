import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarContentComponent } from './calendar-content.component';

describe('CalendarContentComponent', () => {
  let component: CalendarContentComponent;
  let fixture: ComponentFixture<CalendarContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
