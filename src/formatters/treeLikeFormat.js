const renderObject = (object, counterSpaces) => Object.keys(object).reduce((acc, key) => {
  if (typeof object[key] === 'object') {
    return `${acc}${' '.repeat(counterSpaces)}${key}: {\n${renderObject(object[key], counterSpaces + 4)}${' '.repeat(counterSpaces)}}\n`;
  }
  return `${acc}${' '.repeat(counterSpaces)}${key}: ${object[key]}\n`;
}, '');

const insertObject = (object, counterSpaces) => `{\n${renderObject(object, counterSpaces + 6)}  ${' '.repeat(counterSpaces)}}`;

const convertValue = (value, counterSpaces) => (typeof value === 'object' ? insertObject(value, counterSpaces) : value);

const selectSymbol = { add: '+', delete: '-', '': ' ' };

const render = (ast, counterSpaces = 2) => ast.reduce((acc, {
  name,
  action,
  value,
  previousValue,
  children,
}) => {
  if (children.length > 0) {
    return `${acc}  ${' '.repeat(counterSpaces)}${name}: {\n${render(children, counterSpaces + 4)}  ${' '.repeat(counterSpaces)}}\n`;
  }
  const newValue = convertValue(value, counterSpaces);
  if (action === 'edit') {
    const newPreviousValue = convertValue(previousValue, counterSpaces);
    return `${acc}${' '.repeat(counterSpaces)}- ${name}: ${newPreviousValue}\n${' '.repeat(counterSpaces)}+ ${name}: ${newValue}\n`;
  }
  return `${acc}${' '.repeat(counterSpaces)}${selectSymbol[action]} ${name}: ${newValue}\n`;
}, '');

export default (data) => `{\n${render(data)}}`;
