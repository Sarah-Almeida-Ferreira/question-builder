import { Injectable } from '@angular/core';
import { DropdownQuestion } from '../models/dropdown-question';
import { QuestionBase } from '../models/question-base';
import { TextboxQuestion } from '../models/textbox-question';
import { of } from 'rxjs';
import { RadioQuestion } from '../models/radio-question';
import { CheckboxQuestion } from '../models/checkbox-question';
import { FormBase } from '../models/form-base';
import { OptionBase } from '../models/option-base';
@Injectable()
export class FormService {
  create(form: FormBase) {
    console.log(form);
  }

  getQuestions() {
    const questions: QuestionBase<string>[] = [
      new DropdownQuestion({
        key: 'favoriteAnimal',
        label: 'Favorite Animal',
        options: [
          new OptionBase({ key: 'cat', label: 'Cat', order: 1 }),
          new OptionBase({ key: 'dog', label: 'Dog', order: 2 }),
          new OptionBase({ key: 'horse', label: 'Horse', order: 3 }),
          new OptionBase({ key: 'capybara', label: 'Capybara', order: 4 }),
        ],
        order: 3,
      }),
      new RadioQuestion({
        key: 'gender',
        label: 'Gender',
        options: [
          new OptionBase({ key: 'male', label: 'Male', order: 1 }),
          new OptionBase({ key: 'female', label: 'Female', order: 2 }),
          new OptionBase({ key: 'other', label: 'Other', order: 3 }),
        ],
        order: 4,
      }),
      new CheckboxQuestion({
        key: 'test',
        label: 'test',
        options: [
          new OptionBase({ key: 'abdjs', label: 'Abdjs', order: 1 }),
          new OptionBase({ key: 'dajksdn', label: 'Dajksdn', order: 2 }),
          new OptionBase({ key: 'ahdisb', label: 'Ahdisb', order: 3 }),
        ],
        order: 4,
      }),
      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Alex',
        required: true,
        order: 1,
      }),
      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2,
      }),
    ];
    return of(questions.sort((a, b) => a.order - b.order));
  }
}
