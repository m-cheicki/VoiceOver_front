import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeURLInputComponent } from './youtube-url-input.component';

describe('YoutubeURLInputComponent', () => {
  let component: YoutubeURLInputComponent;
  let fixture: ComponentFixture<YoutubeURLInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoutubeURLInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeURLInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
