# Webfaction API

This is a Node.js wrapper for Webfaction's XML-RPC API. It's currently very incomplete—not ready for primetime use!

## Basic Usage

```javascript
var Webfaction = require('./lib/webfaction');

var webfaction = new Webfaction('username', 'password');

webfaction.login(function(result) {
  webfaction.listMachines(function(result) {
    console.log(result);
  });
});
```

## API

### General
#### login(callback)

### Domains
#### createDomain(domain, callback)
#### deleteDomain(subdomain, callback)
#### listDomains(callback)

### Applications

### Websites

### Cron

### Servers

### Email



