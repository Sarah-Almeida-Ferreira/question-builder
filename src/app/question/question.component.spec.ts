import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionComponent } from './question.component';
import { FormControl, FormGroup } from '@angular/forms';
import { QuestionBase } from '../core/models/question-base';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;

    component.question = new QuestionBase({
      key: 'firstName',
      label: 'First name',
      value: 'Alex',
      required: true,
      order: 1,
    });
    component.form = new FormGroup({
      firstName: new FormControl(''),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
