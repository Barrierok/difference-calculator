import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const dispatcher = {
  '.json': (data) => JSON.parse(data),
  '.yml': (data) => yaml.safeLoad(data),
};

export default (pathFile) => {
  const data = fs.readFileSync(pathFile, 'utf8');
  const extnameFile = path.extname(pathFile);
  return dispatcher[extnameFile](data) || {};
};
