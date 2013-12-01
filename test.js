var Webfaction = require('./lib/webfaction');

var webfaction = new Webfaction();

webfaction.login(function(result) {
  
  //console.log(result);
  
  webfaction.createApp({
    name: 'foofoo6',
    type: 'static_only'
    }, function(result) {
      console.log(result);
    });

  /*
  webfaction.listMachines(function(result){
    console.log(result);
  });
  */

});