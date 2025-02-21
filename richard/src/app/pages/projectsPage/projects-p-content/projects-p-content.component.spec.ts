import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsPContentComponent } from './projects-p-content.component';

describe('ProjectsPContentComponent', () => {
  let component: ProjectsPContentComponent;
  let fixture: ComponentFixture<ProjectsPContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsPContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsPContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
