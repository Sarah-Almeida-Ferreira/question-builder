import { ControlTypes } from '../enums/control-types';
import { QuestionBase } from './question-base';
export class RadioQuestion extends QuestionBase<string> {
  override controlType = ControlTypes.RADIO;
}
