import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.scss',
})
export class ToggleSwitchComponent {
  @Input() value: boolean = false;
  @Input() id: string = 'switch';

  @Output() valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  test() {
    this.valueChange.emit(this.value);
  }
}
