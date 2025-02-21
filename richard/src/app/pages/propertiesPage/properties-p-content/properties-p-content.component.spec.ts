import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesPContentComponent } from './properties-p-content.component';

describe('PropertiesPContentComponent', () => {
  let component: PropertiesPContentComponent;
  let fixture: ComponentFixture<PropertiesPContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesPContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertiesPContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
