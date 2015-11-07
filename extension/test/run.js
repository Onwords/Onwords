var node_modules = '../../node_modules/';
phantom.injectJs(node_modules + 'mocha/mocha.js');
phantom.injectJs(node_modules + 'sinon-chrome/src/phantom-tweaks.js');
mocha.setup({ui: 'bdd', reporter: 'spec'});
phantom.injectJs('beforeEach.js');
phantom.injectJs('annotation-sidebar.test.js');

mocha.run(function(failures) {
  setTimeout(function() {
    phantom.exit(failures);
  }, 0);
});

