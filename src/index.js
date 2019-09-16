import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parsers';
import render from './formatters';

const templateData = {
  name: '',
  previousOption: null,
  option: null,
  type: '',
  children: [],
};

const compareData = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();

  return keys.map((key) => {
    const keyAvailability1 = _.has(data1, key);
    const keyAvailability2 = _.has(data2, key);

    const keyData = { ...templateData, name: key };

    if (keyAvailability1 && keyAvailability2) {
      if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
        return { ...keyData, type: 'parent', children: compareData(data1[key], data2[key]) };
      }

      if (data1[key] === data2[key]) {
        return { ...keyData, option: data1[key], type: 'unchanged' };
      }

      return {
        ...keyData,
        previousOption: data1[key],
        option: data2[key],
        type: 'edited',
      };
    }

    if (keyAvailability1) {
      return { ...keyData, option: data1[key], type: 'deleted' };
    }

    return { ...keyData, option: data2[key], type: 'added' };
  });
};

export default (pathFile1, pathFile2, format = 'treeLike') => {
  const data1 = fs.readFileSync(pathFile1, 'utf8');
  const data2 = fs.readFileSync(pathFile2, 'utf8');
  const format1 = path.extname(pathFile1);
  const format2 = path.extname(pathFile2);

  const parsedData1 = parse(data1, format1);
  const parsedData2 = parse(data2, format2);

  const diff = render(compareData(parsedData1, parsedData2), format);
  return diff;
};
