import { helper } from '@ember/component/helper';

export function not([value]) {
  if (typeof value === 'object' && value !== null) {
    return !Object.values(value).some(Boolean);
  }
  return !value;
}

export default helper(not);
