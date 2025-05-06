import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class QuizController extends Controller {
  @service router;

  @tracked currentQuestionIndex = 0;
  @tracked selectedAnswer = null;
  @tracked isSubmitted = false;
  @tracked isCorrect = false;
  @tracked score = 0;
  @tracked attempts = [];

  get questions() {
    return this.model;
  }

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  get progress() {
    return Math.round((this.currentQuestionIndex / this.questions.length) * 100);
  }

  get isLastQuestion() {
    return this.currentQuestionIndex === this.questions.length - 1;
  }

  getAnswerClass(option) {
    if (!this.isSubmitted) return '';

    const correctAnswer = this.currentQuestion.correctAnswer;

    if (option.value === correctAnswer) {
      return 'quiz__answer_correct';
    }

    if (option.value === this.selectedAnswer && option.value !== correctAnswer) {
      return 'quiz__answer_incorrect';
    }

    return '';
  }

  @action
  setAnswer(value) {
    this.selectedAnswer = value;
  }

  @action
  checkAnswer(e) {
    e.preventDefault();
    if (!this.selectedAnswer) return;

    this.isCorrect = this.selectedAnswer === this.currentQuestion.correctAnswer;
    this.isSubmitted = true;

    if (this.isCorrect) {
      this.score += 1;
    }

    const correctAnswerOption = this.currentQuestion.options.find(
      option => option.value.toLowerCase().trim() === this.currentQuestion.correctAnswer.toLowerCase().trim()
    );

    const userAnswerOption = this.currentQuestion.options.find(
      option => option.value.toLowerCase().trim() === this.selectedAnswer.toLowerCase().trim()
    );

    if (!correctAnswerOption || !userAnswerOption) {
      return;
    }

    const attempt = {
      questionId: this.currentQuestion.id,
      questionText: this.currentQuestion.text,
      userAnswer: userAnswerOption.text,
      correctAnswer: correctAnswerOption.text,
      isCorrect: this.isCorrect,
      timestamp: new Date()
    };

    this.attempts.push(attempt);
  }

  @action
  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex += 1;
      this.resetQuestionState();
    } else {
      this.router.transitionTo('results', {
        queryParams: {
          score: this.score,
          total: this.questions.length,
          attempts: JSON.stringify(this.attempts)
        }
      });
    }
  }

  @action
  resetQuestionState() {
    this.selectedAnswer = null;
    this.isSubmitted = false;
    this.isCorrect = false;
  }

  @action
  resetQuiz() {
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.isSubmitted = false;
    this.isCorrect = false;
    this.score = 0;
    this.attempts = [];
  }
}
