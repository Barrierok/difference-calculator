import yaml from 'js-yaml';
import ini from 'ini';

const dispatcher = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default ({ data, extname }) => {
  const parse = dispatcher[extname];
  const parsedData = parse(data) || {};
  return parsedData;
};
