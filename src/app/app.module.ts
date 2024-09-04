import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';

@NgModule({
  declarations: [AppComponent, QuestionComponent],
  imports: [CommonModule, FormsModule],
})
export class AppModule {}
