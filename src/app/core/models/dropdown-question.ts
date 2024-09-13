import { ControlTypes } from '../enums/control-types';
import { QuestionBase } from './question-base';
export class DropdownQuestion extends QuestionBase<string> {
  override controlType = ControlTypes.DROPDOWN;
}
