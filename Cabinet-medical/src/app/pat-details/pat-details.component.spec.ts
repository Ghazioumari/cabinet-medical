import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatDetailsComponent } from './pat-details.component';

describe('PatDetailsComponent', () => {
  let component: PatDetailsComponent;
  let fixture: ComponentFixture<PatDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
