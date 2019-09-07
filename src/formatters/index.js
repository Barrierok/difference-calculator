import nested from './nestedFormat';
import plain from './plainFormat';
import json from './jsonFormat';

const changeFormat = { nested, plain, json };

export default (data, format) => changeFormat[format](data);
