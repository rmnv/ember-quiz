import Model, { attr, belongsTo } from '@ember-data/model';

export default class OptionModel extends Model {
  @attr('string') value;
  @attr('string') text;
  @belongsTo('question', { async: false }) question;
}
