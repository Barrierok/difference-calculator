import fs from 'fs';
import genDiff from '../src';

const formats = ['nested', 'plain', 'json'];

const pathNestedOutput1 = `${__dirname}/__fixtures__/expectedOutputs/nestedOutputs/output1.txt`;
const pathNestedOutput2 = `${__dirname}/__fixtures__/expectedOutputs/nestedOutputs/output2.txt`;
const pathPlainOutput1 = `${__dirname}/__fixtures__/expectedOutputs/plainOutputs/output1.txt`;
const pathPlainOutput2 = `${__dirname}/__fixtures__/expectedOutputs/plainOutputs/output2.txt`;
const pathJsonOutput1 = `${__dirname}/__fixtures__/expectedOutputs/jsonOutputs/output1.json`;
const pathJsonOutput2 = `${__dirname}/__fixtures__/expectedOutputs/jsonOutputs/output2.json`;

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
      pathAfter          |     pathBefore          |         pathOutput      |      format
  ${pathFlatAfterJson}   | ${pathFlatBeforeJson}   |   ${pathNestedOutput1}  |   ${formats[0]}
  ${pathFlatAfterYml}    | ${pathFlatBeforeYml}    |   ${pathNestedOutput1}  |   ${formats[0]}
  ${pathFlatAfterIni}    | ${pathFlatBeforeIni}    |   ${pathNestedOutput1}  |   ${formats[0]}
  ${pathNestedAfterJson} | ${pathNestedBeforeJson} |   ${pathNestedOutput2}  |   ${formats[0]}
  ${pathNestedAfterYml}  | ${pathNestedBeforeYml}  |   ${pathNestedOutput2}  |   ${formats[0]}
  ${pathNestedAfterIni}  | ${pathNestedBeforeIni}  |   ${pathNestedOutput2}  |   ${formats[0]}
  ${pathFlatAfterJson}   | ${pathFlatBeforeJson}   |   ${pathPlainOutput1}  |   ${formats[1]}
  ${pathFlatAfterYml}    | ${pathFlatBeforeYml}    |   ${pathPlainOutput1}  |   ${formats[1]}
  ${pathFlatAfterIni}    | ${pathFlatBeforeIni}    |   ${pathPlainOutput1}  |   ${formats[1]}
  ${pathNestedAfterJson} | ${pathNestedBeforeJson} |   ${pathPlainOutput2}  |   ${formats[1]}
  ${pathNestedAfterYml}  | ${pathNestedBeforeYml}  |   ${pathPlainOutput2}  |   ${formats[1]}
  ${pathNestedAfterIni}  | ${pathNestedBeforeIni}  |   ${pathPlainOutput2}  |   ${formats[1]}
  ${pathFlatAfterJson}   | ${pathFlatBeforeJson}   |   ${pathJsonOutput1}  |   ${formats[2]}
  ${pathFlatAfterYml}    | ${pathFlatBeforeYml}    |   ${pathJsonOutput1}  |   ${formats[2]}
  ${pathFlatAfterIni}    | ${pathFlatBeforeIni}    |   ${pathJsonOutput1}  |   ${formats[2]}
  ${pathNestedAfterJson} | ${pathNestedBeforeJson} |   ${pathJsonOutput2}  |   ${formats[2]}
  ${pathNestedAfterYml}  | ${pathNestedBeforeYml}  |   ${pathJsonOutput2}  |   ${formats[2]}
  ${pathNestedAfterIni}  | ${pathNestedBeforeIni}  |   ${pathJsonOutput2}  |   ${formats[2]}
`('compare difference --$format format', (
  {
    pathAfter,
    pathBefore,
    pathOutput,
    format,
  },
) => {
  const expectedData1 = fs.readFileSync(pathOutput, 'utf8');
  expect(genDiff(pathBefore, pathAfter, format)).toEqual(expectedData1);
});
