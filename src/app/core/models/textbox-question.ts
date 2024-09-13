import { ControlTypes } from '../enums/control-types';
import { QuestionBase } from './question-base';
export class TextboxQuestion extends QuestionBase<string> {
  override controlType = ControlTypes.TEXT_BOX;
}
