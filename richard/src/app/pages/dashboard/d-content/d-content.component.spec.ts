import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DContentComponent } from './d-content.component';

describe('DContentComponent', () => {
  let component: DContentComponent;
  let fixture: ComponentFixture<DContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
