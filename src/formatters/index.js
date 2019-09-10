import treeLike from './treeLikeFormat';
import plain from './plainFormat';
import json from './jsonFormat';

const changeFormat = { treeLike, plain, json };

export default (data, format) => changeFormat[format](data);
