import { helper } from '@ember/component/helper';

export function or(params) {
  return params.some((param) => Boolean(param));
}

export default helper(or);
