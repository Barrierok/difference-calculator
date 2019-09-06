const objAct = { add: '+', delete: '-', '': ' ' };

const renderObject = (object, counterSpaces) => Object.keys(object).reduce((acc, key) => {
  if (typeof object[key] === 'object') {
    return `${acc}${' '.repeat(counterSpaces)}${key}: {\n${renderObject(object[key], counterSpaces + 4)}${' '.repeat(counterSpaces)}}\n`;
  }
  return `${acc}${' '.repeat(counterSpaces)}${key}: ${object[key]}\n`;
}, '');

const insertObject = (object, counterSpaces) => `{\n${renderObject(object, counterSpaces + 6)}  ${' '.repeat(counterSpaces)}}`;

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
  const newValue = typeof value === 'object' ? insertObject(value, counterSpaces) : value;
  if (action === 'edit') {
    const newPreviousValue = typeof previousValue === 'object' ? insertObject(previousValue, counterSpaces) : previousValue;
    return `${acc}${' '.repeat(counterSpaces)}- ${name}: ${newPreviousValue}\n${' '.repeat(counterSpaces)}+ ${name}: ${newValue}\n`;
  }
  return `${acc}${' '.repeat(counterSpaces)}${objAct[action]} ${name}: ${newValue}\n`;
}, '');

export default (data1, data2) => `{\n${render(data1, data2)}}`;
