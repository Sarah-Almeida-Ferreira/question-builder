import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { QuestionBase } from '../models/question-base';
import { ControlTypes } from '../enums/control-types';

@Injectable()
export class QuestionControlService {
  toFormGroup(questions: QuestionBase<string>[]) {
    const group: any = {};

    questions.forEach((question) => {
      if (question.controlType === ControlTypes.CHECKBOX) {
        const array: any = [];
        const formArray = new FormArray(array);
        if (question.options) {
          question.options.forEach((option) => {
            formArray.push(new FormControl(option.key));
          });
        }
        group[question.key] = formArray;
      } else {
        group[question.key] = question.required
          ? new FormControl(question.value || '', Validators.required)
          : new FormControl(question.value || '');
      }
    });

    return new FormGroup(group);
  }
}
