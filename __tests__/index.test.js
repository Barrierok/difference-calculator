import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const ext = ['.json', '.yml', '.ini'];

const pathOutput1 = `${__dirname}/__fixtures__/expectedOutputs/output1.txt`;
const pathOutput2 = `${__dirname}/__fixtures__/expectedOutputs/output2.txt`;
const pathOutput3 = `${__dirname}/__fixtures__/expectedOutputs/output3.txt`;

const pathAfterJson = `${__dirname}/__fixtures__/configurations/jsonFiles/flatAfter.json`;
const pathBeforeJson = `${__dirname}/__fixtures__/configurations/jsonFiles/flatBefore.json`;

const pathAfterYml = `${__dirname}/__fixtures__/configurations/ymlFiles/flatAfter.yml`;
const pathBeforeYml = `${__dirname}/__fixtures__/configurations/ymlFiles/flatBefore.yml`;

const pathAfterIni = `${__dirname}/__fixtures__/configurations/iniFiles/flatAfter.ini`;
const pathBeforeIni = `${__dirname}/__fixtures__/configurations/iniFiles/flatBefore.ini`;

const pathAfter1Json = `${__dirname}/__fixtures__/configurations/jsonFiles/nestedAfter.json`;
const pathBefore1Json = `${__dirname}/__fixtures__/configurations/jsonFiles/nestedBefore.json`;

const pathAfter1Yml = `${__dirname}/__fixtures__/configurations/ymlFiles/nestedAfter.yml`;
const pathBefore1Yml = `${__dirname}/__fixtures__/configurations/ymlFiles/nestedBefore.yml`;

const pathAfter1Ini = `${__dirname}/__fixtures__/configurations/iniFiles/nestedAfter.ini`;
const pathBefore1Ini = `${__dirname}/__fixtures__/configurations/iniFiles/nestedBefore.ini`;

test.each`
      pathAfter     |     pathBefore      | expectedExt  |       pathOutput
  ${pathAfterJson}  | ${pathBeforeJson}   | ${ext[0]}    |     ${pathOutput1}
  ${pathAfterYml}   | ${pathBeforeYml}    | ${ext[1]}    |     ${pathOutput1}
  ${pathAfterIni}   | ${pathBeforeIni}    | ${ext[2]}    |     ${pathOutput1}
  ${pathAfter1Json} | ${pathBefore1Json}  | ${ext[0]}    |     ${pathOutput2}
  ${pathAfter1Yml}  | ${pathBefore1Yml}   | ${ext[1]}    |     ${pathOutput3}
  ${pathAfter1Ini}   | ${pathBefore1Ini}    | ${ext[2]}    |     ${pathOutput3}
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
});
