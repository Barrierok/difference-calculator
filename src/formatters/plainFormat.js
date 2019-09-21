import { flattenDeep } from 'lodash';

const getStartString = (partProperty, name) => `Property '${partProperty}${name}' was`;

const types = {
  object: () => '[complex value]',
  number: (value) => value,
  boolean: (value) => value,
  string: (value) => (Number.isNaN(Number(value)) ? `'${value}'` : value),
};

const convertValue = (value) => types[typeof value](value);

const render = (ast, partProperty = '') => ast.map((item) => {
  const startString = getStartString(partProperty, item.name);
  switch (item.type) {
    case 'parent':
      return render(item.children, `${partProperty}${item.name}.`);
    case 'unchanged':
      return '';
    case 'added':
      return `${startString} added with value: ${convertValue(item.currentData)}`;
    case 'deleted':
      return `${startString} removed`;
    case 'edited':
      return `${startString} updated. From ${convertValue(item.previousData)} to ${convertValue(item.currentData)}`;
    default:
      return new Error(`Unexpected type node ${item.type}`);
  }
});

export default (data) => flattenDeep(render(data))
  .filter((item) => item !== '')
  .join('\n');
