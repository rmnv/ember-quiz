import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class QuizController extends Controller {
  @service router;
  @service quizState;

  @tracked currentQuestionIndex = 0;
  @tracked selectedAnswer = null;
  @tracked isSubmitted = false;
  @tracked isCorrect = false;
  @tracked score = 0;
  @tracked attempts = [];
  @tracked isLoading = false;

  constructor() {
    super(...arguments);
  }

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

  saveState() {
    const state = {
      currentQuestionIndex: this.currentQuestionIndex,
      selectedAnswer: this.selectedAnswer,
      isSubmitted: this.isSubmitted,
      isCorrect: this.isCorrect,
      score: this.score,
      attempts: this.attempts,
      timestamp: new Date().toISOString()
    };
    console.log('Saving quiz state:', state);
    localStorage.setItem('quizState', JSON.stringify(state));
    // Update the quiz state service
    this.quizState.updateState();
  }

  restoreState() {
    const state = JSON.parse(localStorage.getItem('quizState') || '{}');
    if (state.currentQuestionIndex !== undefined) {
      this.currentQuestionIndex = state.currentQuestionIndex;
      this.selectedAnswer = state.selectedAnswer;
      this.isSubmitted = state.isSubmitted;
      this.isCorrect = state.isCorrect;
      this.score = state.score;
      this.attempts = state.attempts || [];
    }
  }

  resetState() {
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.isSubmitted = false;
    this.isCorrect = false;
    this.score = 0;
    this.attempts = [];
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
    this.saveState();
  }

  @action
  async checkAnswer(e) {
    e.preventDefault();
    if (!this.selectedAnswer) return;

    // Add loading state
    this.isLoading = true;

    // Simulate server delay
    await new Promise(resolve => setTimeout(resolve, 1000));

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
    this.saveState();
    
    // Remove loading state
    this.isLoading = false;
  }

  @action
  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      // Move to next question
      this.currentQuestionIndex += 1;
      
      // Reset only the question-specific state
      this.selectedAnswer = null;
      this.isSubmitted = false;
      this.isCorrect = false;

      // Save the updated state
      this.saveState();
    } else {
      // Save final results
      const results = {
        score: this.score,
        total: this.questions.length,
        attempts: this.attempts,
        timestamp: new Date().toISOString()
      };
      
      // Save results to localStorage
      localStorage.setItem('quizResults', JSON.stringify(results));
      
      // Clear only the quiz state, not results
      this.quizState.clearState();
      
      // Navigate to results page with query params
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
  resetQuiz() {
    this.resetState();
    this.quizState.clearResults();
  }
}
