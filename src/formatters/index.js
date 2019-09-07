import nested from './nestedFormat';
import plain from './planeFormat';
import json from './jsonFormat';

const changeFormat = { nested, plain, json };

export default (data, format) => changeFormat[format](data);
