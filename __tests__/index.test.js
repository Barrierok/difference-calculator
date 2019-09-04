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

  expect(genDiff('/home/barrier/test/before.json', '/home/barrier/test/after.json')).toEqual(expected);
});
