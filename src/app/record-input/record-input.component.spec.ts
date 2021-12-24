import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordInputComponent } from './record-input.component';

describe('RecordInputComponent', () => {
  let component: RecordInputComponent;
  let fixture: ComponentFixture<RecordInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
