import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionControlService } from '../core/services/question-control.service';
import { QuestionBase } from '../core/models/question-base';
import { FormService } from '../core/services/form.service';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormComponent],
      providers: [
        FormService,
        QuestionControlService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    component.questions = [
      new QuestionBase<string>({
        key: 'name',
        label: 'Name',
        value: 'John Doe',
        required: true,
        order: 1,
        controlType: 'textbox',
      }),
    ];
    fixture.detectChanges();
  });

  it('should create the form with the given questions', () => {
    expect(component).toBeTruthy();
    expect(component.form?.contains('name')).toBeTruthy();
    expect(component.form?.get('name')?.value).toBe('John Doe');
  });

  it('should display the title', () => {
    component.title = 'Test Form';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Test Form');
  });

  it('should generate payload on submit', () => {
    component.onSubmit();
    expect(component.payLoad).toBe(JSON.stringify({ name: 'John Doe' }));
  });
});
