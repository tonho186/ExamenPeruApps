import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplejosFormComponent } from './complejos-form.component';

describe('ComplejosFormComponent', () => {
  let component: ComplejosFormComponent;
  let fixture: ComponentFixture<ComplejosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplejosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplejosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
