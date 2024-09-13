import { Component, OnInit, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionComponent } from '../question/question.component';
import { QuestionBase } from '../core/models/question-base';
import { QuestionControlService } from '../core/services/question-control.service';
import { FormService } from '../core/services/form.service';
import {
  debounceTime,
  distinctUntilChanged,
  firstValueFrom,
  Subject,
} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SelectTextDirective } from '../core/directives/select-text/select-text.directive';
import { AutoResizeTextareaDirective } from '../core/directives/auto-resize-textarea/auto-resize-textarea.directive';
import _ from 'lodash';
import { FormBase } from '../core/models/form-base';
import { OptionBase } from '../core/models/option-base';
import { ArrayHelper } from '../core/helpers/arrayhelper';

@Component({
  standalone: true,
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  providers: [QuestionControlService],
  imports: [
    CommonModule,
    QuestionComponent,
    ReactiveFormsModule,
    FormsModule,
    SelectTextDirective,
    AutoResizeTextareaDirective,
  ],
})
export class FormComponent implements OnInit {
  newQuestion: QuestionBase<string> = new QuestionBase({
    key: 'pergunta',
    label: '',
    options: [new OptionBase({ key: 'opcao1', label: '', order: 1 })],
    order: 1,
  });
  form: FormBase = new FormBase({
    key: 'fomularioSemTitulo',
    questions: [_.cloneDeep(this.newQuestion)],
    title: 'Formulário sem título',
    description: '',
  });
  formGroup!: FormGroup;
  keys: any = {};
  payLoad: string = '';
  loaded: boolean = false;
  isNew: boolean = false;
  editingKey: string = '';
  trackByKey: TrackByFunction<QuestionBase<string>> = ArrayHelper.trackByKey;

  private formChangeSubject = new Subject<FormBase>();

  constructor(
    private service: FormService,
    private qcs: QuestionControlService,
    private route: ActivatedRoute
  ) {}

  get isEditing(): boolean {
    return this.editingKey === this.form.key;
  }

  async initializeQuestions(id: string): Promise<void> {
    this.isNew = !id;

    if (!this.isNew) {
      const questions$ = this.service.getQuestions();
      this.form.questions = await firstValueFrom(questions$);
      this.editingKey = this.form.key;
    }

    this.formGroup = this.qcs.toFormGroup(this.form.questions);
  }

  async initializeForm(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      const formId = params['id'];
      await this.initializeQuestions(formId);
      this.loaded = true;
    });

    if (this.isNew)
      this.formChangeSubject
        .pipe(debounceTime(1000), distinctUntilChanged())
        .subscribe((updatedForm) => {
          this.autoSave(updatedForm);
        });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  autoSave(form: FormBase): void {
    console.log('Salvando automaticamente...', form);
    // Chame aqui o serviço para salvar os dados via API
  }

  edit(key: string): void {
    this.editingKey = key;
  }

  onFormChange(): void {
    this.form = _.cloneDeep(this.form);
    this.formChangeSubject.next(this.form);
  }

  addQuestion(question: QuestionBase<string>, isDupe: boolean): void {
    const newQuestion = this.form.addQuestion(question, isDupe);
    this.edit(newQuestion.key);
    this.onFormChange();
  }

  removeQuestion(key: string): void {
    const index = this.form.questions.findIndex(
      (question) => question.key === key
    );
    this.form.questions.splice(index, 1);
    this.onFormChange();
  }

  onSubmit(): void {
    // this.payLoad = JSON.stringify(this.form.getRawValue());
    console.log(this.form.questions);
  }
}
