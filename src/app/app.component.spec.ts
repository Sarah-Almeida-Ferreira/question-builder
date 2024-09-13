import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { FormService } from './core/services/form.service';
import { QuestionBase } from './core/models/question-base';
import { FormComponent } from './form/form.component';
import { AsyncPipe } from '@angular/common';

class MockFormService {
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
  let service: FormService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent, AppComponent],
      providers: [
        { provide: FormService, useClass: MockFormService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(FormService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the form component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-form')).not.toBeNull();
  });
});
