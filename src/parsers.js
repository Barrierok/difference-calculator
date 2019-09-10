import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import ini from 'ini';

const dispatcher = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (pathFile) => {
  const data = fs.readFileSync(pathFile, 'utf8');
  const parse = dispatcher[path.extname(pathFile)];
  const parsedData = parse(data) || {};
  return parsedData;
};
