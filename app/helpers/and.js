import { helper } from '@ember/component/helper';

export function and(params) {
  return params.every((param) => Boolean(param));
}

export default helper(and);
