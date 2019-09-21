import { flattenDeep } from 'lodash';

const getSpaces = (depth) => ' '.repeat(4 * depth - 2);

const renderObject = (object, depth) => Object.keys(object).map((key) => {
  if (typeof object[key] !== 'object') {
    return `${getSpaces(depth)}  ${key}: ${object[key]}`;
  }
  const objects = renderObject(object[key], depth + 1);
  return [`${getSpaces(depth)}  ${key}: {`, objects, `${getSpaces(depth)}  }`];
});

const insertObject = (object, depth) => ['{', renderObject(object, depth + 1), `${getSpaces(depth)}  }`];

const convertValue = (data, depth) => (typeof data === 'object' ? flattenDeep(insertObject(data, depth)).join('\n') : data);

const getElement = (action, depth, name, value) => `${getSpaces(depth)}${action} ${name}: ${convertValue(value, depth)}`;

const render = (ast, depth = 1) => ast.map(({
  name,
  type,
  currentData,
  previousData,
  children,
}) => {
  switch (type) {
    case 'parent':
      return [`${getSpaces(depth)}  ${name}: {`, render(children, depth + 1), `${getSpaces(depth)}  }`];
    case 'edited':
      return [getElement('-', depth, name, previousData), getElement('+', depth, name, currentData)];
    case 'added':
      return getElement('+', depth, name, currentData);
    case 'deleted':
      return getElement('-', depth, name, currentData);
    case 'unchanged':
      return getElement(' ', depth, name, currentData);
    default:
      return new Error(`Unexpected type node ${type}`);
  }
}, []);

export default (data) => {
  const result = flattenDeep(render(data)).join('\n');
  return `{\n${result}\n}`;
};
