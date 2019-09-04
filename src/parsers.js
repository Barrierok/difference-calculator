import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import ini from 'ini';

const dispatcher = {
  '.json': (data) => JSON.parse(data),
  '.yml': (data) => yaml.safeLoad(data),
  '.ini': (data) => ini.parse(data),
};

export default (pathFile) => {
  const data = fs.readFileSync(pathFile, 'utf8');
  const extnameFile = path.extname(pathFile);
  return dispatcher[extnameFile](data) || {};
};
