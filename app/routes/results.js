import Route from '@ember/routing/route';

export default class ResultsRoute extends Route {
  queryParams = {
    score: { refreshModel: true },
    total: { refreshModel: true },
    attempts: { refreshModel: true }
  };

  model(params) {
    return {
      score: parseInt(params.score),
      total: parseInt(params.total),
      attempts: JSON.parse(params.attempts || '[]')
    };
  }
}
