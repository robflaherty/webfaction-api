var xmlrpc = require('xmlrpc');
var util = require('util');
var async = require('async');

var client = xmlrpc.createSecureClient('https://api.webfaction.com');

var Webfaction = function(username, password) {
  this.username = username;
  this.password = password;
  this.session_id = null;
  this.account = null;

  this.methodCall = function(method, params, callback) {
    if (!params) params = [];
    params.unshift(this.session_id);
    console.log(params);
    client.methodCall(method, params, (function (error, value) {
      if (error) {
        console.log(error);
      }
      callback(value);
  }).bind(this));
  };
};

Webfaction.prototype.login = function(callback) {
  client.methodCall('login', [this.username, this.password], (function (error, value) {
    this.session_id = value[0];
    this.account = value[1];
    callback(value);
  }).bind(this));
};

/*
 * Domains
 */
Webfaction.prototype.createDomain = function(domain, subdomain, callback) {
  this.methodCall('create_domain', [domain, subdomain], callback);
  };

Webfaction.prototype.deleteDomain = function(domain, subdomain, callback) {
  this.methodCall('delete_domain', [], callback);
};

Webfaction.prototype.listDomains = function(callback) {  
  this.methodCall('list_domains', [], callback);
};

/*
 * Applications
 */

Webfaction.prototype.createApp = function(appName, appType) {
  client.methodCall('create_app', [this.session_id, appName, appType], function (error, value) {
    console.log(value);

    if (!value) {
      console.log('Couldn\'t create app.');
    }
    callback();

  });
};

/*
 * Websites
 */

Webfaction.prototype.listWebsites = function(callback) {  
  this.methodCall('list_websites', [], callback);
};

/*
 * Email
 */

/*
 * Misc
 */

Webfaction.prototype.listIps = function(callback) {  
  this.methodCall('list_ips', [], callback);
}; 


var webfaction = new Webfaction();

webfaction.login(function(result) {
  
  console.log(result);

  
  webfaction.listIps(function(result){
    console.log(result);
  });

});



