import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorTreeComponent } from './behavior-tree.component';

describe('BehaviorTreeComponent', () => {
  let component: BehaviorTreeComponent;
  let fixture: ComponentFixture<BehaviorTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BehaviorTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BehaviorTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
