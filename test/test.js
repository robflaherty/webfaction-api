var Webfaction = require('./lib/webfaction');

var webfaction = new Webfaction('USERNAME', 'PASSWORD');

webfaction.login(function(result) {
  
  webfaction.listApps(function(result) {
    console.log(result);
  });

  webfaction.createDomain('example.com', 'www', function(result) {
    console.log(result);
  });

});

