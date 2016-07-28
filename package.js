Package.describe({
  name: 'humbertocruz:bert-semantic-ui',
  version: '1.0.0',
  summary: 'A client side, multi-style alerts system for Meteor and Semantic-UI.',
  git: 'http://github.com/humbertocruz/bert-semantic-ui',
  documentation: 'README.md'
});

Package.onUse( function( api ) {
  api.versionsFrom( '1.0.0' );

  api.use([
    'ecmascript',
    'templating',
    'session',
    'jquery',
    'semantic:ui@2.2.1'
  ], 'client');

  api.addFiles([
    'templates/bert-ui-alert.html',
    'templates/bert-ui-alert.js',
    'templates/body.html',
    'stylesheets/colors.scss',
    'stylesheets/bert.scss',
    'bert.js',
  ], 'client');

  api.export( 'BertUI' );
});

Package.onTest(function (api) {
  api.use( [ 'tinytest', 'session', 'jquery' ] );
  api.use( 'humbertocruz:bert-semantic-ui' );
  api.addFiles( 'tests/client.js', 'client' );
});
