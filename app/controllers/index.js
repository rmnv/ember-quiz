import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class IndexController extends Controller {
  @service router;

  get hasResults() {
    const results = JSON.parse(localStorage.getItem('quizResults') || '{}');
    return !!results.score;
  }

  get isHomePage() {
    return this.router.currentRouteName === 'index';
  }
} 