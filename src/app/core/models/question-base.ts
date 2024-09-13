import { ControlTypes } from '../enums/control-types';
import { StringHelper } from '../helpers/string.helper';
import { OptionBase } from './option-base';

interface IQuestionBase<T> {
  value?: T;
  key: string;
  label: string;
  required?: boolean;
  order: number;
  controlType?: ControlTypes;
  type?: string;
  options?: OptionBase[];
}

export class QuestionBase<T> {
  controlType: ControlTypes = ControlTypes.INPUT;
  required: boolean = false;
  type: string = 'text';
  value?: T;
  key!: string;
  label!: string;
  order!: number;
  options: OptionBase[];

  constructor(options: IQuestionBase<T>) {
    Object.assign(this, options);

    this.options = (options.options || []).map((opt) => {
      const option = new OptionBase(opt);
      option.updateKey(this.sanitizedKey);
      return option;
    });
  }

  get sanitizedKey(): string {
    return StringHelper.sanitize(this.label || this.defaultKey);
  }

  get defaultKey(): string {
    return 'pergunta';
  }

  addOption(option: OptionBase): void {
    option.updateKey(this.sanitizedKey);
    this.options.push(option);
  }

  removeOption(key: string): void {
    const index = this.options.findIndex((opt) => opt.key === key);
    if (index > -1) {
      this.options.splice(index, 1);
    }
  }

  moveOtherToEnd(): void {
    const otherOptionIndex = this.options.findIndex((option) => option.isOther);

    if (otherOptionIndex > -1) {
      const [otherOption] = this.options.splice(otherOptionIndex, 1);
      this.options.push(otherOption);
    }
  }

  updateOrdering(): void {
    this.moveOtherToEnd();
    this.options.forEach((opt, index) => {
      opt.order = index + 1;
    });
  }
}
