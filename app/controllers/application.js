import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @service router;
  @service quizState;

  get hasResults() {
    return this.quizState.hasResults;
  }

  get hasState() {
    return this.quizState.hasState;
  }

  @action
  resetResults() {
    // Clear all state using the service
    this.quizState.clearResults();

    // Force a page reload to ensure all state is cleared
    window.location.href = '/';
  }
}
