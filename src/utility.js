import program from 'commander';
import genDiff from './index';

export default () => {
  program
    .version('0.0.1', '-V, --vers', 'output the version number')
    .description('Compares two configuration files and shows difference.')
    .option('-f, --format [type]', 'Output format', 'nested')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      const diff = genDiff(firstConfig, secondConfig, program.format);
      console.log(diff);
    })
    .parse(process.argv);
};
