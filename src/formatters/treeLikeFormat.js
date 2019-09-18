const getSpaces = (deep) => ' '.repeat(4 * deep - 2);

const renderObject = (object, deep) => Object.keys(object).reduce((acc, key) => {
  if (typeof object[key] !== 'object') {
    return [...acc, `${getSpaces(deep)}  ${key}: ${object[key]}`];
  }
  const objects = renderObject(object[key], deep + 1);
  return [...acc, `${getSpaces(deep)}  ${key}: {`, ...objects, `${getSpaces(deep)}  }`];
}, []);

const insertObject = (object, deep) => ['{', ...renderObject(object, deep + 1), `${getSpaces(deep)}  }`];

const convertValue = (option, deep) => (typeof option === 'object' ? insertObject(option, deep).join('\n') : option);

const getElement = (action, deep, name, value) => `${getSpaces(deep)}${action} ${name}: ${convertValue(value, deep)}`;

const render = (ast, deep = 1) => ast.reduce((acc, {
  name,
  type,
  option,
  previousOption,
  children,
}) => {
  switch (type) {
    case 'parent':
      return [...acc, `${getSpaces(deep)}  ${name}: {`, ...render(children, deep + 1), `${getSpaces(deep)}  }`];
    case 'edited':
      return [...acc, getElement('-', deep, name, previousOption), getElement('+', deep, name, option)];
    case 'added':
      return [...acc, getElement('+', deep, name, option)];
    case 'deleted':
      return [...acc, getElement('-', deep, name, option)];
    case 'unchanged':
      return [...acc, getElement(' ', deep, name, option)];
    default:
      return new Error('Unexpected type node');
  }
}, []);

export default (data) => `{\n${render(data).join('\n')}\n}`;
