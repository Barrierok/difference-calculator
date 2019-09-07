import program from 'commander';
import { has } from 'lodash';
import parse from './parsers';
import render from './formatters';

const filterKeys = (keys1, keys2) => Array.from(new Set(keys1.concat(keys2))).sort();

const templateData = {
  name: '',
  previousValue: null,
  value: null,
  action: '',
  children: [],
};

const compareData = (data1, data2) => {
  const keys = filterKeys(Object.keys(data1), Object.keys(data2));

  return keys.reduce((acc, key) => {
    const [keyAvailability1, keyAvailability2] = [has(data1, key), has(data2, key)];

    const keyData = { ...templateData, name: key };

    if (keyAvailability1 && keyAvailability2) {
      if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
        return [...acc, { ...keyData, children: compareData(data1[key], data2[key]) }];
      }

      if (data1[key] === data2[key]) {
        return [...acc, { ...keyData, value: data1[key] }];
      }

      return [...acc, {
        ...keyData,
        previousValue: data1[key],
        value: data2[key],
        action: 'edit',
      }];
    }

    return [...acc, { ...keyData, value: keyAvailability1 ? data1[key] : data2[key], action: keyAvailability1 ? 'delete' : 'add' }];
  }, []);
};

const genDiff = (pathToFile1, pathToFile2, format = 'nested') => {
  const diff = render(compareData(parse(pathToFile1), parse(pathToFile2)), format);
  return diff;
};

export const utility = () => {
  program
    .version('0.0.1', '-V, --vers', 'output the version number')
    .description('Compares two configuration files and shows difference.')
    .option('-f, --format [type]', 'Output format', 'nested')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      const diff = genDiff(firstConfig, secondConfig, program.format);
      console.log(diff);
    })
    .parse(process.argv);
};

export default genDiff;
