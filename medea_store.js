var ttl = require('medea-ttl');

module.exports = function MedeaStore(db) {
  db = ttl(db);

  this.get = function (key, cb) {
    db.get(key, cb);
  };

  this.set = function (key, value, ttlMillis, cb) {
    db.put(key, value, ttlMillis, cb);
  };

  this.flush = function (prefix, cb) {
    var wildcard = new RegExp('^' + prefix + '.*');
    _flush(wildcard, cb);
  };

  this.flushAll = function (cb) {
    _flush('*', cb);
  };

  var _flush = function(regexp, cb) {
    var batch = db.createBatch();

    db.listKeys(function(err, keys) {
      keys.forEach(function(key) {
        if (regexp === '*') {
          batch.remove(key);
        } else if (regexp.test(key)) {
          batch.remove(key);
        }
      });

      db.write(batch);
    });
  };
};
