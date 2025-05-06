import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @service router;
  @service quizState;

  get hasResults() {
    const results = JSON.parse(localStorage.getItem('quizResults') || '{}');
    return !!results.score;
  }

  get hasState() {
    return this.quizState.hasState;
  }

  get isHomePage() {
    return this.router.currentRouteName === 'index';
  }

  get buttonText() {
    return this.hasState || this.hasResults ? 'Resume' : 'Ready?';
  }

  @action
  startQuiz(event) {
    // If we have results, clear everything and start fresh
    if (this.hasResults) {
      this.quizState.clearState();
    }
    // If we don't have state, let the LinkTo handle navigation
    if (!this.hasState) {
      return true;
    }
    // If we have state, prevent default navigation and handle it ourselves
    event.preventDefault();
    this.router.transitionTo('quiz');
  }
} 