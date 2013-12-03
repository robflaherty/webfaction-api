# Webfaction API

This is a Node.js wrapper for Webfaction's [XML-RPC API](http://docs.webfaction.com/xmlrpc-api/). It's currently incomplete but functional for the parts of the API it supports (listed below). Use at your own risk. Be careful with destructive operations.

It needs tests, better error handling, and coverage for the other sections of the API (email, DNS, etc). Contributions welcome!

## Basic Usage

```javascript
var Webfaction = require('./lib/webfaction');

var webfaction = new Webfaction('username', 'password');

webfaction.login(function(result) {
  
  webfaction.listDomains(function(result) {
    console.log(result);
  });

  webfaction.createWebsite({
    website_name : 'example',
    ip: '123.45.67.89',
    https: false,
    subdomains: ['www.example.com'],
    site_apps: [ ['node', '/'] ]
  },
  function(result) {
    console.log(result);
  });

});
```

## API

### Supported API Calls

* Domains
    * Create Domain
    * Delete Domain
    * List Domains
* Applications
    * Create Application
    * Delete Application
    * List Applications
    * List Application Types
* Websites
    * Create Website
    * Update Website
    * Delete Website
    * List Websites
* Servers
    * List IPs
    * List Machines
* Cron
    * Create Cron job
    * Delete Cron job
