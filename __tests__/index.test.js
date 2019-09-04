import genDiff from '../src';
import formatString from '../src/utils';

test('check difference', () => {
  const expected = [
    '{',
    formatString('host', 'hexlet.io'),
    formatString('timeout', 20, '+'),
    formatString('timeout', 50, '-'),
    formatString('proxy', '123.234.53.22', '-'),
    formatString('follow', false, '-'),
    formatString('verbose', true, '+'),
    '}',
  ].join('\n');

  expect(genDiff(`${__dirname}/__fixtures__/before.json`, `${__dirname}/__fixtures__/after.json`)).toEqual(expected);
});

describe('check difference with empty', () => {
  test('test1', () => {
    const expected = [
      '{',
      formatString('host', 'hexlet.io', '-'),
      formatString('timeout', 50, '-'),
      formatString('proxy', '123.234.53.22', '-'),
      formatString('follow', false, '-'),
      '}',
    ].join('\n');

    expect(genDiff(`${__dirname}/__fixtures__/before.json`, `${__dirname}/__fixtures__/empty.json`)).toEqual(expected);
  });

  test('test2', () => {
    const expected = [
      '{',
      formatString('timeout', 20, '+'),
      formatString('verbose', true, '+'),
      formatString('host', 'hexlet.io', '+'),
      '}',
    ].join('\n');

    expect(genDiff(`${__dirname}/__fixtures__/empty.json`, `${__dirname}/__fixtures__/after.json`)).toEqual(expected);
  });
});
