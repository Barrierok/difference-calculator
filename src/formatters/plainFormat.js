const getStartString = (partProperty, name) => `Property '${partProperty}${name}' was`;

const types = {
  object: () => '[complex value]',
  number: (value) => value,
  boolean: (value) => value,
  string: (value) => (Number.isNaN(Number(value)) ? `'${value}'` : value),
};

const convertValue = (value) => types[typeof value](value);

const render = (ast, partProperty = '') => ast.reduce((acc, item) => {
  const startString = getStartString(partProperty, item.name);
  switch (item.type) {
    case 'parent':
      return [...acc, ...render(item.children, `${partProperty}${item.name}.`)];
    case 'unchanged':
      return acc;
    case 'added':
      return [...acc, `${startString} added with value: ${convertValue(item.option)}`];
    case 'deleted':
      return [...acc, `${startString} removed`];
    case 'edited':
      return [...acc, `${startString} updated. From ${convertValue(item.previousOption)} to ${convertValue(item.option)}`];
    default:
      return new Error('Unexpected type node');
  }
}, []);

export default (data) => render(data).join('\n');
