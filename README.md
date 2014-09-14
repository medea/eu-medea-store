# eu-medea-store
 
A [Medea](https://github.com/medea/medea) store for [Eu](https://github.com/cucumber-ltd/eu).

Medea is an embedded key-value storage library written in pure JavaScript.  Eu implements caching semantics on top of the `request` module.  This module allows a persistent, cross-platform HTTP client cache that's 100% JavaScript.  Yay!

[![Build Status](https://api.travis-ci.org/medea/eu-medea-store.svg?branch=master)](https://travis-ci.org/medea/medea-ttl)

## Example

```js
var Eu = require('eu');
var medea = require('medea');
var MedeaStore = require('eu-medea-store');

var db = medea();
var store = new MedeaStore(db);
var cache = new Eu.Cache(store, 'test');

var eu = new Eu(cache);

db.open(function(err) {
  setInterval(function() {
    eu.get('http://some_url_with_cacheable_response', function(err, res) {
      console.log(res.headers['date']);
    });
  }, 1000);
});
```

## License

MIT
