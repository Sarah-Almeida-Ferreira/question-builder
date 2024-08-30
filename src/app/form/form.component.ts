import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionComponent } from '../question/question.component';
import { QuestionBase } from '../core/models/question-base';
import { QuestionControlService } from '../core/services/question-control.service';
@Component({
  standalone: true,
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  providers: [QuestionControlService],
  imports: [CommonModule, QuestionComponent, ReactiveFormsModule],
})
export class FormComponent implements OnInit {
  @Input() title: string = '';
  @Input() questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';
  constructor(private qcs: QuestionControlService) {}
  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
  }
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
