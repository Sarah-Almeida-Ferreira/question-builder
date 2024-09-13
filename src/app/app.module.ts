import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { SelectTextDirective } from './core/directives/select-text/select-text.directive';
import { OptionComponent } from './option/option.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    OptionComponent,
    QuestionComponent,
    SelectTextDirective,
    FormComponent,
  ],
  imports: [CommonModule, FormsModule],
})
export class AppModule {}
