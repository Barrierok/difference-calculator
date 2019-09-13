import { has } from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parsers';
import render from './formatters';

const filterKeys = (keys1, keys2) => Object.keys({ ...keys1, ...keys2 }).sort();

const templateData = {
  name: '',
  previousOption: null,
  option: null,
  type: '',
  children: [],
};

const compareData = (data1, data2) => {
  const keys = filterKeys(data1, data2);

  return keys.map((key) => {
    const [keyAvailability1, keyAvailability2] = [has(data1, key), has(data2, key)];

    const keyData = { ...templateData, name: key };

    if (keyAvailability1 && keyAvailability2) {
      if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
        return { ...keyData, children: compareData(data1[key], data2[key]) };
      }

      if (data1[key] === data2[key]) {
        return { ...keyData, option: data1[key] };
      }

      return {
        ...keyData,
        previousOption: data1[key],
        option: data2[key],
        type: 'edited',
      };
    }
    const option = keyAvailability1 ? data1[key] : data2[key];
    const type = keyAvailability1 ? 'deleted' : 'added';

    return { ...keyData, option, type };
  });
};

export default (pathFile1, pathFile2, format = 'treeLike') => {
  const data1 = fs.readFileSync(pathFile1, 'utf8');
  const data2 = fs.readFileSync(pathFile2, 'utf8');
  const extname1 = path.extname(pathFile1);
  const extname2 = path.extname(pathFile2);

  const parsedData1 = parse(data1, extname1);
  const parsedData2 = parse(data2, extname2);

  const diff = render(compareData(parsedData1, parsedData2), format);
  return diff;
};
