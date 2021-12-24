import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerInputComponent } from './computer-input.component';

describe('ComputerInputComponent', () => {
  let component: ComputerInputComponent;
  let fixture: ComponentFixture<ComputerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputerInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
