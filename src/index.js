import program from 'commander';

export default () => {
  program
    .version('0.0.1', '-V, --vers', 'output the version number')
    .description('Compares two configuration files and shows a difference.');

  program.parse(process.argv);
};
