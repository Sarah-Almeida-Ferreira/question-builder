import { ToggleSwitchComponent } from './../core/components/toggle-switch/toggle-switch.component';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  TrackByFunction,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuestionBase } from '../core/models/question-base';
import { DropdownQuestionComponent } from '../dropdown-question/dropdown-question.component';
import { ControlTypes } from '../core/enums/control-types';
import { OptionComponent } from '../option/option.component';
import { SelectTextDirective } from '../core/directives/select-text/select-text.directive';
import { OptionBase } from '../core/models/option-base';
import { AutoResizeTextareaDirective } from '../core/directives/auto-resize-textarea/auto-resize-textarea.directive';
import { ArrayHelper } from '../core/helpers/arrayhelper';
import _ from 'lodash';

@Component({
  standalone: true,
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownQuestionComponent,
    FormsModule,
    OptionComponent,
    SelectTextDirective,
    AutoResizeTextareaDirective,
    ToggleSwitchComponent,
  ],
})
export class QuestionComponent {
  controlTypes = ControlTypes;
  controlTypesValues = Object.values(ControlTypes);
  trackByKey: TrackByFunction<OptionBase> = ArrayHelper.trackByKey;

  @Input() question!: QuestionBase<string>;
  @Input() form!: FormGroup;
  @Input() isNew!: boolean;
  @Input() editingKey!: string;

  @Output() duplicate = new EventEmitter<QuestionBase<string>>();
  @Output() remove = new EventEmitter<string>();
  @Output() change = new EventEmitter<QuestionBase<string>>();
  @Output() edit = new EventEmitter<string>();

  get isEditing(): boolean {
    return this.editingKey === this.question.key;
  }

  get isInputOrTextbox(): boolean {
    return [ControlTypes.INPUT, ControlTypes.TEXT_BOX].includes(
      this.question.controlType
    );
  }

  get isDropdown(): boolean {
    return this.question.controlType === ControlTypes.DROPDOWN;
  }

  get hasOtherOption(): boolean {
    return this.question.options.some((option) => option.isOther);
  }

  get hasSingleOption(): boolean {
    return this.question.options.length === 1;
  }

  get isValid(): boolean {
    return this.form.controls[this.question.key]?.valid ?? false;
  }

  get newOptionIndex(): number {
    return this.question.options.length + 1;
  }

  get showAddOther(): boolean {
    return !this.isInputOrTextbox && !this.isDropdown && !this.hasOtherOption;
  }

  get showAddQuestion(): boolean {
    return !this.isInputOrTextbox && this.isEditing;
  }

  updateOptions(): void {
    this.question.updateOrdering();
    setTimeout(() => this.focusOnLastOption(), 150);
  }

  addOption(option: OptionBase): void {
    this.question.addOption(option);
    this.updateOptions();
  }

  removeOption(key: string): void {
    this.question.removeOption(key);
    this.updateOptions();
  }

  clearOptions(): void {
    if (this.isInputOrTextbox) {
      this.question.options.splice(1);
    } else if (this.isDropdown) {
      this.question.options = this.question.options.filter(
        (opt) => !opt.isOther
      );
    }
  }

  focusOnLastOption(): void {
    const optionsWithoutOther = this.question.options.filter(
      (opt) => !opt.isOther
    );
    const lastOption = optionsWithoutOther.find(
      (opt) => opt.order === optionsWithoutOther.length
    );

    if (lastOption) {
      document.getElementById(lastOption.key)?.focus();
    }
  }

  onClick(): void {
    this.edit.emit(this.question.key);
  }

  onChange(): void {
    this.change.emit(this.question);
  }

  onDuplicate(): void {
    this.duplicate.emit(this.question);
  }

  onRemove(): void {
    this.remove.emit(this.question.key);
  }
}
