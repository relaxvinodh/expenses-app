import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import colors from 'colors';

/*eslint-disable no-console*/

process.env.NODE_ENV = 'production';

console.log('Generating minified bundle or production via webpack. This will take a moment ...'.blue);

webpack(webpackConfig).run((err, stats) => {
  if(err) { //so a fatal error occurred. Stop here
    console.log(err.bold.red,"stopping Here!!!!");
    return 1;
  }

  const jsonStats = stats.toJson();

  if(jsonStats.hasErrors){
    return jsonStats.errors.map(error => console.log(error.red));
  }

  if(jsonStats.hasWarnings){
    console.log('webpack generated the following warnings: '.bold.yellow);
    jsonStats.warnings.map(warning => console.log(warning.yellow));
  }

  console.log(`webpack stats: ${stats}`);

  //if we got this far, the build succeeded.
  console.log('your app has been compiled in production mode and written to /dist. It\'s ready to roll!'.green);

  return 0;
});
