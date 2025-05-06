import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class ResultsController extends Controller {
  @service router;

  get percentage() {
    return Math.round((this.model.score / this.model.total) * 100);
  }

  get isPerfect() {
    return this.model.score === this.model.total;
  }

  get isGood() {
    return this.percentage >= 70;
  }

  get isAverage() {
    return this.percentage >= 50;
  }

  get resultMessage() {
    if (this.isPerfect) {
      return 'Perfect! You got all questions right!';
    } else if (this.isGood) {
      return 'Great job! You did really well!';
    } else if (this.isAverage) {
      return 'Not bad! Keep practicing!';
    } else {
      return 'Keep trying! You can do better!';
    }
  }

  @action
  restartQuiz() {
    this.router.transitionTo('quiz');
  }
} 