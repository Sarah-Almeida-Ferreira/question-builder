import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionComponent } from '../question/question.component';
import { QuestionBase } from '../core/models/question-base';
import { QuestionControlService } from '../core/services/question-control.service';
import { QuestionService } from '../core/services/question.service';
import { firstValueFrom } from 'rxjs';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  providers: [QuestionControlService],
  imports: [CommonModule, QuestionComponent, ReactiveFormsModule],
})
export class FormComponent implements OnInit {
  questions: QuestionBase<string>[] = [new QuestionBase()];
  form!: FormGroup;
  title: string = '';
  payLoad = '';
  loaded = false;
  isNew = false;

  constructor(
    private service: QuestionService,
    private qcs: QuestionControlService,
    private route: ActivatedRoute
  ) {}

  async initializeQuestions(id: string) {
    if (!!id) {
      const questions = this.service.getQuestions();
      this.questions = await firstValueFrom(questions);
    } else {
      this.isNew = true;
    }
    this.form = this.qcs.toFormGroup(this.questions);
  }

  async initializeForm() {
    this.route.params.subscribe(async (params) => {
      const formId = params['id'];
      await this.initializeQuestions(formId);
      this.loaded = true;
    });
  }

  async ngOnInit() {
    this.initializeForm();
  }
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
