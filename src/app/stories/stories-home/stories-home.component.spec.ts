import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesHomeComponent } from './stories-home.component';

describe('StoriesHomeComponent', () => {
  let component: StoriesHomeComponent;
  let fixture: ComponentFixture<StoriesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoriesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
