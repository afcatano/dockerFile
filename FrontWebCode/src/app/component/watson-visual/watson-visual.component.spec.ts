import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatsonVisualComponent } from './watson-visual.component';

describe('WatsonVisualComponent', () => {
  let component: WatsonVisualComponent;
  let fixture: ComponentFixture<WatsonVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatsonVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatsonVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
