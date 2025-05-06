import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class ResultsController extends Controller {
  @service router;
  @service quizState;

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
    const percentage = this.percentage;
    if (percentage === 100) return 'Perfect! You got all questions right!';
    if (percentage >= 80) return 'Great job! You did really well!';
    if (percentage >= 60) return 'Good effort! Keep practicing!';
    return 'Keep trying! You can do better next time!';
  }

  @action
  restartQuiz() {
    // Clear both state and results
    this.quizState.clearResults();

    // Force a page reload to ensure all state is cleared
    window.location.href = '/quiz';
  }
}
