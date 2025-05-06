import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class QuizRoute extends Route {
  @service store;

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
      }
    ];

    return questions;
  }
}
