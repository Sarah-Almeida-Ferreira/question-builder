import { ControlTypes } from './../core/enums/control-types';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OptionBase } from '../core/models/option-base';
import { SelectTextDirective } from '../core/directives/select-text/select-text.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [FormsModule, SelectTextDirective, CommonModule],
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss',
})
export class OptionComponent {
  controlTypes = ControlTypes;
  controlTypesKeys = Object.keys(ControlTypes) as Array<
    keyof typeof ControlTypes
  >;

  @Input() lastIndex!: number;
  @Input() controlType!: string;
  @Input() showAddOther?: boolean;
  @Input() isUnique?: boolean;
  @Input() option?: OptionBase;
  @Input() order?: number;
  @Input() isEditing?: boolean;

  @Output() add = new EventEmitter<OptionBase>();
  @Output() remove = new EventEmitter<string>();

  get isDropdown(): boolean {
    return this.controlType === ControlTypes.DROPDOWN;
  }

  get isInput(): boolean {
    return (
      this.controlType === ControlTypes.INPUT ||
      this.controlType === ControlTypes.TEXT_BOX
    );
  }

  get showRemoveButton():boolean {
    return !!this.isEditing && !this.isUnique;
  }

  get isOther(): boolean {
    return this.option?.isOther!;
  }

  get inputType(): string {
    const showInput =
      this.controlType === this.controlTypes.CHECKBOX ||
      this.controlType === this.controlTypes.RADIO;
    const inputType = this.controlTypesKeys.find(
      (key) => ControlTypes[key] === this.controlType
    );
    return !!showInput && !!inputType ? inputType : '';
  }

  get labelPlaceholder(): string {
    const prefix = 'Texto de resposta ';
    const suffix = this.controlType === ControlTypes.INPUT ? 'curta' : 'longa';
    return this.isInput ? prefix + suffix : '';
  }

  get defaultLabel(): string {
    const order = this.order || this.option?.order;
    const label = this.isOther ? 'Outros...' : 'Opção ' + order;
    return this.isInput ? '' : label;
  }

  onAdd(addOthers: boolean) {
    if (!this.order) return;
    const label = addOthers ? 'Outros...' : this.defaultLabel;
    const newOption = new OptionBase({
      isOther: addOthers,
      label,
      order: this.order,
      key: '',
    });
    this.add.emit(newOption);
  }

  onRemove() {
    this.remove.emit(this.option?.key);
  }

  updateLabel() {
    if (!!this.option) {
      if (this.isInput) this.option.isOther = false;
      this.option.label = this.defaultLabel;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const controlTypeChange = changes['controlType'];
    if (!!controlTypeChange && !controlTypeChange.isFirstChange()) {
      this.updateLabel();
    }
  }
}
