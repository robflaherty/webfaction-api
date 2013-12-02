# Webfaction API

This is a Node.js wrapper for Webfaction's XML-RPC API. It's very incomplete right now. Not ready for primetime use!

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

### Domains

### Applications

### Websites

### Cron

### Servers

### Email



