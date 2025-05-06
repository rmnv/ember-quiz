import Controller from '@ember/controller';

export default class IndexController extends Controller {
  get hasResults() {
    const results = JSON.parse(localStorage.getItem('quizResults') || '{}');
    return !!results.score;
  }
} 