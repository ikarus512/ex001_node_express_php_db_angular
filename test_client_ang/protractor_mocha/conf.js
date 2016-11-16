exports.config = {
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  //localSeleniumStandaloneOpts: {args: '--standalone'},
  specs: ['**/*-spec.js'],

  multiCapabilities: [{
    'browserName': 'chrome'
    //,shardTestFiles: true, //each spec file in different browser instance
    //,maxInstances: 1       //number of instances
  // }, {
  //   'browserName': 'firefox'
  // }, {
  //   'browserName': 'internet explorer'
  }]
};
