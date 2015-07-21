var elasticSearch = require('elasticsearch');
var url = require('url');

module.exports = {
  initialize: function (api, next) {

    api.elasticsearch = {
      createClient: function () {
        return new elasticSearch.Client({
          host: url.format({
            hostname: api.config.elasticsearch.hostname,
            protocol: api.config.elasticsearch.protocol,
            port: api.config.elasticsearch.port
          }),
          apiVersion: api.config.elasticsearch.apiVersion
        })
      },
      elasticsearch: elasticSearch
    };

    next();

  },
  start: function (api, next) {
    var client = api.elasticsearch.createClient();
    client.ping({
      requestTimeout: 30000
    })
      .then(function (response) {
        api.elasticsearch.client = client;
        next();
      })
      .catch(function (err) {
        return next(err);
      });
  }
};