export class OptionBase {
  key: string;
  value: string;
  checked?: boolean;

  constructor(
    options: {
      key?: string;
      value?: string;
      checked?: boolean;
    } = {}
  ) {
    this.value = options.value || '';
    this.key = options.key || '';
    this.checked = options.checked || false;
  }
}
