import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class QuizRoute extends Route {
  @service store;
  @service router;
  @service quizState;

  beforeModel() {
    // Check if we have results
    const results = JSON.parse(localStorage.getItem('quizResults') || '{}');
    const state = JSON.parse(localStorage.getItem('quizState') || '{}');
    
    // If we have results but no valid state, redirect to results
    if (results.score && (!state.currentQuestionIndex || state.currentQuestionIndex < 0)) {
      this.router.transitionTo('results');
      return;
    }
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    
    // Only restore state if it exists and is valid
    const state = JSON.parse(localStorage.getItem('quizState') || '{}');
    if (state.currentQuestionIndex !== undefined && state.currentQuestionIndex >= 0) {
      controller.restoreState();
    }
  }

  async model() {
    // Create local questions
    const questions = [
      {
        id: '1',
        text: 'What is the capital of France?',
        correctAnswer: 'paris',
        options: [
          { id: '1-1', value: 'paris', text: 'Paris' },
          { id: '1-2', value: 'london', text: 'London' },
          { id: '1-3', value: 'berlin', text: 'Berlin' },
          { id: '1-4', value: 'madrid', text: 'Madrid' }
        ]
      },
      {
        id: '2',
        text: 'Which planet is known as the Red Planet?',
        correctAnswer: 'mars',
        options: [
          { id: '2-1', value: 'venus', text: 'Venus' },
          { id: '2-2', value: 'mars', text: 'Mars' },
          { id: '2-3', value: 'jupiter', text: 'Jupiter' },
          { id: '2-4', value: 'saturn', text: 'Saturn' }
        ]
      },
      {
        id: '3',
        text: 'What is the largest ocean on Earth?',
        correctAnswer: 'pacific',
        options: [
          { id: '3-1', value: 'atlantic', text: 'Atlantic Ocean' },
          { id: '3-2', value: 'pacific', text: 'Pacific Ocean' },
          { id: '3-3', value: 'indian', text: 'Indian Ocean' },
          { id: '3-4', value: 'arctic', text: 'Arctic Ocean' }
        ]
      },
      {
        id: '4',
        text: 'Which element has the chemical symbol "O"?',
        correctAnswer: 'oxygen',
        options: [
          { id: '4-1', value: 'gold', text: 'Gold' },
          { id: '4-2', value: 'oxygen', text: 'Oxygen' },
          { id: '4-3', value: 'osmium', text: 'Osmium' },
          { id: '4-4', value: 'iron', text: 'Iron' }
        ]
      },
      {
        id: '5',
        text: 'What is the largest mammal in the world?',
        correctAnswer: 'blue whale',
        options: [
          { id: '5-1', value: 'african elephant', text: 'African Elephant' },
          { id: '5-2', value: 'blue whale', text: 'Blue Whale' },
          { id: '5-3', value: 'giraffe', text: 'Giraffe' },
          { id: '5-4', value: 'polar bear', text: 'Polar Bear' }
        ]
      }
    ];

    return questions;
  }
}
