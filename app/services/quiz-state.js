import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class QuizStateService extends Service {
  @tracked hasState = false;
  @tracked hasResults = false;

  constructor() {
    super(...arguments);
    this.checkState();
    this.checkResults();
  }

  checkState() {
    const state = JSON.parse(localStorage.getItem('quizState') || '{}');
    this.hasState =
      state.currentQuestionIndex !== undefined &&
      state.currentQuestionIndex >= 0;
  }

  checkResults() {
    const results = JSON.parse(localStorage.getItem('quizResults') || '{}');
    this.hasResults = !!results.score;
  }

  updateState() {
    this.checkState();
    this.checkResults();
  }

  clearState() {
    // Only clear quiz state, not results
    localStorage.removeItem('quizState');
    this.hasState = false;
    this.checkResults();
  }

  clearResults() {
    // Clear both quiz state and results
    localStorage.removeItem('quizState');
    localStorage.removeItem('quizResults');
    this.hasState = false;
    this.hasResults = false;
  }
}
