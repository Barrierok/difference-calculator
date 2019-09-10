import { has } from 'lodash';
import parse from './parsers';
import render from './formatters';

const filterKeys = (keys1, keys2) => Object.keys({ ...keys1, ...keys2 }).sort();

const templateData = {
  name: '',
  previousValue: null,
  value: null,
  action: '',
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
        return { ...keyData, value: data1[key] };
      }

      return {
        ...keyData,
        previousValue: data1[key],
        value: data2[key],
        action: 'edit',
      };
    }

    return { ...keyData, value: keyAvailability1 ? data1[key] : data2[key], action: keyAvailability1 ? 'delete' : 'add' };
  });
};

export default (pathToFile1, pathToFile2, format = 'treeLike') => {
  const diff = render(compareData(parse(pathToFile1), parse(pathToFile2)), format);
  return diff;
};
