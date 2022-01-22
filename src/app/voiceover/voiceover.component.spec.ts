import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceoverComponent } from './voiceover.component';

describe('VoiceoverComponent', () => {
  let component: VoiceoverComponent;
  let fixture: ComponentFixture<VoiceoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoiceoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
