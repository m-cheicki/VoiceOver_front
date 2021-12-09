import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCardsComponent } from './card.component';

describe('InputCardsComponent', () => {
  let component: InputCardsComponent;
  let fixture: ComponentFixture<InputCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
