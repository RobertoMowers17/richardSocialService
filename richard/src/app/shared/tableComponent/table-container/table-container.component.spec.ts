import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableContainerComponent } from './table-container.component';

describe('TableContainerComponent', () => {
  let component: TableContainerComponent;
  let fixture: ComponentFixture<TableContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
