import { helper } from '@ember/component/helper';

export function jsonStringify([obj]) {
  return JSON.stringify(obj, null, 2);
}

export default helper(jsonStringify); 