import _ from "lodash";
import { StringHelper } from "../helpers/string.helper";

interface IOptionBase {
  key: string;
  label: string;
  order: number;
  isOther?: boolean;
}

export class OptionBase {
  key: string;
  label: string;
  order: number;
  isOther?: boolean = false;

  constructor(options: IOptionBase) {
    this.label = options.label;
    this.key = options.key;
    this.order = options.order;
    this.isOther = !!options.isOther;
  }

  get sanitizedKey(): string {
    return _.capitalize(StringHelper.sanitize(this.label));
  }

  updateKey(questionKey: string) {
    this.key = questionKey + this.sanitizedKey;
  }
}
