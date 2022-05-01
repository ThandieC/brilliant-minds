import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationsEditComponent } from './creations-edit.component';

describe('CreationsEditComponent', () => {
  let component: CreationsEditComponent;
  let fixture: ComponentFixture<CreationsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
