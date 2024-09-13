import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormComponent } from './form/form.component';
import { FormService } from './core/services/form.service';
import { RouterOutlet } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [FormService],
  imports: [AsyncPipe, FormComponent, RouterOutlet],
})
export class AppComponent {
  constructor() {}
}
