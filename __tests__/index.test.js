import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const ext = ['.json', '.yml', '.ini'];

const pathOutput1 = `${__dirname}/__fixtures__/expectedOutputs/output1.txt`;
const pathOutput2 = `${__dirname}/__fixtures__/expectedOutputs/output2.txt`;
const pathOutput3 = `${__dirname}/__fixtures__/expectedOutputs/output3.txt`;

const pathFlatAfterJson = `${__dirname}/__fixtures__/configurations/jsonFiles/flatAfter.json`;
const pathFlatBeforeJson = `${__dirname}/__fixtures__/configurations/jsonFiles/flatBefore.json`;

const pathFlatAfterYml = `${__dirname}/__fixtures__/configurations/ymlFiles/flatAfter.yml`;
const pathFlatBeforeYml = `${__dirname}/__fixtures__/configurations/ymlFiles/flatBefore.yml`;

const pathFlatAfterIni = `${__dirname}/__fixtures__/configurations/iniFiles/flatAfter.ini`;
const pathFlatBeforeIni = `${__dirname}/__fixtures__/configurations/iniFiles/flatBefore.ini`;

const pathNestedAfterJson = `${__dirname}/__fixtures__/configurations/jsonFiles/nestedAfter.json`;
const pathNestedBeforeJson = `${__dirname}/__fixtures__/configurations/jsonFiles/nestedBefore.json`;

const pathNestedAfterYml = `${__dirname}/__fixtures__/configurations/ymlFiles/nestedAfter.yml`;
const pathNestedBeforeYml = `${__dirname}/__fixtures__/configurations/ymlFiles/nestedBefore.yml`;

const pathNestedAfterIni = `${__dirname}/__fixtures__/configurations/iniFiles/nestedAfter.ini`;
const pathNestedBeforeIni = `${__dirname}/__fixtures__/configurations/iniFiles/nestedBefore.ini`;

test.each`
      pathAfter          |     pathBefore          | expectedExt  |       pathOutput
  ${pathFlatAfterJson}   | ${pathFlatBeforeJson}   | ${ext[0]}    |     ${pathOutput1}
  ${pathFlatAfterYml}    | ${pathFlatBeforeYml}    | ${ext[1]}    |     ${pathOutput1}
  ${pathFlatAfterIni}    | ${pathFlatBeforeIni}    | ${ext[2]}    |     ${pathOutput1}
  ${pathNestedAfterJson} | ${pathNestedBeforeJson} | ${ext[0]}    |     ${pathOutput2}
  ${pathNestedAfterYml}  | ${pathNestedBeforeYml}  | ${ext[1]}    |     ${pathOutput3}
  ${pathNestedAfterIni}  | ${pathNestedBeforeIni}  | ${ext[2]}    |     ${pathOutput3}
`('compare difference $expectedExt', (
  {
    pathAfter,
    pathBefore,
    expectedExt,
    pathOutput,
  },
) => {
  const expectedData1 = fs.readFileSync(pathOutput, 'utf8');
  expect(genDiff(pathBefore, pathAfter)).toEqual(expectedData1);
  expect(path.extname(pathAfter)).toEqual(expectedExt);
  expect(path.extname(pathBefore)).toEqual(expectedExt);
});
