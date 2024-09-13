import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dropdown-question.component.html',
  styleUrl: './dropdown-question.component.scss',
})
export class DropdownQuestionComponent {
  @Input() question: any;
  @Input() form: FormGroup = new FormGroup({});
  @Input() isNew: boolean = false;
  isOpen = false;
  selectedValue: string | null = null;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: any) {
    this.selectedValue = option.value;
    this.isOpen = false;
    this.form.get(this.question.key)?.setValue(option.key);
  }
}
