import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class QuizController extends Controller {
  quiz = {
    question: 'Какой метод HTTP используется для создания ресурса?',
    options: [
      { text: 'GET', value: 'get' },
      { text: 'POST', value: 'post' },
      { text: 'PUT', value: 'put' },
      { text: 'DELETE', value: 'delete' }
    ],
    correctAnswer: 'post'
  };

  @tracked selectedAnswer = null;
  @tracked isSubmitted = false;
  @tracked isCorrect = false;

  @action
  setAnswer(value) {
    this.selectedAnswer = value;
  }

  @action
  checkAnswer(e) {
    e.preventDefault();
    if (!this.selectedAnswer) return;

    this.isCorrect = this.selectedAnswer === this.quiz.correctAnswer;
    this.isSubmitted = true;
    this.resultMessage = this.isCorrect
      ? 'Правильно!'
      : 'Неправильно, попробуйте ещё раз';
  }
}
