var xmlrpc = require('xmlrpc');
var util = require('util');
var _ = require('underscore');

var client = xmlrpc.createSecureClient('https://api.webfaction.com');

var Webfaction = function(username, password) {
  this.username = username;
  this.password = password;
  this.session_id = null;
  this.account = null;
  this.commands = [];
};

/*
 * Helpers
 */

Webfaction.prototype.methodCall = function(method, params, callback) {
  if (!params) params = [];
  params.unshift(this.session_id);
  client.methodCall(method, params, function (error, value) {
    if (error) {
      console.log(error);
    }
    callback(value);
  });
};

/*
 * API - General
 */

Webfaction.prototype.login = function(callback) {
  client.methodCall('login', [this.username, this.password], (function (error, value) {
    this.session_id = value[0];
    this.account = value[1];
    callback(value);
  }).bind(this));
};

/*
 * API - Domains
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
 * API - Applications
 */

Webfaction.prototype.createApp = function(opts, callback) {
  var optionalDefaults = {
    autostart: false,
    extra_info: '',
    open_port: false
  };  
  
  _.defaults(opts, optionalDefaults);
  
  params = [];
  params.push(opts.name);
  params.push(opts.type);

  if (opts.open_port) {
    params.push(opts.autostart);
    params.push(opts.extra_info);
    params.push(opts.open_port);
  } else if (opts.extra_info) {
    params.push(opts.autostart);
    params.push(opts.extra_info);
  } else if (opts.autostart) {
    params.push(opts.autostart);
  }

  this.methodCall('create_app', params, callback);

};

Webfaction.prototype.deleteApp = function(appName, callback) {
  this.methodCall('delete_app', [appName], callback);
};

Webfaction.prototype.listApps = function(callback) {
  this.methodCall('list_apps', [], callback);
};

Webfaction.prototype.listAppTypes = function(callback) {
  this.methodCall('list_app_types', [], callback);
};

/*
 * API - Websites
 */

Webfaction.prototype.createWebsite = function(opts, callback) {

  var params = [opts.website_name, opts.ip, opts.https, opts.subdomains];

  opts.site_apps.forEach(function(val) {
    params.push(val);
  });

  this.methodCall('create_website', params, callback);
};

Webfaction.prototype.updateWebsite = function(opts, callback) {

  var params = [opts.website_name, opts.ip, opts.https, opts.subdomains];

  opts.site_apps.forEach(function(val) {
    params.push(val);
  });

  this.methodCall('update_website', params, callback);
};

Webfaction.prototype.deleteWebsite = function(opts, callback) {
  var params = [opts.website_name, opts.ip];

  if (opts.https === true) {
    params.push(opts.https);
  }

  this.methodCall('delete_website', params, callback);
};

Webfaction.prototype.listWebsites = function(callback) {  
  this.methodCall('list_websites', [], callback);
};

/*
 * API - Cron
 */

Webfaction.prototype.createCronjob = function(line, callback) {  
  this.methodCall('create_cronjob', [line], callback);
};

Webfaction.prototype.deleteCronjob = function(line, callback) {  
  this.methodCall('delete_cronjob', [line], callback);
};

/*
 * API - Servers
 */

Webfaction.prototype.listIps = function(callback) {  
  this.methodCall('list_ips', [], callback);
};

Webfaction.prototype.listMachines = function(callback) {  
  this.methodCall('list_machines', [], callback);
}; 

/*
 * API - Email
 */

/*
 * API - Misc
 */


module.exports = Webfaction;
