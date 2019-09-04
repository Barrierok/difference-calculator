import fs from 'fs';
import genDiff from '../src';

const pathOutput1 = `${__dirname}/__fixtures__/expectedOutputs/output1.txt`;
const pathOutput2 = `${__dirname}/__fixtures__/expectedOutputs/output2.txt`;
const pathOutput3 = `${__dirname}/__fixtures__/expectedOutputs/output3.txt`;

const pathAfterJson = `${__dirname}/__fixtures__/configurations/after.json`;
const pathBeforeJson = `${__dirname}/__fixtures__/configurations/before.json`;
const pathEmptyJson = `${__dirname}/__fixtures__/configurations/empty.json`;
const pathAfterYml = `${__dirname}/__fixtures__/configurations/after.yml`;
const pathBeforeYml = `${__dirname}/__fixtures__/configurations/before.yml`;
const pathEmptyYml = `${__dirname}/__fixtures__/configurations/empty.yml`;

test.each`
      pathAfter   |     pathBefore    |    pathEmpty          
  ${pathAfterJson} | ${pathBeforeJson} | ${pathEmptyJson}
  ${pathAfterYml}  | ${pathBeforeYml}  | ${pathEmptyYml}
  ${pathAfterJson} | ${pathBeforeYml}  | ${pathEmptyYml}
`('compare difference', ({ pathAfter, pathBefore, pathEmpty }) => {
  const expectedData1 = fs.readFileSync(pathOutput1, 'utf8');
  expect(genDiff(pathBefore, pathAfter)).toEqual(expectedData1);

  const expectedData2 = fs.readFileSync(pathOutput2, 'utf8');
  expect(genDiff(pathBefore, pathEmpty)).toEqual(expectedData2);

  const expectedData3 = fs.readFileSync(pathOutput3, 'utf8');
  expect(genDiff(pathEmpty, pathAfter)).toEqual(expectedData3);
});
