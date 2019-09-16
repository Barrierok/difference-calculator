const renderObject = (object, counterSpaces) => Object.keys(object).reduce((acc, key) => {
  if (typeof object[key] === 'object') {
    return `${acc}${' '.repeat(counterSpaces)}${key}: {\n${renderObject(object[key], counterSpaces + 4)}${' '.repeat(counterSpaces)}}\n`;
  }
  return `${acc}${' '.repeat(counterSpaces)}${key}: ${object[key]}\n`;
}, '');

const insertObject = (object, counterSpaces) => `{\n${renderObject(object, counterSpaces + 6)}  ${' '.repeat(counterSpaces)}}`;

const convertValue = (option, counterSpaces) => (typeof option === 'object' ? insertObject(option, counterSpaces) : option);

const selectSymbol = { added: '+', deleted: '-', unchanged: ' ' };

const render = (ast, counterSpaces = 2) => ast.reduce((acc, {
  name,
  type,
  option,
  previousOption,
  children,
}) => {
  if (type === 'parent') {
    return `${acc}  ${' '.repeat(counterSpaces)}${name}: {\n${render(children, counterSpaces + 4)}  ${' '.repeat(counterSpaces)}}\n`;
  }
  const newValue = convertValue(option, counterSpaces);
  if (type === 'edited') {
    const newPreviousValue = convertValue(previousOption, counterSpaces);
    return `${acc}${' '.repeat(counterSpaces)}- ${name}: ${newPreviousValue}\n${' '.repeat(counterSpaces)}+ ${name}: ${newValue}\n`;
  }
  return `${acc}${' '.repeat(counterSpaces)}${selectSymbol[type]} ${name}: ${newValue}\n`;
}, '');

export default (data) => `{\n${render(data)}}`;
