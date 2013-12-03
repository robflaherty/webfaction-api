# Webfaction API

This is a Node.js wrapper for Webfaction's XML-RPC API. It's currently very incomplete—not ready for primetime use!

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


