import nested from './nestedFormat';
import plane from './planeFormat';

const changeFormat = { nested, plane };

export default (data, format) => changeFormat[format](data);
