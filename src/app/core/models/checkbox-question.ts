import { ControlTypes } from '../enums/control-types';
import { QuestionBase } from './question-base';
export class CheckboxQuestion extends QuestionBase<string> {
  override controlType = ControlTypes.CHECKBOX;
}
