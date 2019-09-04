import fs from 'fs';
import genDiff from '../src';

const pathOutput1 = `${__dirname}/__fixtures__/expectedOutputs/output1.txt`;
const pathOutput2 = `${__dirname}/__fixtures__/expectedOutputs/output2.txt`;
const pathOutput3 = `${__dirname}/__fixtures__/expectedOutputs/output3.txt`;
const pathAfterJson = `${__dirname}/__fixtures__/configurations/after.json`;
const pathBeforeJson = `${__dirname}/__fixtures__/configurations/before.json`;
const pathEmptyJson = `${__dirname}/__fixtures__/configurations/empty.json`;

test('check difference json', () => {
  const expected = fs.readFileSync(pathOutput1, 'utf8');

  expect(genDiff(pathBeforeJson, pathAfterJson)).toEqual(expected);
});

describe('check difference json with empty', () => {
  test('test1', () => {
    const expected = fs.readFileSync(pathOutput2, 'utf8');

    expect(genDiff(pathBeforeJson, pathEmptyJson)).toEqual(expected);
  });

  test('test2', () => {
    const expected = fs.readFileSync(pathOutput3, 'utf8');

    expect(genDiff(pathEmptyJson, pathAfterJson)).toEqual(expected);
  });
});
