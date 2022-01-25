import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoicecloningComponent } from './voicecloning.component';

describe('VoicecloningComponent', () => {
  let component: VoicecloningComponent;
  let fixture: ComponentFixture<VoicecloningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoicecloningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoicecloningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
