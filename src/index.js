import program from 'commander';
import fs from 'fs';
import { has } from 'lodash';

const filterKeys = (keys1, keys2) => Array.from(new Set(keys1.concat(keys2)));

const getParseData = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));

const genDiff = (pathToFile1, pathToFile2) => {
  const [data1, data2] = [getParseData(pathToFile1), getParseData(pathToFile2)];
  const keys = filterKeys(Object.keys(data1), Object.keys(data2));

  const diff = keys
    .reduce((acc, key) => {
      const [keyAvailability1, keyAvailability2] = [has(data1, key), has(data2, key)];

      if (keyAvailability1 && keyAvailability2) {
        if (data1[key] === data2[key]) {
          return [...acc, `     ${key}: ${data1[key]}`];
        }
        return [...acc, `   + ${key}: ${data2[key]}`, `   - ${key}: ${data1[key]}`];
      }
      if (keyAvailability1) {
        return [...acc, `   - ${key}: ${data1[key]}`];
      }
      return [...acc, `   + ${key}: ${data2[key]}`];
    }, '{')
    .concat('}')
    .join('\n');

  console.log(diff);
};

export default genDiff;

export const utility = () => {
  program
    .version('0.0.1', '-V, --vers', 'output the version number')
    .description('Compares two configuration files and shows keyAvailability1 difference.')
    .option('-f, --format [type]', 'Output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      genDiff(firstConfig, secondConfig);
    });

  program.parse(process.argv);
};
