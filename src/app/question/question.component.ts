import { Component, Input } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuestionBase } from '../core/models/question-base';
@Component({
  standalone: true,
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
  imports: [CommonModule, ReactiveFormsModule],
})
export class QuestionComponent {
  @Input() question!: QuestionBase<string>;
  @Input() form!: FormGroup;
  @Input() isNew!: boolean;

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }
}
