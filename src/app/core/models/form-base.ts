import { QuestionBase } from './question-base';

interface IFormBase {
  key: string;
  title: string;
  description: string;
  questions: QuestionBase<string>[];
}

export class FormBase {
  key!: string;
  title!: string;
  description?: string;
  questions!: QuestionBase<string>[];

  constructor(options: IFormBase) {
    Object.assign(this, options);
  }

  updateOrdering(): void {
    this.questions.map((question, index) => (question.order = index + 1));
  }

  updateKeys(): void {
    this.questions.forEach((question) => {
      const isDupe = this.questions.some((item) => item.key === question.key);
      const newKey = question.sanitizedKey + question.order;
      question.key = isDupe ? newKey : question.sanitizedKey;
      question.options.forEach((option) => option.updateKey(question.key));
    });
  }

  addQuestion(
    question: QuestionBase<string>,
    isDupe: boolean
  ): QuestionBase<string> {
    const index = isDupe ? question.order : this.questions.length;
    const order = index + 1;
    const newQuestion = new QuestionBase({
      ...question,
      order,
    });
    this.questions.splice(index, 0, newQuestion);
    this.updateOrdering();
    this.updateKeys();

    return newQuestion;
  }
}
