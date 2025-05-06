import Model, { attr, hasMany } from '@ember-data/model';

export default class QuestionModel extends Model {
  @attr('string') text;
  @hasMany('option', { async: false }) options;
  @attr('string') correctAnswer;

  get optionsCount() {
    return this.options?.length || 0;
  }
}
