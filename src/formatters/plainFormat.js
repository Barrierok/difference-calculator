const getStartString = (partProperty, name) => `Property '${partProperty}${name}' was `;

const types = {
  object: () => '[complex value]',
  number: (value) => value,
  boolean: (value) => value,
  string: (value) => (Number.isNaN(Number(value)) ? `'${value}'` : value),
};

const convertValue = (value) => types[typeof value](value);

const stringify = {
  edited: (item) => `updated. From ${convertValue(item.previousOption)} to ${convertValue(item.option)}`,
  deleted: () => 'removed',
  added: (item) => `added with value: ${convertValue(item.option)}`,
};

const render = (ast, partProperty = '') => ast.reduce((acc, item) => {
  if (item.type === 'parent') {
    return [...acc, ...render(item.children, `${partProperty}${item.name}.`)];
  }
  if (item.type === 'unchanged') {
    return acc;
  }

  const startString = getStartString(partProperty, item.name);
  return item.type ? [...acc, `${startString}${stringify[item.type](item)}`] : acc;
}, []);

export default (data) => render(data).join('\n');
