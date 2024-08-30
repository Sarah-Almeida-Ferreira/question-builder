import { Injectable } from '@angular/core';
import { DropdownQuestion } from '../models/dropdown-question';
import { QuestionBase } from '../models/question-base';
import { TextboxQuestion } from '../models/textbox-question';
import { of } from 'rxjs';
import { RadioQuestion } from '../models/radio-question';
import { CheckboxQuestion } from '../models/checkbox-question';
@Injectable()
export class QuestionService {
  getQuestions() {
    const questions: QuestionBase<string>[] = [
      new DropdownQuestion({
        key: 'favoriteAnimal',
        label: 'Favorite Animal',
        options: [
          { key: 'cat', value: 'Cat' },
          { key: 'dog', value: 'Dog' },
          { key: 'horse', value: 'Horse' },
          { key: 'capybara', value: 'Capybara' },
        ],
        order: 3,
      }),
      new RadioQuestion({
        key: 'gender',
        label: 'Gender',
        options: [
          { key: 'male', value: 'Male' },
          { key: 'female', value: 'Female' },
          { key: 'other', value: 'Other' },
        ],
        order: 4,
      }),
      new CheckboxQuestion({
        key: 'test',
        label: 'test',
        options: [
          { key: 'abdjs', value: 'Abdjs' },
          { key: 'dajksdn', value: 'Dajksdn' },
          { key: 'ahdisb', value: 'Ahdisb' },
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
