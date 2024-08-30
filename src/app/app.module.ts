import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ResponseComponent } from './response/response.component';
import { QuestionComponent } from './question/question.component';

@NgModule({
  declarations: [AppComponent, QuestionComponent, ResponseComponent],
  imports: [CommonModule, FormsModule],
})
export class AppModule {}
