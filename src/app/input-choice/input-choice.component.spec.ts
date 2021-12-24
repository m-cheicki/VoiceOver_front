import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputChoiceComponent } from './input-choice.component';

describe('InputChoiceComponent', () => {
  let component: InputChoiceComponent;
  let fixture: ComponentFixture<InputChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
