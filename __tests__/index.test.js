import fs from 'fs';
import genDiff from '../src';

const getPathFile = (ext, type) => (
  `${__dirname}/__fixtures__/configurations/${ext}Files/${type}.${ext}`
);

const getPathOutput = (formatter) => (
  `${__dirname}/__fixtures__/expectedOutputs/${formatter}Output.${formatter === 'json' ? formatter : 'txt'}`
);

test.each(
  [
    ['treeLike', 'yml'], ['treeLike', 'ini'], ['treeLike', 'json'],
    ['plain', 'yml'], ['plain', 'ini'], ['plain', 'json'],
    ['json', 'yml'], ['json', 'ini'], ['json', 'json'],
  ],
)('compare difference %s files. Format: %s', (formatter, extension) => {
  const [pathBefore, pathAfter] = [getPathFile(extension, 'before'), getPathFile(extension, 'after')];
  const pathOutput = getPathOutput(formatter);
  const expectedData = fs.readFileSync(pathOutput, 'utf8');

  expect(genDiff(pathBefore, pathAfter, formatter)).toEqual(expectedData);
});
