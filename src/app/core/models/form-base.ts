import { FormGroup } from '@angular/forms';

export class FormBase {
  title: string;
  form!: FormGroup;
  constructor(
    options: {
      title: string;
      form: FormGroup;
    } = { title: '', form: new FormGroup({}) }
  ) {
    this.title = options.title;
    this.form = options.form;
  }
}
