import fs from 'fs';
import genDiff from '../src';

const formatters = ['treeLike', 'plain', 'json'];

const extensions = ['yml', 'ini', 'json'];

const getPathFile = (ext, type) => (
  `${__dirname}/__fixtures__/configurations/${ext}Files/${type}.${ext}`
);

const getPathOutput = (formatter) => (
  `${__dirname}/__fixtures__/expectedOutputs/${formatter}Output.${formatter === 'json' ? formatter : 'txt'}`
);

test.each`
  formatter         |   extension
  ${formatters[0]}  |  ${extensions[0]}
  ${formatters[0]}  |  ${extensions[1]}
  ${formatters[0]}  |  ${extensions[2]}
  ${formatters[1]}  |  ${extensions[0]}
  ${formatters[1]}  |  ${extensions[1]}
  ${formatters[1]}  |  ${extensions[2]}
  ${formatters[2]}  |  ${extensions[0]}
  ${formatters[2]}  |  ${extensions[1]}
  ${formatters[2]}  |  ${extensions[2]}
`('compare difference $extension files. Format: $formatter', ({ formatter, extension }) => {
  const [pathBefore, pathAfter] = [getPathFile(extension, 'before'), getPathFile(extension, 'after')];
  const pathOutput = getPathOutput(formatter);
  const expectedData = fs.readFileSync(pathOutput, 'utf8');

  expect(genDiff(pathBefore, pathAfter, formatter)).toEqual(expectedData);
});
