import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormComponent } from './form/form.component';
import { QuestionService } from './core/services/question.service';
import { QuestionBase } from './core/models/question-base';
import { Observable } from 'rxjs';
import { RouterOutlet } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [QuestionService],
  imports: [AsyncPipe, FormComponent, RouterOutlet],
})
export class AppComponent {
  questions$: Observable<QuestionBase<any>[]>;
  constructor(service: QuestionService) {
    this.questions$ = service.getQuestions();
  }
}
