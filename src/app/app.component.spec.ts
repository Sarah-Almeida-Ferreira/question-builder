import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { QuestionService } from './core/services/question.service';
import { QuestionBase } from './core/models/question-base';
import { FormComponent } from './form/form.component';
import { AsyncPipe } from '@angular/common';

class MockQuestionService {
  getQuestions() {
    const questions: QuestionBase<any>[] = [
      new QuestionBase({ key: 'name', label: 'Name', controlType: 'textbox' })
    ];
    return of(questions);
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let service: QuestionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent, AppComponent],
      providers: [
        { provide: QuestionService, useClass: MockQuestionService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(QuestionService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have questions$ as an observable', () => {
    component.questions$.subscribe((questions) => {
      expect(questions.length).toBeGreaterThan(0);
      expect(questions[0].key).toBe('firstName');
    });
  });

  it('should render the form component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-form')).not.toBeNull();
  });
});
