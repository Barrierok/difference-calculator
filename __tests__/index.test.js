import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const ext = ['.json', '.yml', '.ini'];

const pathOutput1 = `${__dirname}/__fixtures__/expectedOutputs/output1.txt`;
const pathOutput2 = `${__dirname}/__fixtures__/expectedOutputs/output2.txt`;
const pathOutput3 = `${__dirname}/__fixtures__/expectedOutputs/output3.txt`;

const pathAfterJson = `${__dirname}/__fixtures__/configurations/after.json`;
const pathBeforeJson = `${__dirname}/__fixtures__/configurations/before.json`;
const pathEmptyJson = `${__dirname}/__fixtures__/configurations/empty.json`;

const pathAfterYml = `${__dirname}/__fixtures__/configurations/after.yml`;
const pathBeforeYml = `${__dirname}/__fixtures__/configurations/before.yml`;
const pathEmptyYml = `${__dirname}/__fixtures__/configurations/empty.yml`;

const pathAfterIni = `${__dirname}/__fixtures__/configurations/after.ini`;
const pathBeforeIni = `${__dirname}/__fixtures__/configurations/before.ini`;
const pathEmptyIni = `${__dirname}/__fixtures__/configurations/empty.ini`;

test.each`
      pathAfter    |     pathBefore    |    pathEmpty     |   expectedExt    
  ${pathAfterJson} | ${pathBeforeJson} | ${pathEmptyJson} |  ${ext[0]}
  ${pathAfterYml}  | ${pathBeforeYml}  | ${pathEmptyYml}  |  ${ext[1]}
  ${pathAfterIni}  | ${pathBeforeIni}  | ${pathEmptyIni}  |  ${ext[2]}
`('compare difference $expectedExt', (
  {
    pathAfter,
    pathBefore,
    pathEmpty,
    expectedExt,
  },
) => {
  const expectedData1 = fs.readFileSync(pathOutput1, 'utf8');
  expect(genDiff(pathBefore, pathAfter)).toEqual(expectedData1);

  const expectedData2 = fs.readFileSync(pathOutput2, 'utf8');
  expect(genDiff(pathBefore, pathEmpty)).toEqual(expectedData2);

  const expectedData3 = fs.readFileSync(pathOutput3, 'utf8');
  expect(genDiff(pathEmpty, pathAfter)).toEqual(expectedData3);

  expect(path.extname(pathAfter)).toEqual(expectedExt);
});
