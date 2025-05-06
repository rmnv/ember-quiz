import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ResultsRoute extends Route {
  @service router;

  model() {
    const results = JSON.parse(localStorage.getItem('quizResults') || '{}');
    
    if (!results.score) {
      // If no results found, redirect to quiz
      this.router.transitionTo('quiz');
      return null;
    }

    return {
      score: results.score,
      total: results.total,
      attempts: results.attempts || [],
      timestamp: results.timestamp
    };
  }
}
