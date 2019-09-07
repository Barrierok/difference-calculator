import nested from './nestedFormat';
import plane from './planeFormat';
import json from './jsonFormat';

const changeFormat = { nested, plane, json };

export default (data, format) => changeFormat[format](data);
