import fs from 'fs';
import genDiff from '../src';

const getPathFile = (ext, type) => (
  `${__dirname}/__fixtures__/configurations/${ext}Files/${type}.${ext}`
);

const getFormat = {
  json: 'json',
  plain: 'txt',
  treeLike: 'txt',
};

const getPathOutput = (formatter) => (
  `${__dirname}/__fixtures__/expectedOutputs/${formatter}Output.${getFormat[formatter]}`
);

test.each(
  [
    ['treeLike', 'yml'], ['treeLike', 'ini'], ['treeLike', 'json'],
    ['plain', 'yml'], ['plain', 'ini'], ['plain', 'json'],
    ['json', 'yml'], ['json', 'ini'], ['json', 'json'],
  ],
)('compare difference %s files. Format: %s', (formatter, format) => {
  const pathBefore = getPathFile(format, 'before');
  const pathAfter = getPathFile(format, 'after');
  const pathOutput = getPathOutput(formatter);
  const expectedData = fs.readFileSync(pathOutput, 'utf8');

  expect(genDiff(pathBefore, pathAfter, formatter)).toEqual(expectedData);
});
