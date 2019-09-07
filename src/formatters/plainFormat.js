const getStartString = (partProperty, name) => `Property '${partProperty}${name}' was `;

const types = {
  object: () => '[complex value]',
  number: (value) => value,
  boolean: (value) => value,
  string: (value) => (Number.isNaN(Number(value)) ? `'${value}'` : value),
};

const convertValue = (value) => types[typeof value](value);

const stringify = {
  edit: (item) => `updated. From ${convertValue(item.previousValue)} to ${convertValue(item.value)}`,
  delete: () => 'removed',
  add: (item) => `added with value: ${convertValue(item.value)}`,
};

const render = (ast, partProperty = '') => ast.reduce((acc, item) => {
  if (item.children.length > 0) {
    return `${acc}${render(item.children, `${partProperty}${item.name}.`)}`;
  }
  const startString = getStartString(partProperty, item.name);
  return item.action ? `${acc}${startString}${stringify[item.action](item)}\n` : `${acc}`;
}, '');

export default (data) => {
  const resString = render(data);
  return resString.slice(0, resString.length - 1);
};
